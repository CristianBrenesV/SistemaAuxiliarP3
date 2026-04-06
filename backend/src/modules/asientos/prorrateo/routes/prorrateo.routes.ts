import { Router } from 'express';
import {
  guardarProrrateoController,
  obtenerDetallesController,
  obtenerDistribucionCCController,
  obtenerDistribucionTercerosController
} from '../controllers/prorrateo.controller';

const router = Router();

router.post('/', guardarProrrateoController);
router.get('/detalle/:id', obtenerDetallesController);
router.get('/cc/:id', obtenerDistribucionCCController);
router.get('/terceros/:id', obtenerDistribucionTercerosController);

export default router;