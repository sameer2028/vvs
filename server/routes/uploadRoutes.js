import express from 'express';
import { upload } from '../utils/cloudinary.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload an image to Cloudinary (Admin)
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, adminOnly, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    res.json({
      message: 'Image uploaded successfully',
      url: req.file.path
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server error during image upload', error: error.message });
  }
});

// @desc    Upload an image to Cloudinary (Any authenticated user — delegates for payment screenshots)
// @route   POST /api/upload/payment
// @access  Private
router.post('/payment', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    res.json({
      message: 'Image uploaded successfully',
      url: req.file.path
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server error during image upload', error: error.message });
  }
});

// @desc    Upload an image to Cloudinary (Public - for registration ID and payment)
// @route   POST /api/upload/public
// @access  Public
router.post('/public', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    res.json({
      message: 'Image uploaded successfully',
      url: req.file.path
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server error during image upload', error: error.message });
  }
});

export default router;
