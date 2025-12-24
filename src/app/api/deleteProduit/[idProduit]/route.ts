import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }) {
  try {
    const { idProduit } = await params;


    await prisma.product.delete({
      where: { id: Number(idProduit) },
    });

    return NextResponse.json({ message: "Produit supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "probleme lors de la suppresion du produit...........",
        erreur: error,
      },
      { status: 500 }
    );
  }
}
