import { Router } from 'express';
import { getGallery, getAlbumBySlug, addGalleryImage, updateAlbum, deleteGalleryImage } from '../controllers/galleryController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
router.get('/', getGallery);
router.get('/album/:slug', getAlbumBySlug);
router.post('/', protect, addGalleryImage);
router.put('/:id', protect, updateAlbum);
router.delete('/:id', protect, deleteGalleryImage);
export default router;
