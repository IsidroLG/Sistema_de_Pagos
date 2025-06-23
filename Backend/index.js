import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import trabajadoresRoutes from './routes/trabajadores.js';
import uebRoutes from './routes/ueb.js';
import historialPagoRoutes from './routes/historialPagos.js';
import utilidadesRoutes from './routes/utilidades.js'
import authRoutes from './routes/auth.js'
import { verificarToken } from './middlewares/verificarToken.js'


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/auth', authRoutes)
app.get('/ruta-protegida', verificarToken, (req, res) => {
    res.send(`Hola usuario ${req.usuario.id} con rol ${req.usuario.rol}`)
})
app.use('/trabajadores', trabajadoresRoutes);
app.use('/ueb', uebRoutes);
app.use('/pagos', historialPagoRoutes);
app.use('/pagos/utilidades', utilidadesRoutes)
// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('🚀 Backend del sistema de pagos funcionando correctamente');
});

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});