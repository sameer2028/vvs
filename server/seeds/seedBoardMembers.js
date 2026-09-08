import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Committee from '../models/Committee.js';
import BoardMember from '../models/BoardMember.js';

dotenv.config();

const boardMembersData = {
  'upla': [
    { name: 'Shubham Tripathi', post: 'Speaker', order: 1 },
    { name: 'Mitra Ray', post: 'Deputy Speaker', order: 2 },
    { name: 'Akshat Singh', post: 'Co-Deputy Speaker', order: 3 },
  ],
  'lok-sabha': [
    { name: 'Akanksha Singh', post: 'Co-Speaker', order: 1 },
    { name: 'Adarsh Pratap Singh', post: 'Co-Speaker', order: 2 },
    { name: 'Anant Gupta', post: 'Deputy Speaker', order: 3 },
    { name: 'Saubhagya Kunwar', post: 'Co-Deputy Speaker', order: 4 },
  ],
  'aippm': [
    { name: 'Aashish Tripathi', post: 'Co-Moderator', order: 1 },
    { name: 'Shreyash Shivam', post: 'Co-Moderator', order: 2 },
    { name: 'Ambu Padmnabh', post: 'Deputy Moderator', order: 3 },
    { name: 'Anshika Mishra', post: 'Political Advisor', order: 4 },
  ],
  'uncsw': [
    { name: 'Aayush Bhardwaj', post: 'Chairperson', order: 1 },
    { name: 'Kumar Harsh', post: 'Co-Chairperson', order: 2 },
    { name: 'Kaushik Anand', post: 'Vice Chairperson', order: 3 },
  ],
  'unhrc': [
    { name: 'Niharika Jaiswal', post: 'Chairperson', order: 1 },
    { name: 'Samiksha Jha', post: 'Vice Chairperson', order: 2 },
  ],
  'press-conclave': [
    { name: 'Shantanu Upadhyay', post: 'Editor-in-Chief', order: 1 },
    { name: 'Swarnil Bhattacharya', post: 'Chief of Press', order: 2 },
  ],
};

async function seedBoardMembers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing board members
    await BoardMember.deleteMany({});
    console.log('🗑️  Cleared existing board members');

    // Fetch all committees
    const committees = await Committee.find({});
    const slugToId = {};
    committees.forEach(c => { slugToId[c.slug] = c._id; });

    console.log(`📋 Found ${committees.length} committees:`, Object.keys(slugToId).join(', '));

    let totalInserted = 0;

    for (const [slug, members] of Object.entries(boardMembersData)) {
      const committeeId = slugToId[slug];
      if (!committeeId) {
        console.warn(`⚠️  Committee "${slug}" not found in DB, skipping...`);
        continue;
      }

      const docs = members.map(m => ({
        committeeId,
        name: m.name,
        post: m.post,
        photoUrl: '', // No photo — placeholder will be shown
        order: m.order,
      }));

      await BoardMember.insertMany(docs);
      totalInserted += docs.length;
      console.log(`  ✅ ${slug}: ${docs.length} board members inserted`);
    }

    console.log(`\n🎉 Done! Inserted ${totalInserted} board members across ${Object.keys(boardMembersData).length} committees.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding board members:', error);
    process.exit(1);
  }
}

seedBoardMembers();
