import { Router } from 'express';
import { createMember } from '../controllers/memberController';

const router = Router();

router.post('/', createMember);

export default router;
