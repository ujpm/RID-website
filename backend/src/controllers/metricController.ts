import { Request, Response } from 'express';
import Metric from '../models/Metric';

export const getMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const metrics = await Metric.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch metrics.' });
  }
};

export const createMetric = async (req: Request, res: Response): Promise<void> => {
  try {
    const { label, value, iconType, order } = req.body;
    if (!label || !value) {
      res.status(400).json({ success: false, error: 'Label and Value are required.' });
      return;
    }
    const newMetric = await Metric.create({ label, value, iconType, order });
    res.status(201).json({ success: true, data: newMetric });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create metric.' });
  }
};

export const updateMetric = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedMetric = await Metric.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMetric) {
      res.status(404).json({ success: false, error: 'Metric not found.' });
      return;
    }
    res.status(200).json({ success: true, data: updatedMetric });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update metric.' });
  }
};

export const deleteMetric = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedMetric = await Metric.findByIdAndDelete(req.params.id);
    if (!deletedMetric) {
      res.status(404).json({ success: false, error: 'Metric not found.' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete metric.' });
  }
};
