import express from 'express';
import {
    crearPago,
    obtenerHistorial,
    obtenerPagoPorMes,
    actualizarPago,
    eliminarPago
} from '../controllers/historialPagosController.js';

const router = express.Router();

router.post('/:trabajadorId', crearPago);
router.get('/:trabajadorId', obtenerHistorial);
router.get('/:trabajadorId/:anio/:mes', obtenerPagoPorMes);
router.put('/:trabajadorId/:anio/:mes', actualizarPago);
router.delete('/:trabajadorId/:anio/:mes', eliminarPago);

export default router;