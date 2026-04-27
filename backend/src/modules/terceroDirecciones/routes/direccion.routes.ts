import { Router } from 'express';
import {
  listarDireccionesController,
  crearDireccionController,
  actualizarDireccionController,
  eliminarDireccionController,
  obtenerDireccionController
} from '../controllers/direccion.controller';

const router = Router({ mergeParams: true });

router.get('/', listarDireccionesController);
router.get('/:idDireccion', obtenerDireccionController);
router.post('/', crearDireccionController);
router.put('/:idDireccion', actualizarDireccionController);
router.delete('/:idDireccion', eliminarDireccionController);

export default router;