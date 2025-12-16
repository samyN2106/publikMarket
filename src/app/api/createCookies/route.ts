import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { NomCookies, CookiesValue } = await request.json();

  const reponse = NextResponse.json({ message: "Cookie créé" });

  reponse.cookies.set({
    name: NomCookies,
    value: String(CookiesValue),
    httpOnly: true,
    path: "/",
    maxAge: 2 * 365 * 24 * 60 * 60, // 2 ans
    secure: true, // toujours true en prod
  });

  return reponse;
}
