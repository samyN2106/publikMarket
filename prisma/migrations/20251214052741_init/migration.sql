/*
  Warnings:

  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[boutiqueId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `boutiqueId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montant` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boutiqueId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropIndex
DROP INDEX "public"."Payment_userId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
DROP COLUMN "userId",
ADD COLUMN     "boutiqueId" INTEGER NOT NULL,
ADD COLUMN     "montant" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId",
ADD COLUMN     "boutiqueId" INTEGER NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "Boutique" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Boutique_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boutique_email_key" ON "Boutique"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_boutiqueId_key" ON "Payment"("boutiqueId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_boutiqueId_fkey" FOREIGN KEY ("boutiqueId") REFERENCES "Boutique"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_boutiqueId_fkey" FOREIGN KEY ("boutiqueId") REFERENCES "Boutique"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
