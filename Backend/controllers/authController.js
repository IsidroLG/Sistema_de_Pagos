import prisma from '../services/prismaClient.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET
const CLAVE_ADMIN = process.env.CLAVE_ADMIN_SECRETA

// 🔑 LOGIN (trabajadores y admins)
export const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { username },
            include: { trabajador: true }
        })

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

        if (usuario.rol === 'usuario') {
            // Validación para trabajadores
            if (usuario.trabajador?.idTrabajadorEmpresa.toString() !== password) {
                return res.status(401).json({ error: 'Credenciales inválidas' })
            }
        } else {
            // Validación para admin
            const passwordValida = await bcrypt.compare(password, usuario.password)
            if (!passwordValida) {
                return res.status(401).json({ error: 'Credenciales inválidas' })
            }
        }

        // Crear token
        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol,
                trabajadorId: usuario.trabajadorId || null
            },
            SECRET_KEY,
            { expiresIn: '8h' }
        )

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            rol: usuario.rol,
            trabajadorId: usuario.trabajadorId || null
        })
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor' })
    }
}

// 🧑‍💼 REGISTRO de admin (con clave secreta)
export const registrarAdmin = async (req, res) => {
    const { username, password, claveSecreta } = req.body

    if (claveSecreta !== CLAVE_ADMIN) {
        return res.status(403).json({ error: 'No autorizado para crear administradores' })
    }

    try {
        const yaExiste = await prisma.usuario.findUnique({ where: { username } })
        if (yaExiste) return res.status(400).json({ error: 'Nombre de usuario ya en uso' })

        const hash = await bcrypt.hash(password, 10)

        const nuevo = await prisma.usuario.create({
            data: {
                username,
                password: hash,
                rol: 'admin'
            }
        })

        res.status(201).json({ mensaje: 'Administrador creado con éxito', id: nuevo.id })
    } catch (err) {
        res.status(500).json({ error: 'Error al crear administrador' })
    }
}