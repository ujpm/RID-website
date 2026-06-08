import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController';
import { protect } from '../middleware/authMiddleware';
import { upload } from '../config/cloudinary';

const router = Router();

// Protect ensures only admins can upload. 
// upload.single('image') parses the incoming form-data for a field named 'image'.
router.post('/', protect, upload.single('image'), uploadImage);

export default router;
