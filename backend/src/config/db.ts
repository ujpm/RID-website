import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB Atlas cluster using configuration
 * credentials defined in environment variables.
 * 
 * @returns {Promise<void>} Resolves when the connection is successfully established.
 */
export const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGO_URI;
    
    if (!connStr) {
      throw new Error('MONGO_URI is missing from environment configuration.');
    }

    const conn = await mongoose.connect(connStr);
    console.log(`[Database] MongoDB Connected Securely: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${(error as Error).message}`);
    process.exit(1);
  }
};