import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Registration from '../models/Registration.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Admin Login
// @route   POST /api/auth/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      if (!admin.isActive) {
        return res.status(403).json({ message: 'Account has been deactivated' });
      }

      // Set cookie
      const isProd = process.env.NODE_ENV === 'production';
      const token = generateToken(admin._id, admin.role);
      res.cookie('admin_token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Delegate Login
// @route   POST /api/auth/delegate/login
// @access  Public
export const delegateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const registration = await Registration.findOne({ 
      email: email.toLowerCase()
    });

    if (registration && (await bcrypt.compare(password, registration.password))) {
      // Delegate token
      const isProd = process.env.NODE_ENV === 'production';
      const token = generateToken(registration._id, 'delegate');
      res.cookie('delegate_token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.json({
        _id: registration._id,
        registrationId: registration.registrationId,
        fullName: registration.fullName,
        email: registration.email,
        role: 'delegate',
        status: registration.status,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Admin Logout
// @route   POST /api/auth/admin/logout
// @access  Public
export const adminLogout = (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('admin_token', '', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax', expires: new Date(0) });
  res.status(200).json({ message: 'Admin logged out successfully' });
};

// @desc    Delegate Logout
// @route   POST /api/auth/delegate/logout
// @access  Public
export const delegateLogout = (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('delegate_token', '', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax', expires: new Date(0) });
  res.status(200).json({ message: 'Delegate logged out successfully' });
};

