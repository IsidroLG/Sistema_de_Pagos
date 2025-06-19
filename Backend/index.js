import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import trabajadoresRoutes from './routes/trabajadores.js';
import uebRoutes from './routes/ueb.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/trabajadores', trabajadoresRoutes);
app.use('/ueb', uebRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('🚀 Backend del sistema de pagos funcionando correctamente');
});

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});