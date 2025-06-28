import prisma from '../services/prismaClient.js';

// Obtener todos los trabajadores
export const obtenerTrabajadores = async (req, res) => {
    try {
        const trabajadores = await prisma.trabajador.findMany({
            include: {
                ueb: true,
                cargo: true,
                salario: true,
                talla: true
            }
        });
        res.json(trabajadores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los trabajadores' });
    }
};

// Obtener un trabajador por ID
export const obtenerTrabajador = async (req, res) => {
    try {
        const { id } = req.params;
        const trabajador = await prisma.trabajador.findUnique({
            where: { id: Number(id) },
            include: {
                ueb: true,
                cargo: true,
                salario: true,
                talla: true
            }
        });
        if (!trabajador) return res.status(404).json({ error: 'Trabajador no encontrado' });
        res.json(trabajador);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el trabajador' });
    }
};

// Crear un nuevo trabajador
export const crearTrabajador = async (req, res) => {
    try {
        const {
            cargo,
            salario,
            talla,
            uebId,
            ...datosTrabajador
        } = req.body;

        const nuevo = await prisma.trabajador.create({
            data: {
                ...datosTrabajador,
                ueb: { connect: { id: uebId } },
                cargo: cargo ? { create: cargo } : undefined,
                salario: salario ? { create: salario } : undefined,
                talla: talla ? { create: talla } : undefined
            },
            include: {
                ueb: true,
                cargo: true,
                salario: true,
                talla: true
            }
        });

        res.status(201).json(nuevo);
        
    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            return res.status(400).json({
                error: `Ya existe un trabajador con el idTrabajadorEmpresa: ${req.body.idTrabajadorEmpresa}`
            })
        }
        res.status(400).json({ error: 'Error al crear el trabajador y sus relaciones' });
    }
};

// Actualizar un trabajador existente
export const actualizarTrabajador = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            cargo,
            salario,
            talla,
            uebId,
            ...datosTrabajador
        } = req.body;

        // Actualiza el trabajador y relaciona con su UEB
        const actualizado = await prisma.trabajador.update({
            where: { id: Number(id) },
            data: {
                ...datosTrabajador,
                ueb: { connect: { id: uebId } },
                cargo: cargo
                    ? {
                        upsert: {
                            create: cargo,
                            update: cargo
                        }
                    }
                    : undefined,
                salario: salario
                    ? {
                        upsert: {
                            create: salario,
                            update: salario
                        }
                    }
                    : undefined,
                talla: talla
                    ? {
                        upsert: {
                            create: talla,
                            update: talla
                        }
                    }
                    : undefined
            },
            include: {
                ueb: true,
                cargo: true,
                salario: true,
                talla: true
            }
        });

        res.json(actualizado);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al actualizar el trabajador y sus relaciones' });
    }
};
//importar trabajadores
export const importarTrabajadores = async (req, res) => {
    const trabajadores = req.body

    if (!Array.isArray(trabajadores) || trabajadores.length === 0) {
        return res.status(400).json({ error: 'No se enviaron trabajadores válidos' })
    }

    let creados = 0
    const errores = []

    for (const t of trabajadores) {
        const { cargo, salario, talla, uebId, ...datosTrabajador } = t

        try {
            await prisma.trabajador.create({
                data: {
                    ...datosTrabajador,
                    ueb: { connect: { id: uebId } },
                    cargo: cargo ? { create: cargo } : undefined,
                    salario: salario ? { create: salario } : undefined,
                    talla: talla ? { create: talla } : undefined
                }
            })
            creados++
        } catch (err) {
            errores.push({ trabajador: t.nombreApellidos || 'Desconocido', error: err.message })
        }
    }

    res.json({
        mensaje: `✅ Importación finalizada`,
        trabajadoresCreados: creados,
        conErrores: errores.length,
        detallesErrores: errores
    })
}

// Eliminar un trabajador
export const eliminarTrabajador = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.trabajador.delete({
            where: { id: Number(id) }
        });

        res.json({ mensaje: 'Trabajador eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al eliminar el trabajador' });
    }
};