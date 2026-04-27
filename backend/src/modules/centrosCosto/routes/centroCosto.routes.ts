import { Router } from 'express';
import {
  listarCentrosCostoController,
  crearCentroCostoController,
  actualizarCentroCostoController,
  eliminarCentroCostoController,
  obtenerCentroCostoController
} from '../controllers/centroCosto.controller';

const router = Router();

router.get('/', listarCentrosCostoController);
router.get('/:id', obtenerCentroCostoController);
router.post('/', crearCentroCostoController);
router.put('/:id', actualizarCentroCostoController);
router.delete('/:id', eliminarCentroCostoController);

export default router;