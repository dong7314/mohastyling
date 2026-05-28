import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/minio";
import { verifyBasicAuth } from "@/lib/admin-auth";

const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const authResult = verifyBasicAuth(authHeader);

    if (!authResult.configured) {
      console.error("Admin auth env missing: ADMIN_ID or ADMIN_PASSWORD");
      return NextResponse.json(
        { error: "Admin authentication is not configured." },
        { status: 500 }
      );
    }

    if (!authResult.valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const oversizedFile = files.find((file) => file.size > MAX_UPLOAD_FILE_SIZE);

    if (oversizedFile) {
      return NextResponse.json(
        { error: "포트폴리오 사진은 10MB 이하로 업로드해주세요." },
        { status: 413 }
      );
    }

    const urls = await Promise.all(files.map((file) => uploadImage(file)));

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 });
  }
}
