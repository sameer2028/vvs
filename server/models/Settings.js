import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, default: '' },
  answer: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

const announcementSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  date: { type: Date, default: Date.now }
});

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  role: { type: String, default: '' }, // e.g. "President", "Chief Guest"
  type: { type: String, enum: ['team', 'guest'], default: 'team' },
  imageUrl: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, default: '' },
  caption: { type: String, default: '' },
  order: { type: Number, default: 0 },
  showOnHomepage: { type: Boolean, default: true }
});

const settingsSchema = new mongoose.Schema({
  eventName: {
    type: String,
    default: 'Vasant Vaani Sansad 2.0'
  },
  tagline: {
    type: String,
    default: 'Where Voices Become Leaders'
  },
  startDate: {
    type: Date,
    default: new Date('2026-09-26')
  },
  endDate: {
    type: Date,
    default: new Date('2026-09-27')
  },
  venue: {
    type: String,
    default: 'Vasant Kanya Mahavidyalaya, Kamachha, Varanasi'
  },
  registrationFee: {
    type: Number,
    default: 1500
  },
  upiId: {
    type: String,
    default: 'vkm@upi'
  },
  upiQrUrl: {
    type: String,
    default: ''
  },
  registrationOpen: {
    type: Boolean,
    default: true
  },
  registrationDeadline: {
    type: Date,
    default: new Date('2026-09-20')
  },
  aboutImage: {
    type: String,
    default: ''
  },
  faqs: [faqSchema],
  announcements: [announcementSchema],
  teamMembers: [teamMemberSchema],
  gallery: [gallerySchema]
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
