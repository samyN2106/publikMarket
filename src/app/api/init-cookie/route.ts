// app/api/init-cookie/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // On récupère l'ID envoyé depuis le frontend après inscription
  const { boutiqueId } = await req.json();

  if (!boutiqueId) {
    return NextResponse.json(
      { error: "Boutique ID manquant" },
      { status: 400 }
    );
  }

  // Création de la réponse
  const response = NextResponse.json({
    message: "Cookie initialisé avec l'ID boutique",
    boutiqueId,
  });

  // Pose du cookie
  response.cookies.set({
    name: "myapp_session",
    value: String(boutiqueId), // ici tu peux mettre encrypt(boutiqueId) si tu veux chiffrer
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  return response;
}
