import express from 'express'
import { login, registrarAdmin } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/registro-admin', registrarAdmin)

export default router