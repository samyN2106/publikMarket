import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const setCookies = await cookies();
  const session = setCookies.get("myapp_session")?.value || null;

  return NextResponse.json({ session });
}
