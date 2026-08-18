import Registration from '../models/Registration.js';
import Payment from '../models/Payment.js';

// @desc    Get logged-in delegate's full profile
// @route   GET /api/delegate/me
// @access  Private (delegate)
export const getMyProfile = async (req, res) => {
  try {
    const registration = await Registration.findById(req.user._id)
      .populate('committeePref1', 'name slug')
      .populate('committeePref2', 'name slug')
      .populate('portfolioPref1Comm1', 'name')
      .populate('portfolioPref2Comm1', 'name')
      .populate('portfolioPref1Comm2', 'name')
      .populate('portfolioPref2Comm2', 'name')
      .populate('assignedCommittee', 'name slug agenda')
      .populate('assignedPortfolio', 'name');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Fetch payment info
    const payment = await Payment.findOne({ registrationId: registration._id });

    res.json({
      registration,
      payment: payment || null
    });
  } catch (error) {
    console.error('Get delegate profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};
