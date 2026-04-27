import { Router } from 'express';
import { 
    getReporteCentros, 
    getReporteTerceros 
} from '../controllers/reportes.controller';

const router = Router();

// GET /api/reportes/centros
router.get('/centros', getReporteCentros);

// GET /api/reportes/terceros
router.get('/terceros', getReporteTerceros);

export default router;