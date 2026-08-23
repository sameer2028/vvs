import express from 'express';
import { trackPageView, getAnalyticsStats } from '../controllers/analyticsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to log page visits
router.post('/track', trackPageView);

// Admin route to fetch traffic analytics summary
router.get('/stats', protect, adminOnly, getAnalyticsStats);

export default router;
