import express from 'express';
import {
    crearUEB,
    listarUEBs,
    obtenerUEB,
    actualizarUEB,
    eliminarUEB
} from '../controllers/uebController.js';

const router = express.Router();

router.post('/', crearUEB);
router.get('/', listarUEBs);
router.get('/:id', obtenerUEB);
router.put('/:id', actualizarUEB);
router.delete('/:id', eliminarUEB);

export default router;