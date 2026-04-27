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
import reporteRoutes from './modules/reportes/routes/reportes.routes';
import pantallaRoutes from './modules/pantallas/routes/pantalla.routes';
import rolRoutes from './modules/roles/routes/rol.routes';
import rolpantallaRoutes from './modules/rolespantallas/routes/rolpantalla.routes';
import usuariorolRoutes from './modules/usuariosroles/routes/usuariorol.routes';
import menuRoutes from './modules/menu/routes/menu.routes';
import direccionRoutes from './modules/terceroDirecciones/routes/direccion.routes';
import contactoRoutes from './modules/terceroContactos/routes/contacto.routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.use(express.json());

app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/prorrateo', prorrateoRoutes);
app.use('/api/asientos', asientoRoutes);
app.use('/api/centros-costo', centroCostoRoutes);
app.use('/api/terceros', terceroRoutes);
app.use('/api', periodoRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/pantalla', pantallaRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/rolpantalla', rolpantallaRoutes);
app.use('/api/usuariorol', usuariorolRoutes);
app.use('/api', menuRoutes);
app.use('/api/terceros/:idTercero/direcciones', direccionRoutes);
app.use('/api/terceros/:idTercero/contactos', contactoRoutes);

app.get('/', (req, res) => {
  res.send('Backend up');
});

