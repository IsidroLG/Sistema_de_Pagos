import express from 'express'
import { login, registrarAdmin, cambiarPassword } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/registro-admin', registrarAdmin)
router.put('/cambiar-password', cambiarPassword)

export default router