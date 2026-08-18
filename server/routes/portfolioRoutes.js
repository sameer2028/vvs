import express from 'express';
import { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPortfolios);
router.post('/', protect, adminOnly, createPortfolio);
router.put('/:id', protect, adminOnly, updatePortfolio);
router.delete('/:id', protect, adminOnly, deletePortfolio);

export default router;
