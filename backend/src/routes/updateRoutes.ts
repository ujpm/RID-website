import { Router } from 'express';
import { getUpdates, createUpdate, deleteUpdate } from '../controllers/updateController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public route to fetch updates
router.get('/', getUpdates);

// Protected CMS routes
router.post('/', protect, createUpdate);
router.delete('/:id', protect, deleteUpdate);

export default router;
