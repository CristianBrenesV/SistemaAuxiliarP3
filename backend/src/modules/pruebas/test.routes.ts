import { Router } from 'express';
import { testDB } from './test.controller';

const router = Router();

router.get('/db', testDB);

export default router;