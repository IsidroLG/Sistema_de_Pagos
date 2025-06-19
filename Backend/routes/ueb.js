import express from 'express';
import {
    crearUEB,
    obtenerTrabajadoresPorUEB
} from '../controllers/uebController.js';

const router = express.Router();

router.post('/', crearUEB);
router.get('/:id/trabajadores', obtenerTrabajadoresPorUEB);

export default router;