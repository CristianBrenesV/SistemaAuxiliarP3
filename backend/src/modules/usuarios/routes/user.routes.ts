import { Router } from 'express';
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  cambiarEstadoUsuario,
  cambiarClaveUsuario
} from "../controllers/user.controller"

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.post('/estado', cambiarEstadoUsuario);
router.post('/clave', cambiarClaveUsuario);

export default router;