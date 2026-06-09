import mongoose, { Schema, Document } from 'mongoose';

export interface IUpdate extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Mixed type for Block Editor
  imageUrl: string;
  publishedDate: Date;
}

const UpdateSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  imageUrl: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now }
});

export default mongoose.model<IUpdate>('Update', UpdateSchema);
