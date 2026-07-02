const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./models/User');
const ensureCertificateIndexes = require('./utils/ensureCertificateIndexes');
const { notFoundHandler, errorHandler, installProcessHandlers } = require('./middleware/errorHandler');

// Backstop: surface unhandled rejections / uncaught exceptions to the dashboard.
installProcessHandlers();

const app = express();

// Middleware
const allowedOrigins = process.env.FRONTEND_ORIGINS
  ? process.env.FRONTEND_ORIGINS.split(',').map(o => o.trim())
  : [process.env.FRONTEND_ORIGIN || 'http://localhost:3000'];
// Always allow localhost for development
if (!allowedOrigins.includes('http://localhost:3000')) {
  allowedOrigins.push('http://localhost:3000');
}
if (!allowedOrigins.includes('http://localhost:3001')) {
  allowedOrigins.push('http://localhost:3001');
}
if (!allowedOrigins.includes('http://localhost:3002')) {
  allowedOrigins.push('http://localhost:3002');
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, health checks)
    if (!origin) return callback(null, true);
    // Allow explicit origins + any Vercel preview deployment
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Lingo-Device-Id']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// Safety net: guarantee every error response (from ANY middleware/route/library
// downstream) carries a code + ref, and record uncoded 5xx. Mounted as early as
// possible — before body parsing — so even a malformed-JSON parse error (thrown
// inside express.json) still gets tagged when it reaches the error handler.
const { tagErrorResponses } = require('./middleware/responseTagger');
app.use(tagErrorResponses);

app.use('/api/billing/webhook', express.raw({ type: 'application/json', limit: '1mb' }));
app.use(express.json({ limit: '2mb' }));

// Rate limiting
const trackRateLimitHit = async (req) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) return;
    const token = authHeader.replace('Bearer ', '');
    if (!token) return;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && decoded.userId) {
      await User.findByIdAndUpdate(decoded.userId, {
        $inc: { rateLimitHits: 1 },
        $set: { lastRateLimited: new Date() },
      });
    }
  } catch (err) {
    // Token invalid/expired or DB error - silently ignore
  }
};

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  handler: async (req, res, next, options) => {
    await trackRateLimitHit(req);
    res.status(options.statusCode).json({ message: 'Too many requests, please try again later', code: 'RATE_LIMITED' });
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  handler: async (req, res, next, options) => {
    await trackRateLimitHit(req);
    res.status(options.statusCode).json({ message: 'Too many authentication attempts, please try again later', code: 'AUTH_RATE_LIMITED' });
  },
});

app.use('/api/', generalLimiter);
// Apply strict auth limiter only to sensitive auth endpoints (not guest-activity)
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/google', authLimiter);
app.use('/api/auth/resend-verification', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
app.use('/api/auth/reset-password', authLimiter);
app.use('/api/auth/refresh', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  handler: (req, res) => res.status(429).json({ message: 'Too many refresh attempts', code: 'AUTH_RATE_LIMITED' }),
}));
app.use('/api/contact', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  handler: (req, res) => res.status(429).json({ message: 'Too many contact attempts, please try again later', code: 'RATE_LIMITED' }),
}));
app.use('/api/semester-interest', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  handler: (req, res) => res.status(429).json({ message: 'Too many requests, please try again later', code: 'RATE_LIMITED' }),
}));
// Only throttle review submissions (POST); the approved-reviews GET is read by
// every landing-page visitor and must not be rate limited.
app.use('/api/reviews', (req, res, next) => {
  if (req.method !== 'POST') return next();
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8,
    handler: (r, response) => response.status(429).json({ message: 'Too many requests, please try again later', code: 'RATE_LIMITED' }),
  })(req, res, next);
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/korean-learning', { family: 4 })
  .then(async () => {
    console.log('MongoDB connected');
    try {
      await ensureCertificateIndexes();
    } catch (err) {
      console.error('Certificate index check failed:', err.message);
    }
  })
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const learningContentRouter = require('./routes/lessons');
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/semester-interest', require('./routes/semesterInterest'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/level-tests', require('./routes/levelTests'));
app.use('/api/lessons', learningContentRouter); // legacy quiz-compatible route
app.use('/api/quiz', learningContentRouter);
app.use('/api/class-lessons', learningContentRouter);
app.use('/api/flashcards', require('./routes/flashcards'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/users', require('./routes/users'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/error-reports', require('./routes/errorReports'));
app.use('/api/practice-context', require('./routes/practiceContext'));
app.use('/api/learning-hub', require('./routes/learningHub'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/referrals', require('./routes/referrals'));
app.use('/api/tts', require('./routes/tts'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/curriculum/v2', require('./routes/curriculumV2'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Unmatched routes → coded 404 (distinguishes a bad path from a real failure).
app.use(notFoundHandler);
// Global safety-net: anything thrown/next(err)'d lands here with a code + ref.
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
