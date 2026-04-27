import { Router } from 'express';
import {
  getRolesPantallas,
  getPantallasPorRol,
  getPantallasConEstado,
  createRolPantalla,
  updateRolPantallas,
  deleteRolPantalla
} from '../controllers/rolpantalla.controller';

const router = Router();

router.get('/', getRolesPantallas);
router.get('/:idRol/pantallas', getPantallasPorRol);
router.get('/:idRol/pantallas-estado', getPantallasConEstado);
router.post('/', createRolPantalla);
router.put('/:idRol', updateRolPantallas);
router.delete('/:idRol/:idPantalla', deleteRolPantalla);

export default router;