import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 }
});

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  date: { type: Date, default: Date.now }
});

const eventConfigSchema = new mongoose.Schema({
  // General Settings
  isRegistrationOpen: { type: Boolean, default: true },
  registrationFee: { type: Number, default: 1500 },
  registrationDeadline: { type: Date },
  
  // Embedded Arrays for Content Management
  faqs: [faqSchema],
  announcements: [announcementSchema]
}, { timestamps: true });

// Ensure we only ever have ONE configuration document
// There are multiple ways to do this, but usually we just always fetch/update the first document.

export default mongoose.model('EventConfig', eventConfigSchema);
