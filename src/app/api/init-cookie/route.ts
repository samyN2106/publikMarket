// app/api/init-cookie/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const cookieValue = "123"; // valeur simple pour test

  const response = NextResponse.json({ message: "Cookie initialisé", value: cookieValue });

  response.cookies.set({
    name: "myapp_session",
    value: cookieValue,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  return response;
}
