import Committee from '../models/Committee.js';
import Portfolio from '../models/Portfolio.js';

// @desc    Get all active committees
// @route   GET /api/committees
// @access  Public
export const getCommittees = async (req, res) => {
  try {
    const committees = await Committee.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(committees);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching committees' });
  }
};

// @desc    Get committee by slug with portfolios
// @route   GET /api/committees/:slug
// @access  Public
export const getCommitteeBySlug = async (req, res) => {
  try {
    const committee = await Committee.findOne({ slug: req.params.slug, isActive: true });
    
    if (!committee) {
      return res.status(404).json({ message: 'Committee not found' });
    }

    const portfolios = await Portfolio.find({ 
      committeeId: committee._id, 
      isActive: true 
    }).sort({ name: 1 });

    res.json({
      ...committee._doc,
      portfolios
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching committee details' });
  }
};

// @desc    Create new committee
// @route   POST /api/committees
// @access  Private/Admin
export const createCommittee = async (req, res) => {
  try {
    const committee = new Committee(req.body);
    const savedCommittee = await committee.save();
    res.status(201).json(savedCommittee);
  } catch (error) {
    res.status(400).json({ message: 'Invalid committee data', error: error.message });
  }
};

// @desc    Update committee
// @route   PUT /api/committees/:id
// @access  Private/Admin
export const updateCommittee = async (req, res) => {
  try {
    const committee = await Committee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!committee) return res.status(404).json({ message: 'Committee not found' });
    res.json(committee);
  } catch (error) {
    res.status(400).json({ message: 'Invalid committee data', error: error.message });
  }
};

// @desc    Delete committee
// @route   DELETE /api/committees/:id
// @access  Private/Admin
export const deleteCommittee = async (req, res) => {
  try {
    const committee = await Committee.findByIdAndDelete(req.params.id);
    if (!committee) return res.status(404).json({ message: 'Committee not found' });
    
    // Also delete associated portfolios
    await Portfolio.deleteMany({ committeeId: req.params.id });
    
    res.json({ message: 'Committee and associated portfolios deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting committee', error: error.message });
  }
};
