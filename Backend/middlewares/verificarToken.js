import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.JWT_SECRET

export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) return res.status(401).json({ error: 'Token requerido' })

    try {
        const datos = jwt.verify(token.split(' ')[1], SECRET_KEY)
        req.usuario = datos
        next()
    } catch {
        res.status(401).json({ error: 'Token inválido o expirado' })
    }
}