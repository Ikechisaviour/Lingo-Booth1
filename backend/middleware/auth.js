const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is not set');
  process.exit(1);
}

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Account suspended' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Optional auth — attaches user if token present, but allows guests through
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return next(); // No token = guest, allow through

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    const user = await User.findById(decoded.userId).select('-password');
    if (user && user.status !== 'suspended') {
      req.user = user;
    }
  } catch (_) {
    // Invalid token — treat as guest
  }
  next();
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// Check if user is accessing their own resource
const isOwner = (paramName = 'userId') => (req, res, next) => {
  const resourceUserId = req.params[paramName] || req.body.userId;
  if (req.user.role === 'admin' || req.userId === resourceUserId) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. You can only access your own resources.' });
  }
};

module.exports = { verifyToken, optionalAuth, isAdmin, isOwner };
