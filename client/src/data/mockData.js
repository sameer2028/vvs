/**
 * Mock data for Phase 1 (public website).
 * In Phase 2, all of this will be fetched from the backend API.
 * These are based exclusively on the PRD — no invented information.
 */

export const eventSettings = {
  eventName: 'Vasant Vaani Sansad 2.0',
  tagline: 'A Platform Where Voices Become Leaders.',
  startDate: '2026-09-26',
  endDate: '2026-09-27',
  venue: 'Vasant Kanya Mahavidyalaya, Kammacha, Varanasi',
  registrationFee: 599,
  registrationOpen: true,
  stats: {
    delegates: 300,
    awards: 40,
    days: 2,
  },
};

export const committees = [
  {
    id: '1',
    name: 'Lok Sabha',
    slug: 'lok-sabha',
    category: 'Youth Parliament',
    categorySlug: 'youth-parliament',
    agenda:
      'Discussion on the constitutional, political and electoral implications of delimitation in India, with special reference to women\'s representation, federal balance, regional equity and representation of marginalised communities.',
    description:
      'The Lok Sabha, or House of the People, is the lower house of India\'s Parliament. This simulation invites delegates to engage with one of the most consequential constitutional debates in contemporary India — the implications of delimitation on representation, equity and federalism.',
    isActive: true,
  },
  {
    id: '2',
    name: 'AIPPM',
    slug: 'aippm',
    category: 'Youth Parliament',
    categorySlug: 'youth-parliament',
    agenda:
      'Deliberation on the crisis in India\'s public examination and recruitment system, with special emphasis on examination paper leaks and nationwide student protests.',
    description:
      'The All India Political Parties Meet (AIPPM) simulates multi-party political discourse. Delegates represent India\'s major political parties and engage in high-stakes deliberation on pressing national issues affecting youth and governance.',
    isActive: true,
  },
  {
    id: '3',
    name: 'UPLA',
    slug: 'upla',
    category: 'Youth Parliament',
    categorySlug: 'youth-parliament',
    agenda:
      'Discussion on the transparency and accountability of public donations to religious institutions within the state.',
    description:
      'The Uttar Pradesh Legislative Assembly simulation brings delegates into the heart of state-level legislative debate. This committee focuses on governance, transparency and the intersection of religion and public accountability.',
    isActive: true,
  },
  {
    id: '4',
    name: 'UNHRC',
    slug: 'unhrc',
    category: 'Global Diplomacy',
    categorySlug: 'global-diplomacy',
    agenda:
      'Protecting human rights in the development and deployment of autonomous weapons systems and military artificial intelligence.',
    description:
      'The United Nations Human Rights Council is the premier international body for the promotion and protection of human rights. Delegates will negotiate on the critical intersection of emerging military technology and fundamental human rights.',
    isActive: true,
  },
  {
    id: '5',
    name: 'UNCSW',
    slug: 'uncsw',
    category: 'Global Diplomacy',
    categorySlug: 'global-diplomacy',
    agenda:
      'Eliminating child, early and forced marriage, with special emphasis on strengthening global action in line with SDG 5.3.',
    description:
      'The United Nations Commission on the Status of Women is the principal global intergovernmental body dedicated to the promotion of gender equality. This committee tackles one of the most urgent global challenges through the lens of the Sustainable Development Goals.',
    isActive: true,
  },
  {
    id: '6',
    name: 'Press Conclave',
    slug: 'press-conclave',
    category: 'Media',
    categorySlug: 'media',
    agenda:
      'The Ethics of Real-Time Crisis Reporting During Political Unrest and Civil Protests.',
    description:
      'The Press Conclave offers a unique journalism experience. On Day 1, delegates debate media ethics. On Day 2, participants take on roles including journalism, report writing, photography and conference-wide media coverage across all committees.',
    isActive: true,
  },
];

export const committeeCategories = [
  {
    name: 'Youth Parliament',
    slug: 'youth-parliament',
    description: 'Simulations of India\'s legislative bodies — engaging with national and state governance.',
    committees: committees.filter((c) => c.categorySlug === 'youth-parliament'),
  },
  {
    name: 'Global Diplomacy',
    slug: 'global-diplomacy',
    description: 'Model United Nations committees — tackling international issues and human rights.',
    committees: committees.filter((c) => c.categorySlug === 'global-diplomacy'),
  },
  {
    name: 'Media',
    slug: 'media',
    description: 'Journalism and media coverage — reporting, writing and documenting the conference.',
    committees: committees.filter((c) => c.categorySlug === 'media'),
  },
];

export const coreTeam = [
  { name: 'Udita Rathi', role: 'Secretary General', category: 'core' },
  { name: 'Somya Subham', role: 'Co-Secretary General', category: 'core' },
  { name: 'Shubhangi Chakrawal', role: 'Director General', category: 'core' },
  { name: 'Shreya Singh', role: 'Chef D Cabinet', category: 'core' },
  { name: 'Preeti Soren', role: 'Charge D\'Affairs', category: 'core' },
];

export const institutionalTeam = [
  { name: 'Dr. Ashish Kumar Sonkar', role: 'Nodal Officer', category: 'institutional' },
  { name: 'Prof. Rachna Srivastava', role: 'Mentor', category: 'institutional' },
  { name: 'Smt. Uma Bhattacharya', role: 'Patron', category: 'institutional' },
];

export const awardsAndBenefits = [
  {
    title: 'Cash Prizes',
    description: 'Competitive cash prizes for outstanding delegates across all committees.',
    icon: 'trophy',
  },
  {
    title: 'Certificates',
    description: 'Participation and excellence certificates for all registered delegates.',
    icon: 'award',
  },
  {
    title: 'Trophies & Awards',
    description: 'Individual trophies recognizing Best Delegate, High Commendation and Special Mention.',
    icon: 'medal',
  },
  {
    title: 'Delegate Kit',
    description: 'Exclusive conference kit with materials and resources for all participants.',
    icon: 'package',
  },
  {
    title: 'Networking',
    description: 'Connect with 300+ ambitious students from across India at a national-level conference.',
    icon: 'users',
  },
  {
    title: 'Workshops',
    description: 'Skill-building sessions covering public speaking, diplomacy and critical thinking.',
    icon: 'graduation-cap',
  },
  {
    title: 'Social Media Recognition',
    description: 'Winners and participants featured on official VVS social media platforms.',
    icon: 'share-2',
  },
  {
    title: 'Skill Development',
    description: 'Develop leadership, negotiation, policy analysis and public speaking skills.',
    icon: 'trending-up',
  },
];

export const faqs = [
  {
    category: 'Event',
    items: [
      {
        question: 'What is VVS 2.0?',
        answer:
          'Vasant Vaani Sansad 2.0 is the flagship Youth Parliament and Model United Nations conference of Vasant Kanya Mahavidyalaya, BHU. It brings together 300+ students to debate, collaborate and engage with real-world political and international issues.',
      },
      {
        question: 'When and where is VVS 2.0?',
        answer:
          'VVS 2.0 will be held on 26–27 September 2026 at Vasant Kanya Mahavidyalaya, Kammacha, Varanasi, Uttar Pradesh.',
      },
      {
        question: 'Who can participate?',
        answer:
          'Eligibility details will be confirmed by the organizing team. Please check back for updates or contact the VVS team directly.',
      },
    ],
  },
  {
    category: 'Registration',
    items: [
      {
        question: 'What is the registration fee?',
        answer:
          'The registration fee is ₹599 per delegate.',
      },
      {
        question: 'How do I register?',
        answer:
          'Click the "Register Now" button on this website to begin the registration process. You will need to provide personal details, committee preferences, and payment information.',
      },
      {
        question: 'How are committee preferences handled?',
        answer:
          'During registration, you can select two committee preferences. The organizing team will consider your preferences and allocate committees based on availability and other factors.',
      },
    ],
  },
  {
    category: 'Committees',
    items: [
      {
        question: 'Which committees are available?',
        answer:
          'VVS 2.0 features six committees across three categories: Youth Parliament (Lok Sabha, AIPPM, UPLA), Global Diplomacy (UNHRC, UNCSW) and Media (Press Conclave).',
      },
      {
        question: 'How are portfolios assigned?',
        answer:
          'Portfolio allocation is managed by the organizing committee. You will be able to select portfolio preferences during registration, and the final allocation will be communicated through the delegate dashboard.',
      },
    ],
  },
  {
    category: 'Payment',
    items: [
      {
        question: 'How do I pay?',
        answer:
          'Payment is made via UPI. During registration, you will see the UPI QR code and UPI ID. After paying, enter your transaction ID and upload a screenshot for verification.',
      },
      {
        question: 'How long does payment verification take?',
        answer:
          'Payment verification is handled by the organizing team. You will be notified once your payment is verified. Please allow reasonable time for processing.',
      },
    ],
  },
];

export const contactInfo = {
  email: 'vasantvaanisansad@gmail.com',
  instagram: '@ig._vvs',
  instagramUrl: 'https://instagram.com/ig._vvs',
  whatsapp: '9450378138',
  contacts: [
    { name: 'Preeti Soren', phone: '9631897232' },
    { name: 'Shreya Singh', phone: '9305786651' },
  ],
  venue: {
    name: 'Vasant Kanya Mahavidyalaya',
    address: 'Kammacha, Varanasi, Uttar Pradesh',
  },
};
