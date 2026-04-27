import { Router } from 'express';
import {
  getPantallas,
  getPantallaById,
  createPantalla,
  updatePantalla,
  deletePantalla
} from '../controllers/pantalla.controller';

const router = Router();

router.get('/', getPantallas);
router.get('/:id', getPantallaById);
router.post('/', createPantalla);
router.put('/:id', updatePantalla);
router.delete('/:id', deletePantalla);

export default router;