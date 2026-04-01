import express from 'express';
import cors from 'cors';
import testRoutes from './modules/pruebas/test.routes';
import authRoutes from './modules/auth/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/test', testRoutes);
//app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});


app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});