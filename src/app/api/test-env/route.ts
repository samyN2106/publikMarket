import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    SESSION_SECRET: process.env.SESSION_SECRET ? "OK" : "ABSENT",
  });
}