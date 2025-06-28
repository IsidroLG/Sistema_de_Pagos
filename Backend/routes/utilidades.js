import express from 'express'
import { calcularUtilidades } from '../controllers/pagoUtilidadesControlller.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { verificarToken } from '../middlewares/verificarToken.js'

const router = express.Router()

router.post('/calcularUtilidades',verificarToken,isAdmin ,calcularUtilidades)

export default router