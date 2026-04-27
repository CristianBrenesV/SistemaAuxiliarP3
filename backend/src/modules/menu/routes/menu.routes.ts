import { Router } from 'express';
import { obtenerMenu } from '../controller/menu.controller';
import { verificarToken } from '../../../middlewares/auth.middleware';

const router = Router();

router.get('/menu', verificarToken, obtenerMenu);

export default router;