import mongoose from 'mongoose';

const analyticsLogSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    trim: true,
    default: '/'
  },
  visitorId: {
    type: String,
    required: true,
    index: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  referrer: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Add composite index for quick time-range & visitor aggregation
analyticsLogSchema.index({ createdAt: -1 });
analyticsLogSchema.index({ path: 1, createdAt: -1 });

export default mongoose.model('AnalyticsLog', analyticsLogSchema);
