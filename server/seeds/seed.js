import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Committee from '../models/Committee.js';
import Portfolio from '../models/Portfolio.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const portfoliosData = JSON.parse(fs.readFileSync(path.join(__dirname, 'portfolios.json'), 'utf8'));

const committees = [
  {
    name: 'Lok Sabha',
    slug: 'lok-sabha',
    category: 'youth_parliament',
    agenda: 'Discussion on the Constitutional, Political, and Electoral Implications of Delimitation in India, with Special Reference to Women\'s Representation, Federal Balance, Regional Equity, and the Representation of Marginalised Communities.',
    description: 'The Lok Sabha, or House of the People, is the lower house of India\'s Parliament. This simulation invites delegates to engage with one of the most consequential constitutional debates in contemporary India — the implications of delimitation on representation, equity and federalism.',
    capacity: 105
  },
  {
    name: 'All India Political Parties Meet (AIPPM)',
    slug: 'aippm',
    category: 'youth_parliament',
    agenda: 'Deliberation on the Crisis in India\'s Public Examination and Recruitment System, with Special Emphasis on Examination Paper Leaks, and the Escalating Nationwide Student Protests.',
    description: 'The All India Political Parties Meet (AIPPM) simulates multi-party political discourse. Delegates represent India\'s major political parties and engage in high-stakes deliberation on pressing national issues affecting youth and governance.',
    capacity: 104
  },
  {
    name: 'Uttar Pradesh Legislative Assembly (UPLA)',
    slug: 'upla',
    category: 'youth_parliament',
    agenda: 'Discussion on the Transparency and Accountability of Public Donations to Religious Institutions, within the state.',
    description: 'The Uttar Pradesh Legislative Assembly simulation brings delegates into the heart of state-level legislative debate. This committee focuses on governance, transparency and the intersection of religion and public accountability.',
    capacity: 101
  },
  {
    name: 'United Nations Human Rights Council (UNHRC)',
    slug: 'unhrc',
    category: 'global_diplomacy',
    agenda: 'Protecting Human Rights in the Development and Deployment of Autonomous Weapons Systems and Military Artificial Intelligence.',
    description: 'The United Nations Human Rights Council is the premier international body for the promotion and protection of human rights. Delegates will negotiate on the critical intersection of emerging military technology and fundamental human rights.',
    capacity: 47
  },
  {
    name: 'United Nations Commission on the Status of Women (UNCSW)',
    slug: 'uncsw',
    category: 'global_diplomacy',
    agenda: 'Discussion on Eliminating Child, Early, and Forced Marriage With special emphasis on strengthening global action in line with SDG 5.3.',
    description: 'The United Nations Commission on the Status of Women is the principal global intergovernmental body dedicated to the promotion of gender equality. This committee tackles one of the most urgent global challenges through the lens of the Sustainable Development Goals.',
    capacity: 46
  },
  {
    name: 'Press Conclave',
    slug: 'press-conclave',
    category: 'media',
    agenda: 'The Ethics of Real-Time Crisis Reporting During Political Unrest and Civil Protests.',
    description: 'The Press Conclave offers a unique journalism experience. On Day 1, delegates debate media ethics. On Day 2, participants take on roles including journalism, report writing, photography and conference-wide media coverage across all committees.',
    capacity: 30
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing
    await Committee.deleteMany();
    await Portfolio.deleteMany();
    await Admin.deleteMany();

    // Create Super Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await Admin.create({
      name: 'VVS Organizer',
      email: 'admin@vvs.com',
      password: hashedPassword,
      role: 'super_admin'
    });
    console.log('✅ Super Admin created (admin@vvs.com / admin123)');

    // Create Committees and Portfolios
    for (const cData of committees) {
      const committee = await Committee.create(cData);
      console.log(`✅ Created committee: ${committee.name}`);

      const mapping = {
        'lok-sabha': 'LOK SABHA',
        'aippm': 'AIPPM',
        'upla': 'UPLA',
        'unhrc': 'UNHRC',
        'uncsw': 'UNCSW',
        'press-conclave': 'PRESS CONCLAVE'
      };

      const key = mapping[committee.slug];
      const portfolioNames = portfoliosData[key] || [];
      const portfoliosToCreate = portfolioNames.map(name => ({
        committeeId: committee._id,
        name: name
      }));

      if (portfoliosToCreate.length > 0) {
        await Portfolio.insertMany(portfoliosToCreate);
        console.log(`✅ Added ${portfoliosToCreate.length} portfolios to ${committee.name}`);
      }
    }

    console.log('🎉 Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
