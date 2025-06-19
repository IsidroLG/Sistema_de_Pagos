-- CreateTable
CREATE TABLE "Trabajador" (
    "id" SERIAL NOT NULL,
    "idTrabajadorEmpresa" INTEGER NOT NULL,
    "nombreApellidos" TEXT NOT NULL,
    "carnetIdentidad" TEXT NOT NULL,
    "direccionParticular" TEXT,
    "fechaAlta" TIMESTAMP(3),
    "fuenteProcedencia" TEXT,
    "fechaBaja" TIMESTAMP(3),
    "rol" TEXT,
    "fechaIngreso" TIMESTAMP(3),
    "jubiladoRecontratado" BOOLEAN NOT NULL,
    "madresTrabajadoras" BOOLEAN NOT NULL,

    CONSTRAINT "Trabajador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "trabajadorId" INTEGER NOT NULL,
    "organoCargo" TEXT,
    "categoriaOcupacion" TEXT,
    "funcionDesignacion" TEXT,
    "nivelPreparacion" TEXT,
    "titulo" TEXT,
    "tipoContrato" TEXT,
    "tridente" TEXT,
    "ubicacionFuerza" TEXT,
    "nivelEscolar" TEXT,
    "defensa" TEXT,
    "raza" TEXT,
    "militancia" TEXT,
    "grupoEscala" TEXT,
    "grupoEscalaN" INTEGER,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salario" (
    "id" SERIAL NOT NULL,
    "trabajadorId" INTEGER NOT NULL,
    "salarioTotal" DOUBLE PRECISION,
    "escala" DOUBLE PRECISION,
    "cla" DOUBLE PRECISION,
    "turnos" DOUBLE PRECISION,
    "maestriaDoctorado" DOUBLE PRECISION,
    "anosServicio" INTEGER,
    "otros" TEXT,

    CONSTRAINT "Salario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talla" (
    "id" SERIAL NOT NULL,
    "trabajadorId" INTEGER NOT NULL,
    "pantalonSaya" INTEGER,
    "camisaBlusa" TEXT,
    "calzado" INTEGER,
    "overol" TEXT,

    CONSTRAINT "Talla_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trabajador_idTrabajadorEmpresa_key" ON "Trabajador"("idTrabajadorEmpresa");

-- CreateIndex
CREATE UNIQUE INDEX "Trabajador_carnetIdentidad_key" ON "Trabajador"("carnetIdentidad");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_trabajadorId_key" ON "Cargo"("trabajadorId");

-- CreateIndex
CREATE UNIQUE INDEX "Salario_trabajadorId_key" ON "Salario"("trabajadorId");

-- CreateIndex
CREATE UNIQUE INDEX "Talla_trabajadorId_key" ON "Talla"("trabajadorId");

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salario" ADD CONSTRAINT "Salario_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talla" ADD CONSTRAINT "Talla_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
