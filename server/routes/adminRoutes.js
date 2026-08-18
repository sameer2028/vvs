import express from 'express';
import { 
  getDashboardStats, 
  getRegistrations, 
  getPendingPayments, 
  verifyPayment 
} from '../controllers/adminController.js';
import {
  getAllocations,
  assignAllocation
} from '../controllers/allocationController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dashboard & Stats
router.get('/dashboard', protect, adminOnly, getDashboardStats);

// Registrations
router.get('/registrations', protect, adminOnly, getRegistrations);

// Payments
router.get('/payments/pending', protect, adminOnly, getPendingPayments);
router.put('/payments/:id/verify', protect, adminOnly, verifyPayment);

// Allocations
router.get('/allocations', protect, adminOnly, getAllocations);
router.post('/allocations/:id', protect, adminOnly, assignAllocation);

export default router;
