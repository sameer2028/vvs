import BoardMember from '../models/BoardMember.js';

// @desc    Get board members for a committee
// @route   GET /api/board-members/:committeeId
// @access  Public
export const getBoardMembers = async (req, res) => {
  try {
    const members = await BoardMember.find({ committeeId: req.params.committeeId })
      .sort({ order: 1, createdAt: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching board members' });
  }
};

// @desc    Create a board member
// @route   POST /api/board-members
// @access  Private/Admin
export const createBoardMember = async (req, res) => {
  try {
    const member = new BoardMember(req.body);
    const saved = await member.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Invalid board member data', error: error.message });
  }
};

// @desc    Update a board member
// @route   PUT /api/board-members/:id
// @access  Private/Admin
export const updateBoardMember = async (req, res) => {
  try {
    const member = await BoardMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!member) return res.status(404).json({ message: 'Board member not found' });
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: 'Invalid board member data', error: error.message });
  }
};

// @desc    Delete a board member
// @route   DELETE /api/board-members/:id
// @access  Private/Admin
export const deleteBoardMember = async (req, res) => {
  try {
    const member = await BoardMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Board member not found' });
    res.json({ message: 'Board member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting board member', error: error.message });
  }
};
