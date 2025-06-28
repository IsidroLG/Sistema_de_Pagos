import express from 'express';
import {
    crearPago,
    obtenerHistorial,
    obtenerPagoPorMes,
    actualizarPago,
    eliminarPago
} from '../controllers/historialPagosController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = express.Router();

router.post('/crearPago:trabajadorId',verificarToken,isAdmin, crearPago);
router.get('/obtenerHistorial:trabajadorId',verificarToken, obtenerHistorial);
router.get('/obtenerPagoPorMes:trabajadorId/:anio/:mes',verificarToken, obtenerPagoPorMes);
router.put('/actualizarPago:trabajadorId/:anio/:mes',verificarToken,isAdmin , actualizarPago);
router.delete('/eliminarPago:trabajadorId/:anio/:mes',verificarToken, isAdmin ,eliminarPago);

export default router;