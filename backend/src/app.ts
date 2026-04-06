import express from 'express';
import cors from 'cors';
import testRoutes from './modules/pruebas/test.routes';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/usuarios/routes/user.routes';
import prorrateoRoutes from './modules/asientos/prorrateo/routes/prorrateo.routes';
import asientoRoutes from './modules/asientos/routes/asiento.routes';
import centroCostoRoutes from './modules/centrosCosto/routes/centroCosto.routes';
import terceroRoutes from './modules/terceros/routes/tercero.routes';
import periodoRoutes from './modules/periodos/routes/periodo.routes';


const app = express();

//enlace al front
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/prorrateo', prorrateoRoutes);
app.use('/api/asientos', asientoRoutes);
app.use('/api/centros-costo', centroCostoRoutes);
app.use('/api/terceros', terceroRoutes);
app.use('/api', periodoRoutes);


app.get('/', (req, res) => {
  res.send('Backend up');
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});