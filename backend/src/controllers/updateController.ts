import { Request, Response } from 'express';
import Update from '../models/Update';

export const getUpdates = async (req: Request, res: Response): Promise<void> => {
  try {
    const updates = await Update.find().sort({ publishedDate: -1 });
    res.status(200).json({ success: true, data: updates });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error: Unable to fetch updates.' });
  }
};

export const createUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, excerpt, content, imageUrl } = req.body;
    if (!title || !excerpt || !content || !imageUrl) {
      res.status(400).json({ success: false, error: 'Please provide all required fields.' });
      return;
    }
    const newUpdate = await Update.create({ title, excerpt, content, imageUrl });
    res.status(201).json({ success: true, data: newUpdate });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create update.' });
  }
};

// NEW: Update an existing post
export const updateUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, excerpt, content, imageUrl } = req.body;
    const updatedUpdate = await Update.findByIdAndUpdate(
      req.params.id,
      { title, excerpt, content, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedUpdate) {
      res.status(404).json({ success: false, error: 'Update not found.' });
      return;
    }
    res.status(200).json({ success: true, data: updatedUpdate });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update.' });
  }
};

export const deleteUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateId = req.params.id;
    const deletedUpdate = await Update.findByIdAndDelete(updateId);
    if (!deletedUpdate) {
      res.status(404).json({ success: false, error: 'Update not found.' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete update.' });
  }
};
