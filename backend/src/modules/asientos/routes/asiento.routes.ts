import { Router } from 'express';
import { 
    listarAsientosController, 
    obtenerDetallesController 
} from '../controllers/asiento.controller';

const router = Router();

router.get('/', listarAsientosController);
router.get('/:id/detalles', obtenerDetallesController); 

export default router;