import express from 'express'
import { obtenerPerfil } from '../controllers/perfilController.js'
import { verificarToken } from '../middlewares/verificarToken.js'

const router = express.Router()

router.get('/', verificarToken, obtenerPerfil)

export default router