import prisma from '../services/prismaClient.js';

// Crear una UEB
export const crearUEB = async (req, res) => {
    try {
        const nueva = await prisma.uEB.create({
            data: { nombre: req.body.nombre }
        });
        res.status(201).json(nueva);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo crear la UEB' });
    }
};

// Obtener todas las UEBs
export const listarUEBs = async (req, res) => {
    try {
        const todas = await prisma.uEB.findMany({
            include: { trabajadores: true }
        });
        res.json(todas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las UEBs' });
    }
};

// Obtener una UEB por ID
export const obtenerUEB = async (req, res) => {
    try {
        const ueb = await prisma.uEB.findUnique({
            where: { id: Number(req.params.id) },
            include: { trabajadores: true }
        });
        if (!ueb) return res.status(404).json({ error: 'UEB no encontrada' });
        res.json(ueb);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la UEB' });
    }
};

// Actualizar una UEB
export const actualizarUEB = async (req, res) => {
    try {
        const actualizada = await prisma.uEB.update({
            where: { id: Number(req.params.id) },
            data: { nombre: req.body.nombre }
        });
        res.json(actualizada);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo actualizar la UEB' });
    }
};

// Eliminar una UEB
export const eliminarUEB = async (req, res) => {
    try {
        await prisma.uEB.delete({
            where: { id: Number(req.params.id) }
        });
        res.json({ mensaje: 'UEB eliminada con éxito' });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo eliminar la UEB. Verifica que no tenga trabajadores asociados.' });
    }
};