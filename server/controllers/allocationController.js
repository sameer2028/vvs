import Registration from '../models/Registration.js';
import Committee from '../models/Committee.js';
import Portfolio from '../models/Portfolio.js';

// @desc    Get all delegates awaiting or with allocations (payment_verified or allocated)
// @route   GET /api/admin/allocations
// @access  Private/Admin
export const getAllocations = async (req, res) => {
  try {
    const delegates = await Registration.find({ 
      status: { $in: ['payment_verified', 'allocated'] }
    })
    .populate('committeePref1', 'name')
    .populate('committeePref2', 'name')
    .populate('portfolioPref1Comm1', 'name')
    .populate('portfolioPref2Comm1', 'name')
    .populate('portfolioPref1Comm2', 'name')
    .populate('portfolioPref2Comm2', 'name')
    .populate('assignedCommittee', 'name')
    .populate('assignedPortfolio', 'name')
    .sort({ createdAt: 1 }); // Oldest registrations first (FCFS)

    res.json(delegates);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching allocations', error: error.message });
  }
};

// @desc    Assign committee and portfolio to a delegate
// @route   POST /api/admin/allocations/:id
// @access  Private/Admin
export const assignAllocation = async (req, res) => {
  try {
    const { committeeId, portfolioId } = req.body;
    
    if (!committeeId || !portfolioId) {
      return res.status(400).json({ message: 'Both committee and portfolio are required' });
    }

    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Verify committee and portfolio exist
    const committee = await Committee.findById(committeeId);
    if (!committee) return res.status(404).json({ message: 'Committee not found' });
    
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    // Update the registration
    registration.assignedCommittee = committeeId;
    registration.assignedPortfolio = portfolioId;
    registration.status = 'allocated';
    
    await registration.save();

    res.json({ message: 'Allocation successful', registration });
  } catch (error) {
    res.status(500).json({ message: 'Server error saving allocation', error: error.message });
  }
};
