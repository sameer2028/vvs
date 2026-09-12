import express from 'express';
import { trackPageView, getAnalyticsStats, getDetailedAnalytics } from '../controllers/analyticsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to log page visits
router.post('/track', trackPageView);

// Admin route to fetch traffic analytics summary
router.get('/stats', protect, adminOnly, getAnalyticsStats);

// Admin route to fetch detailed analytics for the analytics page
router.get('/detailed', protect, adminOnly, getDetailedAnalytics);

export default router;

