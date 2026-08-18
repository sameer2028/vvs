import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Committee from '../models/Committee.js';
import Portfolio from '../models/Portfolio.js';
import Registration from '../models/Registration.js';

dotenv.config();

const seedDelegates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Fetch existing committees and portfolios
    const committees = await Committee.find();
    if (committees.length < 2) {
      console.error('❌ Need at least 2 committees. Run the main seed first.');
      process.exit(1);
    }

    // Get portfolios for the first two committees
    const comm1 = committees[0];
    const comm2 = committees[1];
    const portfoliosComm1 = await Portfolio.find({ committeeId: comm1._id });
    const portfoliosComm2 = await Portfolio.find({ committeeId: comm2._id });

    if (portfoliosComm1.length < 2 || portfoliosComm2.length < 2) {
      console.error('❌ Need at least 2 portfolios per committee. Run the main seed first.');
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const delegates = [
      {
        registrationId: 'VVS26-TEST1',
        password: hashedPassword,
        email: 'delegate1@test.com',
        fullName: 'Aarav Sharma',
        phone: '9876543210',
        institution: 'Banaras Hindu University',
        classYear: 'BA 2nd Year',
        studentIdUrl: 'https://placehold.co/400x300?text=Student+ID',
        committeePref1: comm1._id,
        committeePref2: comm2._id,
        portfolioPref1Comm1: portfoliosComm1[0]._id,
        portfolioPref2Comm1: portfoliosComm1[1]._id,
        portfolioPref1Comm2: portfoliosComm2[0]._id,
        portfolioPref2Comm2: portfoliosComm2[1]._id,
        munExperience: '1-2',
        status: 'submitted'
      },
      {
        registrationId: 'VVS26-TEST2',
        password: hashedPassword,
        email: 'delegate2@test.com',
        fullName: 'Priya Verma',
        phone: '9876543211',
        institution: 'Delhi University',
        classYear: 'BSc 3rd Year',
        studentIdUrl: 'https://placehold.co/400x300?text=Student+ID',
        committeePref1: comm2._id,
        committeePref2: comm1._id,
        portfolioPref1Comm1: portfoliosComm2[0]._id,
        portfolioPref2Comm1: portfoliosComm2[1]._id,
        portfolioPref1Comm2: portfoliosComm1[0]._id,
        portfolioPref2Comm2: portfoliosComm1[1]._id,
        munExperience: '3-5',
        status: 'payment_pending'
      },
      {
        registrationId: 'VVS26-TEST3',
        password: hashedPassword,
        email: 'delegate3@test.com',
        fullName: 'Rohan Gupta',
        phone: '9876543212',
        institution: 'IIT BHU',
        classYear: 'BTech 1st Year',
        studentIdUrl: 'https://placehold.co/400x300?text=Student+ID',
        committeePref1: comm1._id,
        committeePref2: comm2._id,
        portfolioPref1Comm1: portfoliosComm1[0]._id,
        portfolioPref2Comm1: portfoliosComm1[1]._id,
        portfolioPref1Comm2: portfoliosComm2[0]._id,
        portfolioPref2Comm2: portfoliosComm2[1]._id,
        munExperience: 'first',
        status: 'payment_verified',
        assignedCommittee: comm1._id,
        assignedPortfolio: portfoliosComm1[0]._id
      },
      {
        registrationId: 'VVS26-TEST4',
        password: hashedPassword,
        email: 'delegate4@test.com',
        fullName: 'Sneha Patel',
        phone: '9876543213',
        institution: 'Lucknow University',
        classYear: 'MA 1st Year',
        studentIdUrl: 'https://placehold.co/400x300?text=Student+ID',
        committeePref1: comm2._id,
        committeePref2: comm1._id,
        portfolioPref1Comm1: portfoliosComm2[0]._id,
        portfolioPref2Comm1: portfoliosComm2[1]._id,
        portfolioPref1Comm2: portfoliosComm1[0]._id,
        portfolioPref2Comm2: portfoliosComm1[1]._id,
        munExperience: '5plus',
        status: 'allocated',
        assignedCommittee: comm2._id,
        assignedPortfolio: portfoliosComm2[1]._id
      },
      {
        registrationId: 'VVS26-TEST5',
        password: hashedPassword,
        email: 'delegate5@test.com',
        fullName: 'Arjun Singh',
        phone: '9876543214',
        institution: 'Allahabad University',
        classYear: 'BA 1st Year',
        studentIdUrl: 'https://placehold.co/400x300?text=Student+ID',
        committeePref1: comm1._id,
        committeePref2: comm2._id,
        portfolioPref1Comm1: portfoliosComm1[0]._id,
        portfolioPref2Comm1: portfoliosComm1[1]._id,
        portfolioPref1Comm2: portfoliosComm2[0]._id,
        portfolioPref2Comm2: portfoliosComm2[1]._id,
        munExperience: '1-2',
        status: 'submitted'
      }
    ];

    // Clear existing test delegates only
    await Registration.deleteMany({ registrationId: { $regex: /^VVS26-TEST/ } });
    console.log('🗑️  Cleared previous test delegates');

    // Insert delegates
    const created = await Registration.insertMany(delegates);
    console.log(`\n🎉 Created ${created.length} test delegates:\n`);

    created.forEach(d => {
      console.log(`   👤 ${d.fullName}`);
      console.log(`      Email: ${d.email}`);
      console.log(`      ID:    ${d.registrationId}`);
      console.log(`      Status: ${d.status}`);
      console.log('');
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔑 Login credentials for Delegate Portal:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    created.forEach(d => {
      console.log(`   ${d.fullName}: ${d.email} / password123`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding delegates:', error);
    process.exit(1);
  }
};

seedDelegates();
