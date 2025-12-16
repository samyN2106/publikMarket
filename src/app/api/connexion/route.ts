import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const boutique = await prisma.boutique.findUnique({
      where: { email: data.email },
    });
    if (!boutique) return NextResponse.json({ error: null }, { status: 401 });

    const isValid = await bcrypt.compare(data.password, boutique.password);
    if (!isValid) return NextResponse.json({ error: null }, { status: 401 });

    return NextResponse.json({ message: boutique.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Erreur du serveur ressayez plus tard",
      erreur: error,
    });
  }
}
