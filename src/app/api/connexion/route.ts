import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const boutique = await prisma.boutique.findUnique({
      where: { email: data.email },
    });
    if (!boutique) return NextResponse.json({ error: null }, { status: 401 });

    const isValid = await bcrypt.compare(data.password, boutique.password);
    if (!isValid) return NextResponse.json({ error: null }, { status: 401 });

    const reponse = NextResponse.json({ status: 200 });

    // const encrypted = encrypt(String(boutique.id));


    reponse.cookies.set({
      name: "myapp_session",
      value: String(boutique.id),
      httpOnly: true,
      path: "/",
      maxAge: 2 * 365 * 24 * 60 * 60, // 2 ans
      secure: true, // toujours true en prod
      sameSite: "none", // OBLIGATOIRE
    });

    return reponse;
  } catch (error) {
    return NextResponse.json({
      message: "Erreur du serveur ressayez plus tard",
      erreur: error,
    });
  }
}
