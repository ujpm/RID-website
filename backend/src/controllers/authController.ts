import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from '../utils/generateToken';

/**
 * @route POST /api/auth/login
 * Authenticates an admin using 'user' and 'password' in the request body.
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { user, password } = req.body;

  try {
    const existingAdmin = await User.findOne({ email: user });
    
    if (existingAdmin && (await bcrypt.compare(password, existingAdmin.passwordHash))) {
      res.json({
        success: true,
        data: {
          _id: existingAdmin._id,
          name: existingAdmin.name,
          email: existingAdmin.email,
          role: existingAdmin.role,
          token: generateToken(existingAdmin._id.toString()),
        }
      });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during authentication.' });
  }
};

/**
 * @route POST /api/auth/seed
 * Hidden initialization route to create the master admin account based on your parameters.
 */
export const seedAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminExists = await User.findOne({ email: 'rid_admin' });
    
    if (adminExists) {
      res.status(400).json({ success: false, error: 'Master Admin has already been seeded.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('thinkagain', salt);

    const adminUser = await User.create({
      name: 'Master Admin',
      email: 'rid_admin',
      passwordHash: hashedPassword,
      role: 'admin'
    });

    res.status(201).json({
      success: true,
      data: {
        message: 'Master Admin created securely.',
        user: adminUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to seed master admin.' });
  }
};
