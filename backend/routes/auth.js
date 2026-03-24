const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const GuestSession = require('../models/GuestSession');
const { getClientIp, getGeoInfo } = require('../utils/geo');
const { sendVerificationEmail } = require('../utils/emailService');
const { verifyToken } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// Helper: build user response object
function buildUserResponse(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
    preferredVoice: user.preferredVoice,
    xpDecayEnabled: !!user.xpDecayEnabled,
    nativeLanguage: user.nativeLanguage,
    targetLanguage: user.targetLanguage,
    emailVerified: !!user.emailVerified,
    languageSetupComplete: user.languageSetupComplete !== false,
  };
}

// Helper: generate JWT
function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// Helper: generate verification token and set on user
function setVerificationToken(user) {
  const token = crypto.randomBytes(32).toString('hex');
  user.verificationToken = token;
  user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  user.lastVerificationSent = new Date();
  return token;
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, guestXP, nativeLanguage, targetLanguage } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // New accounts default to decay off, so guest XP can be applied
    const transferXP = (typeof guestXP === 'number' && guestXP > 0) ? Math.floor(guestXP) : 0;

    const regIp = getClientIp(req);
    const regGeo = getGeoInfo(regIp);

    user = new User({
      username,
      email,
      password,
      totalXP: transferXP,
      loginCount: 1,
      lastLogin: new Date(),
      lastActive: new Date(),
      emailVerified: false,
      nativeLanguage: nativeLanguage || 'en',
      targetLanguage: targetLanguage || 'ko',
      languageSetupComplete: true,
      lastIp: regIp,
      lastCountry: regGeo.country,
      lastCity: regGeo.city,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = setVerificationToken(user);

    await user.save();

    // Send verification email (fire-and-forget)
    sendVerificationEmail(user.email, user.username, verificationToken, user.nativeLanguage || 'en').catch(err => {
      console.error('Failed to send verification email:', err.message);
    });

    // Mark today's guest session as converted (fire-and-forget)
    try {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      GuestSession.findOneAndUpdate(
        { ip: regIp, firstSeen: { $gte: today } },
        { $set: { convertedToUser: true } }
      ).catch(() => {});
    } catch (_) {}

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: buildUserResponse(user),
      guestXPTransferred: transferXP,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, guestXP } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is suspended
    if (user.status === 'suspended') {
      return res.status(403).json({
        message: 'Your account has been suspended',
        reason: user.suspendReason || 'Contact support for more information',
      });
    }

    // Google-only users have no password
    if (!user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Transfer guest XP only if decay is off (Relaxed Mode)
    let guestXPTransferred = 0;
    if (typeof guestXP === 'number' && guestXP > 0 && !user.xpDecayEnabled) {
      guestXPTransferred = Math.floor(guestXP);
      user.totalXP = (user.totalXP || 0) + guestXPTransferred;
    }

    // Update login tracking + location
    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLogin = new Date();
    user.lastActive = new Date();
    const loginIp = getClientIp(req);
    const loginGeo = getGeoInfo(loginIp);
    user.lastIp = loginIp;
    user.lastCountry = loginGeo.country;
    user.lastCity = loginGeo.city;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      token,
      user: buildUserResponse(user),
      guestXPTransferred,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    // Try to find user by active token
    let user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (user) {
      user.emailVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpires = null;
      await user.save();
      return res.json({ message: 'Email verified successfully' });
    }

    return res.status(400).json({ message: 'Invalid or expired verification link' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Resend verification email
router.post('/resend-verification', verifyToken, async (req, res) => {
  try {
    const user = req.user;

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Rate limit: 60-second cooldown
    if (user.lastVerificationSent) {
      const elapsed = Date.now() - user.lastVerificationSent.getTime();
      if (elapsed < 60000) {
        const wait = Math.ceil((60000 - elapsed) / 1000);
        return res.status(429).json({ message: `Please wait ${wait} seconds before requesting another email` });
      }
    }

    const verificationToken = setVerificationToken(user);
    await user.save();

    await sendVerificationEmail(user.email, user.username, verificationToken, user.nativeLanguage || 'en');

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Failed to send verification email' });
  }
});

// Google OAuth
router.post('/google', async (req, res) => {
  try {
    const { credential, guestXP, nativeLanguage, targetLanguage } = req.body;

    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    if (!GOOGLE_CLIENT_ID) {
      return res.status(500).json({ message: 'Google OAuth is not configured' });
    }

    // Verify the Google ID token
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid Google token' });
    }

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({ message: 'Google account has no email' });
    }

    const loginIp = getClientIp(req);
    const loginGeo = getGeoInfo(loginIp);

    let user = await User.findOne({ email });
    let guestXPTransferred = 0;
    let isNewUser = false;

    if (user) {
      // Existing user — link Google provider if not already linked
      if (user.status === 'suspended') {
        return res.status(403).json({
          message: 'Your account has been suspended',
          reason: user.suspendReason || 'Contact support for more information',
        });
      }

      const hasGoogle = user.authProviders?.some(p => p.provider === 'google');
      if (!hasGoogle) {
        user.authProviders.push({ provider: 'google', providerId: googleId });
      }

      user.emailVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpires = null;

      // Legacy users (created before languageSetupComplete field existed) — treat as complete
      if (user.languageSetupComplete === undefined || user.languageSetupComplete === null) {
        user.languageSetupComplete = true;
      }

      // Transfer guest XP
      if (typeof guestXP === 'number' && guestXP > 0 && !user.xpDecayEnabled) {
        guestXPTransferred = Math.floor(guestXP);
        user.totalXP = (user.totalXP || 0) + guestXPTransferred;
      }

      user.loginCount = (user.loginCount || 0) + 1;
      user.lastLogin = new Date();
      user.lastActive = new Date();
      user.lastIp = loginIp;
      user.lastCountry = loginGeo.country;
      user.lastCity = loginGeo.city;
      await user.save();
    } else {
      // New user — create account
      isNewUser = true;
      const transferXP = (typeof guestXP === 'number' && guestXP > 0) ? Math.floor(guestXP) : 0;
      guestXPTransferred = transferXP;

      // Generate username from Google name
      let baseUsername = (name || email.split('@')[0])
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20) || 'user';

      let username = baseUsername;
      let attempts = 0;
      while (await User.findOne({ username }) && attempts < 10) {
        username = baseUsername + Math.floor(1000 + Math.random() * 9000);
        attempts++;
      }

      user = new User({
        username,
        email,
        password: null,
        emailVerified: true,
        authProviders: [{ provider: 'google', providerId: googleId }],
        totalXP: transferXP,
        loginCount: 1,
        lastLogin: new Date(),
        lastActive: new Date(),
        nativeLanguage: nativeLanguage || 'en',
        targetLanguage: targetLanguage || 'ko',
        languageSetupComplete: false,
        lastIp: loginIp,
        lastCountry: loginGeo.country,
        lastCity: loginGeo.city,
      });

      await user.save();

      // Mark guest session as converted
      try {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        GuestSession.findOneAndUpdate(
          { ip: loginIp, firstSeen: { $gte: today } },
          { $set: { convertedToUser: true } }
        ).catch(() => {});
      } catch (_) {}
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: buildUserResponse(user),
      guestXPTransferred,
      isNewUser,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Track user activity (called periodically from frontend)
router.post('/activity', async (req, res) => {
  try {
    const { userId, timeSpent } = req.body; // timeSpent in minutes

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.lastActive = new Date();
    if (timeSpent && typeof timeSpent === 'number' && timeSpent > 0) {
      user.totalTimeSpent = (user.totalTimeSpent || 0) + timeSpent;
      // Track daily time spent for Challenge Mode quests
      if (user.xpDecayEnabled) {
        user.dailyTimeSpent = (user.dailyTimeSpent || 0) + timeSpent;
      }
    }
    await user.save();

    res.json({ message: 'Activity tracked' });
  } catch (error) {
    console.error('Activity tracking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Track guest session engagement (called periodically + on page close)
router.post('/guest-activity', async (req, res) => {
  try {
    const {
      timeSpent,       // total seconds since session start
      cardsStudied,
      cardsCorrect,
      cardsIncorrect,
      lessonsViewed,
      audioPlays,
      lastActivity,    // 'home' | 'flashcards' | 'lessons'
    } = req.body;

    const ip = getClientIp(req);
    const today = new Date(); today.setHours(0, 0, 0, 0);

    const inc = {};
    // timeSpent is cumulative from client — set it, don't increment, to avoid double-counting
    const setFields = { lastSeen: new Date() };

    if (typeof timeSpent === 'number' && timeSpent > 0) {
      setFields.timeSpent = Math.min(Math.floor(timeSpent), 86400); // cap at 24h
    }
    if (typeof cardsStudied === 'number' && cardsStudied > 0) inc.cardsStudied = cardsStudied;
    if (typeof cardsCorrect === 'number' && cardsCorrect > 0) inc.cardsCorrect = cardsCorrect;
    if (typeof cardsIncorrect === 'number' && cardsIncorrect > 0) inc.cardsIncorrect = cardsIncorrect;
    if (typeof lessonsViewed === 'number' && lessonsViewed > 0) inc.lessonsViewed = lessonsViewed;
    if (typeof audioPlays === 'number' && audioPlays > 0) inc.audioPlays = audioPlays;
    if (lastActivity && typeof lastActivity === 'string') {
      setFields.lastActivity = lastActivity.substring(0, 50);
    }

    const update = { $set: setFields };
    if (Object.keys(inc).length > 0) update.$inc = inc;

    // Only update existing session — don't create one here (creation happens via /flashcards/guest)
    await GuestSession.findOneAndUpdate(
      { ip, firstSeen: { $gte: today } },
      update,
      { upsert: false }
    );

    res.json({ ok: true });
  } catch (error) {
    console.error('Guest activity tracking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
