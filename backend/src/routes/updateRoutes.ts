import { Router } from 'express';
import { getUpdates, getUpdateBySlug, createUpdate, updateUpdate, deleteUpdate } from '../controllers/updateController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
router.get('/', getUpdates);
router.get('/post/:slug', getUpdateBySlug);
router.post('/', protect, createUpdate);
router.put('/:id', protect, updateUpdate);
router.delete('/:id', protect, deleteUpdate);
export default router;
