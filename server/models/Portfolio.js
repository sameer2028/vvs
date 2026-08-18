import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  committeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAllocated: {
    type: Boolean,
    default: false
  },
  allocatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema);
