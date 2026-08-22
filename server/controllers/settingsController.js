import Settings from '../models/Settings.js';

// @desc    Get public event settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings exist yet, return defaults
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching event settings' });
  }
};

// @desc    Update event settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;

    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: 'Invalid settings data', error: error.message });
  }
};
