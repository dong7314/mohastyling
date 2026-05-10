import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/minio";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    const adminId = process.env.ADMIN_ID || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";
    const expectedAuth = `Basic ${btoa(`${adminId}:${adminPassword}`)}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const urls = await Promise.all(files.map((file) => uploadImage(file)));

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 });
  }
}
