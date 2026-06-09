import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImage: string;
  images: string[];
  uploadedAt: Date;
}

const GallerySchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  images: { type: [String], default: [] },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IGallery>('Gallery', GallerySchema);
