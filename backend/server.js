const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./models/User');

const app = express();

// Middleware
const allowedOrigins = process.env.FRONTEND_ORIGINS
  ? process.env.FRONTEND_ORIGINS.split(',').map(o => o.trim())
  : [process.env.FRONTEND_ORIGIN || 'http://localhost:3000'];

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
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

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
    res.status(options.statusCode).json({ message: 'Too many requests, please try again later' });
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  handler: async (req, res, next, options) => {
    await trackRateLimitHit(req);
    res.status(options.statusCode).json({ message: 'Too many authentication attempts, please try again later' });
  },
});

app.use('/api/', generalLimiter);
app.use('/api/auth', authLimiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/korean-learning', { family: 4 })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/flashcards', require('./routes/flashcards'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/tts', require('./routes/tts'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Temporary seed endpoint — remove after seeding
app.get('/api/seed-defaults', async (req, res) => {
  try {
    const Flashcard = require('./models/Flashcard');
    const flashcardData = require('./flashcardData');
    const deleted = await Flashcard.deleteMany({ isDefault: true });
    const CORE_FIELDS = ['korean', 'english', 'romanization', 'category'];
    const docs = flashcardData.map((card, i) => ({
      korean: card.korean,
      english: card.english,
      romanization: card.romanization || '',
      category: Array.isArray(card.category) ? card.category : [card.category || 'uncategorized'],
      isDefault: true,
      defaultIndex: i,
      targetLang: 'ko',
      nativeLang: 'en',
      masteryLevel: 3,
      correctCount: 0,
      incorrectCount: 0,
      ...Object.fromEntries(
        Object.entries(card).filter(([k]) => !CORE_FIELDS.includes(k))
      ),
    }));
    for (let i = 0; i < docs.length; i += 500) {
      await Flashcard.insertMany(docs.slice(i, i + 500));
    }
    res.json({ message: `Seeded ${docs.length} default cards (deleted ${deleted.deletedCount} old)` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Temporary make-admin endpoint — remove after use
app.get('/api/make-admin', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: 'ikechisaviour@gmail.com' },
      { role: 'admin' },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: `${user.username} is now admin` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
