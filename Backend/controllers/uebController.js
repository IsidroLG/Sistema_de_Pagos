import prisma from '../services/prismaClient.js';

// Crear una nueva UEB
export const crearUEB = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaUEB = await prisma.uEB.create({ data: { nombre } });
        res.status(201).json(nuevaUEB);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo crear la UEB' });
    }
};

// Obtener trabajadores de una UEB específica
export const obtenerTrabajadoresPorUEB = async (req, res) => {
    try {
        const { id } = req.params;
        const ueb = await prisma.uEB.findUnique({
            where: { id: Number(id) },
            include: {
                trabajadores: {
                    include: {
                        cargo: true,
                        salario: true,
                        talla: true
                    }
                }
            }
        });
        if (!ueb) return res.status(404).json({ error: 'UEB no encontrada' });

        res.json(ueb.trabajadores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener trabajadores por UEB' });
    }
};