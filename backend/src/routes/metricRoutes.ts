import { Router } from 'express';
import { getMetrics, createMetric, updateMetric, deleteMetric } from '../controllers/metricController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getMetrics);
router.post('/', protect, createMetric);
router.put('/:id', protect, updateMetric);
router.delete('/:id', protect, deleteMetric);

export default router;
