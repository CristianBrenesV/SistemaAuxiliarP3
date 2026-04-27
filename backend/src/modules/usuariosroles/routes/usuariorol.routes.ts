import { Router } from 'express';
import {
  getUsuariosRoles,
  getRolesPorUsuario,
  getRolesActivosPorUsuario,
  getUsuariosPorRol,
  createUsuarioRol,
  deleteUsuarioRol
} from '../controllers/usuariorol.controller';

const router = Router();

router.get('/', getUsuariosRoles);
router.get('/usuario/:idUsuario', getRolesPorUsuario);
router.get('/usuario/:idUsuario/activos', getRolesActivosPorUsuario);
router.get('/rol/:idRol', getUsuariosPorRol);
router.post('/', createUsuarioRol);
router.delete('/:idUsuario/:idRol', deleteUsuarioRol);

export default router;