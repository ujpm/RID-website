import { Request, Response } from 'express';
import Member from '../models/Member';

export const createMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message, linkedinProfile } = req.body;
    
    const newMember = new Member({
      name,
      email,
      message,
      linkedinProfile
    });

    await newMember.save();
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};
