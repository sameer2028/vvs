import mongoose from 'mongoose';

const committeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['youth_parliament', 'global_diplomacy', 'media'],
    required: true
  },
  agenda: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    default: ''
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Committee', committeeSchema);
