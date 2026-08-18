import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Registration from '../models/Registration.js';

export const protect = async (req, res, next) => {
  let token;
  const isDelegateRoute = req.originalUrl.includes('/delegate') || req.originalUrl.includes('/upload/payment');

  if (isDelegateRoute) {
    token = req.cookies.delegate_token;
  } else {
    token = req.cookies.admin_token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === 'delegate') {
        req.user = await Registration.findById(decoded.id).select('-password');
        req.user.role = 'delegate';
      } else {
        req.user = await Admin.findById(decoded.id).select('-password');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && ['super_admin', 'organizer', 'content_manager'].includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'super_admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as super admin' });
  }
};
