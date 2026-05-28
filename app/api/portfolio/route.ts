import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteImage } from "@/lib/minio";
import { verifyBasicAuth } from "@/lib/admin-auth";

function checkAuth(request: NextRequest): NextResponse | null {
  const authHeader = request.headers.get("authorization");
  const result = verifyBasicAuth(authHeader);

  if (!result.configured) {
    console.error("Admin auth env missing: ADMIN_ID or ADMIN_PASSWORD");
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 500 }
    );
  }

  if (!result.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function normalizeCategory(category: string | null | undefined) {
  return category?.replace("-", "_");
}

// GET - Fetch portfolio items
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = normalizeCategory(searchParams.get("category"));
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const skip = (page - 1) * limit;

  const where = category ? { category: category as never } : undefined;

  const [items, total] = await Promise.all([
    prisma.portfolio.findMany({
      where,
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.portfolio.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, limit });
}

// POST - Create new portfolio item
export async function POST(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { title, description, date, category, mainImage, images } = body;

    const item = await prisma.portfolio.create({
      data: {
        title,
        description: description || "",
        date,
        category: normalizeCategory(category) as never,
        mainImage: mainImage || "",
        images: {
          create: (images as { url: string; order: number; videoUrl?: string }[]).map((img) => ({
            imageUrl: img.url,
            order: img.order,
            videoUrl: img.videoUrl || null,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}

// PATCH - Update portfolio item
export async function PATCH(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { id, title, description, date, category, mainImage, images } = body;

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    // Delete old images and create new ones
    await prisma.portfolioImage.deleteMany({ where: { portfolioId: id } });

    const item = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        date,
        category: normalizeCategory(category) as never,
        mainImage,
        images: {
          create: (images as { url: string; order: number; videoUrl?: string }[]).map((img) => ({
            imageUrl: img.url,
            order: img.order,
            videoUrl: img.videoUrl || null,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 });
  }
}

// DELETE - Remove portfolio item
export async function DELETE(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    const item = await prisma.portfolio.findUnique({
      where: { id },
      include: { images: true },
    });

    if (item) {
      // Delete images from MinIO
      await Promise.all(
        item.images.map((img) => deleteImage(img.imageUrl).catch(() => {}))
      );
      if (item.mainImage) {
        await deleteImage(item.mainImage).catch(() => {});
      }

      await prisma.portfolio.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 });
  }
}
