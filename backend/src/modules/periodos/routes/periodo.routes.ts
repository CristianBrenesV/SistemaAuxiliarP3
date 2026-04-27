import { Router } from 'express';
import { listarPeriodosController } from '../controllers/periodo.controller';

const router = Router();

router.get('/periodos', listarPeriodosController);

export default router