import { Router } from 'express';
import { 
    obtenerReporteCentros, 
    obtenerReporteTerceros 
} from '../controllers/reportes.controller';

const router = Router();

// GET /api/reportes/centros
router.get('/centros', obtenerReporteCentros);

// GET /api/reportes/terceros
router.get('/terceros', obtenerReporteTerceros);

export default router;