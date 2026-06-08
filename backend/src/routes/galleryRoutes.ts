import { Router } from 'express';
import { getGallery, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getGallery);
router.post('/', protect, addGalleryImage);
router.delete('/:id', protect, deleteGalleryImage);

export default router;
