-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_trabajadorId_fkey";

-- DropForeignKey
ALTER TABLE "HistorialPago" DROP CONSTRAINT "HistorialPago_trabajadorId_fkey";

-- DropForeignKey
ALTER TABLE "IED" DROP CONSTRAINT "IED_trabajadorId_fkey";

-- DropForeignKey
ALTER TABLE "Salario" DROP CONSTRAINT "Salario_trabajadorId_fkey";

-- DropForeignKey
ALTER TABLE "Talla" DROP CONSTRAINT "Talla_trabajadorId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_trabajadorId_fkey";

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salario" ADD CONSTRAINT "Salario_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialPago" ADD CONSTRAINT "HistorialPago_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talla" ADD CONSTRAINT "Talla_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IED" ADD CONSTRAINT "IED_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
