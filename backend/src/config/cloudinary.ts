import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// Ensure env vars are loaded if this is called early
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage so we can stream the file buffer directly to Cloudinary
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export { cloudinary };
