import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRoutes from './routes/api.js';
import Committee from './models/Committee.js';


// Load env vars
dotenv.config();

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : 'http://localhost:5173';
    const allowedOrigins = [
      'https://vvsonline.in',
      'https://www.vvsonline.in',
      'http://vvsonline.in',
      'http://www.vvsonline.in'
    ];
    // Allow local development, configured CLIENT_URL, vvsonline.in domains, and Vercel domain aliases
    if (
      !origin ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:') ||
      origin === clientUrl ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vvsonline.in') ||
      origin.endsWith('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Health check routes (GET and HEAD)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VVS 2.0 API is running' });
});
app.head('/api/health', (req, res) => {
  res.status(200).end();
});

// Top-level health check for Render
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
app.head('/health', (req, res) => {
  res.status(200).end();
});

// Robots.txt route
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /delegate/
Disallow: /api/

Sitemap: https://vvsonline.in/sitemap.xml`);
});

// Dynamic Sitemap route
app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://vvsonline.in';
    const staticPages = [
      '',
      '/about',
      '/committees',
      '/register',
      '/venue',
      '/schedule',
      '/awards',
      '/team',
      '/vvs-1',
      '/faq',
      '/contact'
    ];

    let committeePages = [];
    try {
      const committees = await Committee.find({ isActive: true }).select('slug');
      committeePages = committees.map(c => `/committees/${c.slug}`);
    } catch (e) {
      // Fallback
    }

    const allPages = [...staticPages, ...committeePages];
    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page === '' || page === '/register' || page === '/committees' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/committees') || page === '/register' ? '0.9' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).end();
  }
});


// Mount API routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
