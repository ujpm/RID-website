import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Gallery from '../models/Gallery';

const generateSlug = (title: string) => 
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

export const getGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const query = category && category !== 'All' ? { category: category as string } : {};
    const albums = await Gallery.find(query).sort({ uploadedAt: -1 });
    res.status(200).json({ success: true, data: albums });
  } catch (error) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

export const getAlbumBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const identifier = req.params.slug as string;
    const query = mongoose.Types.ObjectId.isValid(identifier) 
      ? { $or: [{ _id: identifier }, { slug: identifier }] } 
      : { slug: identifier };
      
    const album = await Gallery.findOne(query);
    if (!album) { res.status(404).json({ success: false, error: 'Not found' }); return; }
    res.status(200).json({ success: true, data: album });
  } catch (error) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

export const addGalleryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, description, coverImage, images } = req.body;
    const slug = generateSlug(title);
    const newAlbum = await Gallery.create({ title, slug, category, description, coverImage, images });
    res.status(201).json({ success: true, data: newAlbum });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to create album.' }); }
};

export const updateAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, description, coverImage, images } = req.body;
    const slug = generateSlug(title);
    const updated = await Gallery.findByIdAndUpdate(req.params.id, { title, slug, category, description, coverImage, images }, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to update album.' }); }
};

export const deleteGalleryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to delete album.' }); }
};
