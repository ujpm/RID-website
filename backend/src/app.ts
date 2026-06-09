import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import updateRoutes from './routes/updateRoutes';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import galleryRoutes from './routes/galleryRoutes';
import metricRoutes from './routes/metricRoutes';

const app: Application = express();

app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'https://musical-meme-x599q44xq6xcpwxp-5173.app.github.dev',
    'https://rid-frontend-9t6.pages.dev'
  ],
  credentials: true
}));

app.use(express.json());

// Mount modular API routes
app.use('/api/updates', updateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/metrics', metricRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: { status: 'healthy', timestamp: new Date().toISOString() }
  });
});

export default app;
