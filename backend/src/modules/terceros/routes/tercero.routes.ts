import { Router } from 'express';
import {
  listarTercerosController,
  crearTerceroController,
  actualizarTerceroController,
  eliminarTerceroController,
  obtenerTerceroController
} from '../controllers/tercero.controller';

const router = Router();

router.get('/', listarTercerosController);
router.get('/:id', obtenerTerceroController);
router.post('/', crearTerceroController);
router.put('/:id', actualizarTerceroController);
router.delete('/:id', eliminarTerceroController);

export default router;