import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * Middleware to intercept and validate JWTs in the Authorization header.
 */
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      
      // Attach the user (excluding the password hash) to the request object
      req.user = await User.findById(decoded.id).select('-passwordHash') as IUser;
      next();
    } catch (error) {
      res.status(401).json({ success: false, error: 'Not authorized, token verification failed.' });
    }
  } else {
    res.status(401).json({ success: false, error: 'Not authorized, no token provided.' });
  }
};
