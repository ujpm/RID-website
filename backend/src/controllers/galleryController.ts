import { Request, Response } from 'express';
import Gallery from '../models/Gallery';

export const getGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const query = category ? { category: category as string } : {};
    
    const images = await Gallery.find(query).sort({ uploadedAt: -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: Unable to fetch gallery.' });
  }
};

export const addGalleryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, imageUrl, altText } = req.body;
    
    if (!category || !imageUrl || !altText) {
      res.status(400).json({ success: false, error: 'Please provide all required fields.' });
      return;
    }

    const newImage = await Gallery.create({ category, imageUrl, altText });
    res.status(201).json({ success: true, data: newImage });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add image to gallery.' });
  }
};

export const deleteGalleryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedImage = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedImage) {
      res.status(404).json({ success: false, error: 'Image not found.' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete image.' });
  }
};
