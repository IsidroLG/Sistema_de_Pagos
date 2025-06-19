/*
  Warnings:

  - Added the required column `uebId` to the `Trabajador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trabajador" ADD COLUMN     "uebId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UEB" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "UEB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UEB_nombre_key" ON "UEB"("nombre");

-- AddForeignKey
ALTER TABLE "Trabajador" ADD CONSTRAINT "Trabajador_uebId_fkey" FOREIGN KEY ("uebId") REFERENCES "UEB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
