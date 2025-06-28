import express from 'express';
import {
    obtenerTrabajadores,
    obtenerTrabajador,
    crearTrabajador,
    actualizarTrabajador,
    eliminarTrabajador,
    importarTrabajadores
} from '../controllers/trabajadoresController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { verificarToken } from '../middlewares/verificarToken.js';
const router = express.Router();

router.get('/all', verificarToken, isAdmin, obtenerTrabajadores)
router.get('/obtenerTrabajador/:id', verificarToken, isAdmin, obtenerTrabajador)
router.post('/crearTrabajador', verificarToken, isAdmin, crearTrabajador)
router.put('/actualizarTrabajador/:id', verificarToken, isAdmin, actualizarTrabajador)
router.delete('/eliminarTrabajador/:id', verificarToken, isAdmin, eliminarTrabajador)
router.post('/importar', verificarToken, isAdmin, importarTrabajadores)
export default router;