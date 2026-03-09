const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const GuestSession = require('../models/GuestSession');
const { getClientIp, getGeoInfo } = require('../utils/geo');
const { sendVerificationEmail } = require('../utils/email');

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const verificationToken = crypto.randomBytes(32).toString('hex');

    user = new User({
      username,
      email,
      password,
      totalXP: transferXP,
      loginCount: 0,
      lastActive: new Date(),
      emailVerified: false,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      nativeLanguage: nativeLanguage || 'en',
      targetLanguage: targetLanguage || 'ko',
      lastIp: regIp,
      lastCountry: regGeo.country,
      lastCity: regGeo.city,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Mark today's guest session as converted (fire-and-forget)
    try {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      GuestSession.findOneAndUpdate(
        { ip: regIp, firstSeen: { $gte: today } },
        { $set: { convertedToUser: true } }
      ).catch(() => {});
    } catch (_) {}

    // Send verification email (fire-and-forget to avoid blocking response if SMTP is slow)
    sendVerificationEmail(email, verificationToken).catch((err) => {
      console.error('Failed to send verification email:', err);
    });

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      needsVerification: true,
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

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({
        message: 'Please verify your email before logging in.',
        needsVerification: true,
        email: user.email,
      });
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

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        preferredVoice: user.preferredVoice,
        xpDecayEnabled: !!user.xpDecayEnabled,
        nativeLanguage: user.nativeLanguage,
        targetLanguage: user.targetLanguage,
      },
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

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification link. Please register again.' });
    }

    user.emailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email, emailVerified: false });
    if (!user) {
      // Don't reveal whether the email exists — always return success
      return res.json({ message: 'If that email is registered and unverified, a new verification link has been sent.' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    await sendVerificationEmail(email, verificationToken);

    res.json({ message: 'If that email is registered and unverified, a new verification link has been sent.' });
  } catch (error) {
    console.error('Resend verification error:', error);
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
