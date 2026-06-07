import { Request, Response } from 'express';
import { cloudinary } from '../config/cloudinary';

/**
 * @route POST /api/upload
 * @desc Uploads an image to Cloudinary and returns the secure URL. Protected route.
 */
export const uploadImage = (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No image file provided.' });
      return;
    }

    // Create a stream to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'rid_cms' }, // Organizes our files in Cloudinary
      (error, result) => {
        if (error || !result) {
          console.error('[Cloudinary Error]:', error);
          res.status(500).json({ success: false, error: 'Image upload failed at cloud provider.' });
          return;
        }
        
        // Return the secure URL to the frontend
        res.status(200).json({ success: true, data: { url: result.secure_url } });
      }
    );

    // End the stream with the buffer from Multer
    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during file upload.' });
  }
};
