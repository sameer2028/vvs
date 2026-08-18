import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const clear = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await mongoose.connection.db.collection('registrations').deleteMany({});
  await mongoose.connection.db.collection('payments').deleteMany({});
  console.log('Cleared all stale registrations and payments');
  process.exit(0);
};

clear();
