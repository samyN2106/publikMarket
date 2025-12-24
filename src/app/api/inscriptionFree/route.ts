import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.email || !data.password || !data.boutique) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    const email = data.email.trim().toLowerCase();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
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
      where: { email },
    });

    if (existingBoutique) {
      return NextResponse.json(
        { message: "Cet email est deja utilise" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcryptjs.hash(data.password, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 5);

    const { data: dataSupabase, error: errSupabase } =
      await supabase.auth.signUp({
        email: email,
        password: data.password,
      });

    if (errSupabase || !dataSupabase.user?.id) {
      return NextResponse.json(
        { message: errSupabase?.message || "Erreur Supabase" },
        { status: 400 }
      );
    }

    const Boutique = await prisma.boutique.create({
      data: {
        name: data.boutique,
        email: email,
        password: hashedPassword,
        supabaseId: dataSupabase.user.id,
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

    return NextResponse.json({ message: Boutique.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur depuis le serveur.",
        erreur: error,
      },

      { status: 500 }
    );
  }
}
