import { Router } from 'express';
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  cambiarEstadoUsuario,
  cambiarClaveUsuario
} from './user.controller';

const router = Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.post('/estado', cambiarEstadoUsuario);
router.post('/clave', cambiarClaveUsuario);

export default router;