import { Request, Response } from 'express';
import { cloudinary } from '../config/cloudinary';

/**
 * @route POST /api/upload
 * @desc Uploads a single image to Cloudinary. Protected route.
 */
export const uploadImage = (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No image file provided.' });
      return;
    }
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'rid_cms' },
      (error, result) => {
        if (error || !result) {
          res.status(500).json({ success: false, error: 'Image upload failed at cloud provider.' });
          return;
        }
        res.status(200).json({ success: true, data: { url: result.secure_url } });
      }
    );
    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during file upload.' });
  }
};

/**
 * @route POST /api/upload/bulk
 * @desc Uploads multiple images to Cloudinary concurrently. Protected route.
 */
export const uploadBulkImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, error: 'No image files provided.' });
      return;
    }

    const uploadPromises = files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'rid_cms/albums' },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);
    res.status(200).json({ success: true, data: { urls } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during bulk upload.' });
  }
};
