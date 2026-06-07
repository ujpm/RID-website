import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface representing a newsletter subscriber.
 * Captures data originating from the global Footer.tsx component.
 */
export interface ISubscriber extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
}

/**
 * Mongoose Schema for Newsletter Subscribers.
 */
const SubscriberSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
