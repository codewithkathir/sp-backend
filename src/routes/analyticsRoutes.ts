import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { AnalyticsController } from '../controllers/analyticsController';

const router = Router();
router.use(authenticate);
router.get('/summary', AnalyticsController.summary);
export default router;
