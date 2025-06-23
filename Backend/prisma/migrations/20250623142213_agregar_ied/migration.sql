-- CreateTable
CREATE TABLE "IED" (
    "id" SERIAL NOT NULL,
    "trabajadorId" INTEGER NOT NULL,
    "mes" INTEGER,
    "trimestre" INTEGER,
    "anio" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IED_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IED_trabajadorId_tipo_mes_trimestre_anio_key" ON "IED"("trabajadorId", "tipo", "mes", "trimestre", "anio");

-- AddForeignKey
ALTER TABLE "IED" ADD CONSTRAINT "IED_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
