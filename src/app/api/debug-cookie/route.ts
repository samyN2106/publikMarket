import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: "test_cookie",
    value: "123",
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none", // obligatoire en production
  });

  return response;
}
