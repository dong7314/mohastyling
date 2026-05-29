import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const naverMapClientId = process.env.NAVER_MAP_CLIENT_ID ?? "";

  return NextResponse.json(
    { naverMapClientId },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
