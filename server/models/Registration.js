import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  registrationId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  classYear: {
    type: String,
    required: true
  },
  studentIdUrl: {
    type: String,
    required: true
  },
  committeePref1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
    required: true
  },
  committeePref2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
    required: true
  },
  portfolioPref1Comm1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  portfolioPref2Comm1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  portfolioPref1Comm2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  portfolioPref2Comm2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  munExperience: {
    type: String,
    enum: ['first', '1-2', '3-5', '5plus'],
    required: true
  },
  referralCode: {
    type: String,
    default: ''
  },
  marketingSource: {
    type: String,
    default: ''
  },
  needsAccommodation: {
    type: Boolean,
    default: false
  },
  assignedCommittee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
    default: null
  },
  assignedPortfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    default: null
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'payment_pending', 'payment_verified', 'payment_rejected', 'committee_pending', 'allocated', 'cancelled'],
    default: 'submitted'
  }
}, { timestamps: true });

export default mongoose.model('Registration', registrationSchema);
