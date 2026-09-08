import express from 'express';
import { getBoardMembers, createBoardMember, updateBoardMember, deleteBoardMember } from '../controllers/boardMemberController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/:committeeId', getBoardMembers);

// Admin
router.post('/', protect, adminOnly, createBoardMember);
router.put('/:id', protect, adminOnly, updateBoardMember);
router.delete('/:id', protect, adminOnly, deleteBoardMember);

export default router;
