import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, password } = body;

    if (typeof id !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const result = verifyAdminCredentials(id, password);

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login API error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
