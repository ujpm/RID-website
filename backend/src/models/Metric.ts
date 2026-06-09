import mongoose, { Schema, Document } from 'mongoose';

export interface IMetric extends Document {
  label: string;
  value: string;
  iconType: string;
  order: number;
}

const MetricSchema: Schema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  iconType: { type: String, default: 'chart' },
  order: { type: Number, default: 0 }
});

export default mongoose.model<IMetric>('Metric', MetricSchema);
