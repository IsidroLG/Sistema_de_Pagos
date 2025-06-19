import express from 'express';
import {
    obtenerTrabajadores,
    obtenerTrabajador,
    crearTrabajador,
    actualizarTrabajador,
    eliminarTrabajador
} from '../controllers/trabajadoresController.js';

const router = express.Router();

router.get('/', obtenerTrabajadores);
router.get('/:id', obtenerTrabajador);
router.post('/', crearTrabajador);
router.put('/:id', actualizarTrabajador);
router.delete('/:id', eliminarTrabajador);

export default router;