import dotenv from 'dotenv';
// Load environment variables immediately before application setup bootstrap
dotenv.config();

import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

/**
 * Core initialization loop executing initial server dependencies.
 */
const startServer = async (): Promise<void> => {
  // Connect to the external database layer
  await connectDB();

  // Begin listening loops
  app.listen(PORT, () => {
    console.log(`[Server] Core running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();