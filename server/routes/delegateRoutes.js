import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMyProfile } from '../controllers/delegateController.js';

const router = express.Router();

// All delegate routes require authentication
router.get('/me', protect, getMyProfile);

export default router;
