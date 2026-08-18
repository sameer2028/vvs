import express from 'express';
import { getCommittees, getCommitteeBySlug, createCommittee, updateCommittee, deleteCommittee } from '../controllers/committeeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCommittees);
router.get('/:slug', getCommitteeBySlug);

// Admin routes
router.post('/', protect, adminOnly, createCommittee);
router.put('/:id', protect, adminOnly, updateCommittee);
router.delete('/:id', protect, adminOnly, deleteCommittee);

export default router;
