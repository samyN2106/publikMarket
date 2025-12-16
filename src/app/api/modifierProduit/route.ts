import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getProduits } from "@/app/getProduits";

export async function POST(request: NextRequest) {
  try {
    const setCookies = await cookies();
    const session = setCookies.get("myapp_session")?.value;
    const boutiqueId = session || "";
    const data = await request.json();

    // return NextResponse.json({
    //   nomProduit: formData.get("nomProduit"),
    //   description: formData.get("description"),
    //   prixProduit: formData.get("prixProduit"),
    //   numeroAcontacter: formData.get("numeroAcontacter"),
    //   pointDeLivraison: formData.get("pointDeLivraison"),
    //   file: formData.get("imageProduit"),
    // });

    typeof data.nomProduit as string;
    typeof data.description as string;
    typeof data.prixProduit as string;
    typeof data.numeroAcontacter as string;
    typeof data.pointDeLivraison as string;
    typeof data.image as string;

    const payment = await prisma.payment.findFirst({
      where: {
        boutique: {
          id: parseInt(boutiqueId),
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        {
          message: "Vous n'avez pas d'abonnement",
        },
        { status: 400 }
      );
    }

    const nbrProduitRestant = payment.nbrProduits;

    if (nbrProduitRestant > 0) {
      const produits = await getProduits();

      const produitUpdate = produits.find((pd) => pd.id == data.id);

      if (
        produitUpdate.description === data.description &&
        produitUpdate.image === data.image &&
        produitUpdate.price === data.price &&
        produitUpdate.nomProduit === data.nomProduit &&
        produitUpdate.numAContacter === data.numAContacter &&
        produitUpdate.pointLivraison === data.pointLivraison
      ) {
        return NextResponse.json(
          {
            message: "Vous n'avez rien modifier",
          },
          { status: 400 }
        );
      } else {
        await prisma.product.update({
          where: {
            id: parseInt(data.id),
          },
          data: {
            nomProduit: data.nomProduit,
            description: data.description,
            price: data.prixProduit,
            numAContacter: data.numeroAcontacter,
            pointLivraison: data.pointDeLivraison,
            image: data.image,
          },
        });

        return NextResponse.json(
          {
            message: "produit modifie",
          },
          { status: 200 }
        );
      }

      //   await prisma.product.create({
      //     data: {
      //       boutiqueId: parseInt(boutiqueId),
      //       nomProduit: data.nomProduit,
      //       description: data.description,
      //       price: data.prixProduit,
      //       numAContacter: data.numeroAcontacter,
      //       pointLivraison: data.pointDeLivraison,
      //       image: data.image,
      //     },
      //   });

      return NextResponse.json(
        {
          message: "Produit modifie",
        },
        { status: 200 }
      );
    } else if (nbrProduitRestant === 0) {
      await prisma.payment.delete({
        where: {
          boutiqueId: parseInt(boutiqueId),
        },
      });

      return NextResponse.json(
        {
          message: "Vous n'avez pas d'abonnement",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur sur le serveur,ressayez plutard",
        datail: error,
      },
      { status: 500 }
    );
  }
}
