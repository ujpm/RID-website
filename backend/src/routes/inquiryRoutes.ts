import express from 'express';
import { createInquiry } from '../controllers/inquiryController';

const router = express.Router();

router.post('/', createInquiry);

export default router;