import express from 'express';
import registrationRoutes from './registrationRoutes.js';
import authRoutes from './authRoutes.js';
import committeeRoutes from './committeeRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import settingsRoutes from './settingsRoutes.js';
import adminRoutes from './adminRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import delegateRoutes from './delegateRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/registrations', registrationRoutes);
router.use('/committees', committeeRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/payments', paymentRoutes);
router.use('/settings', settingsRoutes);
router.use('/admin', adminRoutes);
router.use('/upload', uploadRoutes);
router.use('/delegate', delegateRoutes);

export default router;
