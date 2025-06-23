import prisma from '../services/prismaClient.js';

// Crear un nuevo pago mensual
export const crearPago = async (req, res) => {
    try {
        const { trabajadorId } = req.params;
        const { mes, anio, salarioBase, pagoResultados, pagoUtilidades } = req.body;

        const nuevo = await prisma.historialPago.create({
            data: {
                trabajadorId: Number(trabajadorId),
                mes,
                anio,
                salarioBase,
                pagoResultados,
                pagoUtilidades
            }
        });

        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar el pago' });
    }
};

// Obtener todos los pagos de un trabajador
export const obtenerHistorial = async (req, res) => {
    try {
        const { trabajadorId } = req.params;
        const historial = await prisma.historialPago.findMany({
            where: { trabajadorId: Number(trabajadorId) },
            orderBy: [{ anio: 'desc' }, { mes: 'desc' }]
        });

        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial de pagos' });
    }
};

// Obtener un pago específico
export const obtenerPagoPorMes = async (req, res) => {
    try {
        const { trabajadorId, anio, mes } = req.params;

        const pago = await prisma.historialPago.findUnique({
            where: {
                trabajadorId_mes_anio: {
                    trabajadorId: Number(trabajadorId),
                    mes: Number(mes),
                    anio: Number(anio)
                }
            }
        });

        if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
        res.json(pago);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el pago mensual' });
    }
};

// Actualizar un pago
export const actualizarPago = async (req, res) => {
    try {
        const { trabajadorId, anio, mes } = req.params;
        const data = req.body;

        const actualizado = await prisma.historialPago.update({
            where: {
                trabajadorId_mes_anio: {
                    trabajadorId: Number(trabajadorId),
                    mes: Number(mes),
                    anio: Number(anio)
                }
            },
            data
        });

        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el pago' });
    }
};

// Eliminar un pago
export const eliminarPago = async (req, res) => {
    try {
        const { trabajadorId, anio, mes } = req.params;

        await prisma.historialPago.delete({
            where: {
                trabajadorId_mes_anio: {
                    trabajadorId: Number(trabajadorId),
                    mes: Number(mes),
                    anio: Number(anio)
                }
            }
        });

        res.json({ mensaje: 'Pago eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el pago' });
    }
};