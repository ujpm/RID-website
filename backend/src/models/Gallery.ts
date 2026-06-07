import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface representing a gallery image.
 * Maps to the GET /api/gallery frontend requirement.
 */
export interface IGallery extends Document {
  category: string;
  imageUrl: string;
  altText: string;
  uploadedAt: Date;
}

/**
 * Mongoose Schema for the Media Gallery.
 */
const GallerySchema: Schema = new Schema({
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  altText: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IGallery>('Gallery', GallerySchema);
