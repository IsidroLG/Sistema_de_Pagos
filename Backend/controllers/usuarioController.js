import prisma from '../services/prismaClient.js'
import bcrypt from 'bcryptjs'

// Crear usuario desde trabajador
export const crearUsuarioDesdeTrabajador = async (req, res) => {
    const { trabajadorId, username, password, rol = 'usuario' } = req.body

    if (!trabajadorId || !username || !password) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' })
    }

    try {
        const trabajador = await prisma.trabajador.findUnique({
            where: { id: trabajadorId },
            include: { usuario: true }
        })

        if (!trabajador) {
            return res.status(404).json({ error: 'Trabajador no encontrado' })
        }

        if (trabajador.usuario) {
            return res.status(400).json({ error: 'Este trabajador ya tiene un usuario' })
        }

        const hashed = await bcrypt.hash(password, 10)

        const nuevo = await prisma.usuario.create({
            data: {
                username,
                password: hashed,
                rol,
                trabajador: { connect: { id: trabajadorId } }
            },
            include: {
                trabajador: true
            }
        })

        res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevo })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error al crear el usuario' })
    }
}

// Obtener todos los usuarios
export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            include: {
                trabajador: {
                    select: {
                        nombreApellidos: true,
                        idTrabajadorEmpresa: true,
                        ueb: true
                    }
                }
            },
            orderBy: {
                creadoEn: 'desc'
            }
        })

        res.json(usuarios)
    } catch (err) {
        res.status(500).json({ error: 'Error al listar usuarios' })
    }
}

// Obtener un usuario específico
export const obtenerUsuario = async (req, res) => {
    const { id } = req.params
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: Number(id) },
            include: { trabajador: true }
        })

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

        res.json(usuario)
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar usuario' })
    }
}

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
    const { id } = req.params
    const { username, password, rol } = req.body

    try {
        const data = {}

        if (username) data.username = username
        if (rol) data.rol = rol
        if (password) data.password = await bcrypt.hash(password, 10)

        const actualizado = await prisma.usuario.update({
            where: { id: Number(id) },
            data,
            include: { trabajador: true }
        })

        res.json({ mensaje: 'Usuario actualizado', usuario: actualizado })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: 'Error al actualizar usuario' })
    }
}

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
    const { id } = req.params
    try {
        await prisma.usuario.delete({ where: { id: Number(id) } })
        res.json({ mensaje: 'Usuario eliminado' })
    } catch (err) {
        res.status(400).json({ error: 'No se pudo eliminar el usuario' })
    }
}