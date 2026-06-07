import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface representing a news article or update.
 * Maps to the GET /api/updates frontend requirement.
 */
export interface IUpdate extends Document {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedDate: Date;
}

/**
 * Mongoose Schema for Updates & News.
 */
const UpdateSchema: Schema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now }
});

export default mongoose.model<IUpdate>('Update', UpdateSchema);
