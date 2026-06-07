import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface representing a contact or partnership inquiry.
 * Captures submissions from the Support.tsx page.
 */
export interface IInquiry extends Document {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  submittedAt: Date;
}

/**
 * Mongoose Schema for Contact Inquiries.
 */
const InquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  inquiryType: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IInquiry>('Inquiry', InquirySchema);
