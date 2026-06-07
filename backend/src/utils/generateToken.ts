import jwt from 'jsonwebtoken';

/**
 * Generates a signed JSON Web Token valid for 30 days.
 * @param id The MongoDB User ID
 */
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};
