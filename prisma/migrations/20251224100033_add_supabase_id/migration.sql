/*
  Warnings:

  - A unique constraint covering the columns `[supabaseId]` on the table `Boutique` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Boutique" ADD COLUMN     "supabaseId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Boutique_supabaseId_key" ON "Boutique"("supabaseId");
