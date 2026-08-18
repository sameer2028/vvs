import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRoutes from './routes/api.js';

// Load env vars
dotenv.config();

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5174',
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

// Mount API routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
