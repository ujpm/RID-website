import { Router } from 'express';
import { getUpdates, createUpdate, updateUpdate, deleteUpdate } from '../controllers/updateController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getUpdates);
router.post('/', protect, createUpdate);
router.put('/:id', protect, updateUpdate); // NEW: Protected Edit Route
router.delete('/:id', protect, deleteUpdate);

export default router;
