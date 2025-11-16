import { prisma } from "./prisma";

export async function getProduits() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
