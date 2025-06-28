import express from 'express'
import { verificarToken } from '../middlewares/verificarToken.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import {
    crearUsuarioDesdeTrabajador,
    listarUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
} from '../controllers/usuarioController.js'


const router = express.Router()

router.post('/crearUsuario', verificarToken, isAdmin, crearUsuarioDesdeTrabajador)
router.get('/listarUsuarios', verificarToken, isAdmin, listarUsuarios)
router.get('/obtenerUsuario/:id', verificarToken, isAdmin, obtenerUsuario)
router.put('/actualizarUsuario/:id', verificarToken, isAdmin, actualizarUsuario)
router.delete('/eliminarUsuario/:id', verificarToken, isAdmin, eliminarUsuario)

export default router