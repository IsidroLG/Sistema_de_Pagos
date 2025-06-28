import express from 'express';
import {
    crearUEB,
    listarUEBs,
    obtenerUEB,
    actualizarUEB,
    eliminarUEB
} from '../controllers/uebController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = express.Router();

router.post('/crearUEB',verificarToken, isAdmin ,crearUEB);
router.get('/listarUEBs',verificarToken,isAdmin ,listarUEBs);
router.get('/obtenerUEB/:id',verificarToken,isAdmin , obtenerUEB);
router.put('/actualizarUEB/:id',verificarToken, isAdmin ,actualizarUEB);
router.delete('/eliminarUEB/:id',verificarToken,isAdmin , eliminarUEB);

export default router;