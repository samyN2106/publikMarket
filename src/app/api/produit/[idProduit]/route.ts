import { getProduits } from "@/lib/getProduits";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }) {
  try {
    const idProduit = await params.idProduit;
    const AllProduits = await getProduits();
    const produit = AllProduits.find((p) => p.id == idProduit);
    return NextResponse.json({ produit: produit }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
