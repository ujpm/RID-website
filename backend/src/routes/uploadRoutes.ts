import { Router } from 'express';
import { uploadImage, uploadBulkImages } from '../controllers/uploadController';
import { protect } from '../middleware/authMiddleware';
import { upload } from '../config/cloudinary';

const router = Router();

router.post('/', protect, upload.single('image'), uploadImage);
// NEW: Bulk upload route utilizing multer's array feature (max 20 files per request)
router.post('/bulk', protect, upload.array('images', 20), uploadBulkImages);

export default router;
