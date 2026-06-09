import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Update from '../models/Update';

const generateSlug = (title: string) => 
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

export const getUpdates = async (req: Request, res: Response): Promise<void> => {
  try {
    const updates = await Update.find().sort({ publishedDate: -1 });
    res.status(200).json({ success: true, data: updates });
  } catch (error) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

export const getUpdateBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const identifier = req.params.slug as string; // Explicit string cast for TS
    const query = mongoose.Types.ObjectId.isValid(identifier) 
      ? { $or: [{ _id: identifier }, { slug: identifier }] } 
      : { slug: identifier };
      
    const update = await Update.findOne(query);
    if (!update) { res.status(404).json({ success: false, error: 'Not found' }); return; }
    res.status(200).json({ success: true, data: update });
  } catch (error) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

export const createUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, excerpt, content, imageUrl } = req.body;
    const slug = generateSlug(title);
    const newUpdate = await Update.create({ title, slug, excerpt, content, imageUrl });
    res.status(201).json({ success: true, data: newUpdate });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to create' }); }
};

export const updateUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, excerpt, content, imageUrl } = req.body;
    const slug = generateSlug(title); 
    const updated = await Update.findByIdAndUpdate(req.params.id, { title, slug, excerpt, content, imageUrl }, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to update' }); }
};

export const deleteUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    await Update.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to delete' }); }
};
