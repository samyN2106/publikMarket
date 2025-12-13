import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { encrypt } from "@/lib/crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.email || !data.password || !data.boutique) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ message: "Email invalide" }, { status: 400 });
    }

    const PwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!PwdRegex.test(data.password)) {
      return NextResponse.json(
        {
          message:
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
        },
        { status: 400 }
      );
    }

    const existingBoutique = await prisma.boutique.findUnique({
      where: { email: data.email },
    });

    if (existingBoutique != null) {
      return NextResponse.json(
        { message: "Ce email est deja utilise" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcryptjs.hash(data.password, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    const Boutique = await prisma.boutique.create({
      data: {
        name: data.boutique,
        email: data.email,
        password: hashedPassword,
      },
    });

    await prisma.payment.create({
      data: {
        boutiqueId: Boutique.id,
        plan: "free",
        nbrProduits: 6,
        montant: 0,
        paymentMethod: "free",
        paymentStatus: "completed",
        expiresAt: expiresAt,
      },
    });

    const reponse = NextResponse.json({ status: 200 });

    const encrypted = encrypt(String(Boutique.id));

    reponse.cookies.set({
      name: "myapp_session",
      value: encrypted,
      httpOnly: true, // le JS côté client ne peut pas le lire
      path: "/",
      maxAge: 2 * 365 * 24 * 60 * 60, // 2 ans en secondes
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return reponse;
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Impossible de créer le compte par soucis du serveur. Réessayez plus tard",
        erreur: error,
      },

      { status: 500 }
    );
  }
}
