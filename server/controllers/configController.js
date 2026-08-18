import EventConfig from '../models/EventConfig.js';

// Helper to get or create the singleton configuration
const getConfigDocument = async () => {
  let config = await EventConfig.findOne();
  if (!config) {
    // Initialize default if missing
    config = await EventConfig.create({
      isRegistrationOpen: true,
      registrationFee: 1500,
      faqs: [],
      announcements: []
    });
  }
  return config;
};

// @desc    Get public event configuration (FAQs, Settings, Announcements)
// @route   GET /api/config
// @access  Public
export const getConfig = async (req, res) => {
  try {
    const config = await getConfigDocument();
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching config', error: error.message });
  }
};

// @desc    Update event configuration
// @route   PUT /api/admin/config
// @access  Private/Admin
export const updateConfig = async (req, res) => {
  try {
    const config = await getConfigDocument();
    
    // Update fields from request body
    if (req.body.isRegistrationOpen !== undefined) config.isRegistrationOpen = req.body.isRegistrationOpen;
    if (req.body.registrationFee !== undefined) config.registrationFee = req.body.registrationFee;
    if (req.body.registrationDeadline !== undefined) config.registrationDeadline = req.body.registrationDeadline;
    if (req.body.faqs !== undefined) config.faqs = req.body.faqs;
    if (req.body.announcements !== undefined) config.announcements = req.body.announcements;

    const savedConfig = await config.save();
    res.json(savedConfig);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating config', error: error.message });
  }
};
