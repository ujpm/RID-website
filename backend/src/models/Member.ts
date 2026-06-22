import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
  name: string;
  email: string;
  message?: string;
  linkedinProfile?: string;
  createdAt: Date;
}

const MemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: false },
  linkedinProfile: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMember>('Member', MemberSchema);
