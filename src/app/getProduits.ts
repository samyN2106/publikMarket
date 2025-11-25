"use server";

import { prisma } from "@/lib/prisma";

export async function getProduits() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      boutique: {
        select: {  name: true }, // récupère uniquement le nom
      },
    },
  });
}
