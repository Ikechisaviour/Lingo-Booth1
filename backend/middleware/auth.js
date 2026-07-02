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
      return res.status(401).json({ message: 'No token, authorization denied', code: 'AUTH_NO_TOKEN' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    // authAt: unix-seconds of the user's last fresh credential proof
    // (password/OAuth login or /auth/step-up). Used by requireRecentAuth.
    req.authAt = typeof decoded.authAt === 'number' ? decoded.authAt : decoded.iat;

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found', code: 'AUTH_USER_NOT_FOUND' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Account suspended', code: 'AUTH_ACCOUNT_SUSPENDED' });
    }

    req.user = user;
    next();
  } catch (error) {
    // Distinguish an expired token from a malformed/invalid one — both were
    // previously an uncoded "Token is not valid" 401, the single most common
    // uncoded entry in the failure dashboard.
    const code = error?.name === 'TokenExpiredError' ? 'AUTH_TOKEN_EXPIRED' : 'AUTH_TOKEN_INVALID';
    res.status(401).json({ message: 'Token is not valid', code });
  }
};

// Step-up gate: require the user's last fresh credential proof to be within
// `maxAgeMinutes`. Returns 401 with code STEP_UP_REQUIRED so clients can
// transparently prompt for a password without treating it as a session expiry.
//
// Place AFTER verifyToken in the middleware chain.
const requireRecentAuth = (maxAgeMinutes = 15) => (req, res, next) => {
  if (typeof req.authAt !== 'number') {
    return res.status(401).json({ message: 'Authentication required', code: 'STEP_UP_REQUIRED' });
  }
  const ageSec = Math.floor(Date.now() / 1000) - req.authAt;
  if (ageSec > maxAgeMinutes * 60) {
    return res.status(401).json({
      message: 'Please confirm your password to continue',
      code: 'STEP_UP_REQUIRED',
      maxAgeMinutes,
    });
  }
  next();
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
    res.status(403).json({ message: 'Access denied. Admin only.', code: 'AUTH_ADMIN_ONLY' });
  }
};

// Check if user is accessing their own resource
const isOwner = (paramName = 'userId') => (req, res, next) => {
  const resourceUserId = req.params[paramName] || req.body.userId;
  if (req.user.role === 'admin' || req.userId === resourceUserId) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. You can only access your own resources.', code: 'AUTH_OWNERSHIP_DENIED' });
  }
};

module.exports = { verifyToken, optionalAuth, isAdmin, isOwner, requireRecentAuth };
