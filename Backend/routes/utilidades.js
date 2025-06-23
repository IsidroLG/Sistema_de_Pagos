import express from 'express'
import { calcularUtilidades } from '../controllers/pagoUtilidadesControlller.js'

const router = express.Router()

router.post('/', calcularUtilidades)

export default router