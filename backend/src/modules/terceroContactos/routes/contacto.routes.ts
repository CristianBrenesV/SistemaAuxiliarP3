import { Router } from 'express';
import {
  listarContactosController,
  crearContactoController,
  actualizarContactoController,
  eliminarContactoController,
  obtenerContactoController
} from '../controllers/contacto.controller';

const router = Router({ mergeParams: true });

router.get('/', listarContactosController);
router.get('/:idContacto', obtenerContactoController);
router.post('/', crearContactoController);
router.put('/:idContacto', actualizarContactoController);
router.delete('/:idContacto', eliminarContactoController);

export default router;