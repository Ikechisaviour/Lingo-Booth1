const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, guestXP } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
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

    // Generate a secure email verification token (expires in 24 hours)
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
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Send verification email via Gmail
    const verifyUrl = `${FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await mailer.sendMail({
      from: `Lingo Booth <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verify your Lingo Booth email',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;">
          <h2 style="color:#ff6b35;">Welcome to Lingo Booth, ${username}!</h2>
          <p>Click the button below to verify your email and activate your account.</p>
          <a href="${verifyUrl}"
             style="display:inline-block;margin:24px 0;padding:14px 28px;background:#ff6b35;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;">
            Verify Email
          </a>
          <p style="color:#888;font-size:0.85rem;">This link expires in 24 hours. If you didn't create an account, you can ignore this email.</p>
        </div>
      `,
    });

    res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Registration error:', error);
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
      return res.status(400).json({ message: 'Invalid or expired verification link' });
    }

    user.emailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    user.loginCount = 1;
    user.lastLogin = new Date();
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Block login for accounts pending email verification
    if (user.emailVerified === false) {
      return res.status(403).json({ message: 'Please verify your email before logging in. Check your inbox for the verification link.' });
    }

    // Check if user is suspended
    if (user.status === 'suspended') {
      return res.status(403).json({
        message: 'Your account has been suspended',
        reason: user.suspendReason || 'Contact support for more information',
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

    // Update login tracking
    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLogin = new Date();
    user.lastActive = new Date();
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
      },
      guestXPTransferred,
    });
  } catch (error) {
    console.error('Login error:', error);
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

module.exports = router;
