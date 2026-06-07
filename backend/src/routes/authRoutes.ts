import { Router } from 'express';
import { loginUser, seedAdmin } from '../controllers/authController';

const router = Router();

// Endpoint for logging in via the future CMS Dashboard
router.post('/login', loginUser);

// Temporary hidden endpoint to execute the database seed
router.post('/seed', seedAdmin);

export default router;
