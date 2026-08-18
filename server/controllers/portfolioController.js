import Portfolio from '../models/Portfolio.js';
import Committee from '../models/Committee.js';

// @desc    Get all portfolios (optionally filtered by committee)
// @route   GET /api/portfolios
// @access  Public
export const getPortfolios = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.committeeId) {
      filter.committeeId = req.query.committeeId;
    }
    const portfolios = await Portfolio.find(filter).populate('committeeId', 'name slug category');
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching portfolios' });
  }
};

// @desc    Create a new portfolio
// @route   POST /api/portfolios
// @access  Private/Admin
export const createPortfolio = async (req, res) => {
  try {
    const { committeeId, name } = req.body;
    
    // Check if committee exists
    const committee = await Committee.findById(committeeId);
    if (!committee) {
      return res.status(404).json({ message: 'Committee not found' });
    }

    const portfolio = new Portfolio({ committeeId, name });
    const savedPortfolio = await portfolio.save();
    
    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(400).json({ message: 'Invalid portfolio data', error: error.message });
  }
};

// @desc    Update a portfolio
// @route   PUT /api/portfolios/:id
// @access  Private/Admin
export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: 'Invalid portfolio data', error: error.message });
  }
};

// @desc    Delete a portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private/Admin
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json({ message: 'Portfolio deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting portfolio', error: error.message });
  }
};
