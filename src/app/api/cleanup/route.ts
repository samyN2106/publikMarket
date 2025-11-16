import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.CLEANUP_SECRET) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const now = new Date().toLocaleString();
  const result = await prisma.payment.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });

  return NextResponse.json(
    { message: `Supprimé ${result.count} paiements expirés` },
    { status: 200 }
  );
}
