import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Settings from './models/Settings.js';

dotenv.config();

const updateSettings = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings();
  }
  
  settings.registrationFee = 599;
  settings.tagline = 'A Platform Where Voices Become Leaders.';
  
  const teamMembers = [
    { name: 'Udita Rathi', role: 'SECRETARY GENERAL', type: 'team', order: 1, imageUrl: '/assets/placeholder.jpg' },
    { name: 'Somya Subham', role: 'CO-SECRETARY GENERAL', type: 'team', order: 2, imageUrl: '/assets/placeholder.jpg' },
    { name: 'Shubhangi Chakrawal', role: 'DIRECTOR GENERAL', type: 'team', order: 3, imageUrl: '/assets/placeholder.jpg' },
    { name: 'Shreya Singh', role: 'CHEF D CABINET', type: 'team', order: 4, imageUrl: '/assets/placeholder.jpg' },
    { name: 'Preeti Soren', role: 'CHARGE D\'AFFAIRS', type: 'team', order: 5, imageUrl: '/assets/placeholder.jpg' },
    // Guests
    { name: 'Shri R.N. Singh', role: 'CHIEF GUEST', type: 'guest', order: 1, imageUrl: '/assets/placeholder.jpg' },
    { name: 'Hon\'ble Justice A.K. Sharma', role: 'KEYNOTE SPEAKER', type: 'guest', order: 2, imageUrl: '/assets/placeholder.jpg' },
    { name: 'Dr. Meera Patel', role: 'JUDGE - LOK SABHA', type: 'guest', order: 3, imageUrl: '/assets/placeholder.jpg' },
    { name: 'Prof. S.K. Verma', role: 'JUDGE - AIPPM', type: 'guest', order: 4, imageUrl: '/assets/placeholder.jpg' }
  ];
  
  settings.teamMembers = teamMembers;
  
  await settings.save();
  console.log('✅ Settings updated with brochure details');
  process.exit(0);
};

updateSettings();
