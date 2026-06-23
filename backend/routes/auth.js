const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const GuestSession = require('../models/GuestSession');
const { ensureResetsApplied } = require('../utils/gamificationReset');
const { getClientIp, getGeoInfo } = require('../utils/geo');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailService');
const { verifyToken } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const { cleanFullName, fullNameValidation } = require('../utils/fullName');
const { syncInstitutionAccessForUser } = require('../utils/institutionAccess');

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// Helper: build user response object
function buildUserResponse(user) {
  const aiEntitlements = getAiEntitlements(user);
  return {
    id: user._id,
    username: user.username,
    fullName: user.fullName || '',
    email: user.email,
    role: user.role,
    subscriptionTier: aiEntitlements.subscriptionTier,
    aiEntitlements,
    status: user.status,
    preferredVoice: user.preferredVoice,
    preferredVoices: user.preferredVoices || {},
    xpDecayEnabled: !!user.xpDecayEnabled,
    nativeLanguage: user.nativeLanguage,
    targetLanguage: user.targetLanguage,
    emailVerified: !!user.emailVerified,
    languageSetupComplete: user.languageSetupComplete !== false,
  };
}

// Absolute lifetime of a refresh-token chain. Once a session is older than this
// (from the original password/OAuth login), the user must re-authenticate fresh
// regardless of recent activity.
const REFRESH_ABSOLUTE_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const REFRESH_ABSOLUTE_LIFETIME_SEC = Math.floor(REFRESH_ABSOLUTE_LIFETIME_MS / 1000);

// Helper: generate access token (30 days).
// `authAt` is the unix-seconds timestamp of the user's last fresh credential
// proof (password or OAuth). It's preserved across refresh rotations so
// step-up middleware can decide whether to demand re-auth for sensitive actions.
function generateToken(userId, authAt) {
  return jwt.sign({ userId, authAt }, JWT_SECRET, { expiresIn: '30d' });
}

// Helper: generate refresh token bound to an original-auth-time (oat).
// The refresh chain is rotated on every use, but `oat` is preserved so the
// 30-day absolute cap is enforced from the original login, not the latest
// refresh.
function generateRefreshToken(userId, authAt, oat) {
  const remainingSec = Math.max(
    60,
    REFRESH_ABSOLUTE_LIFETIME_SEC - (Math.floor(Date.now() / 1000) - oat),
  );
  return jwt.sign(
    { userId, type: 'refresh', authAt, oat },
    JWT_SECRET,
    { expiresIn: remainingSec },
  );
}

// Helper: issue a brand-new token pair for a fresh login (password/OAuth/register).
// Resets the refresh-chain origin to "now" — this is the only path that does so.
async function issueTokens(user) {
  const now = Math.floor(Date.now() / 1000);
  const token = generateToken(user._id, now);
  const refreshToken = generateRefreshToken(user._id, now, now);
  user.refreshToken = refreshToken;
  await user.save();
  return { token, refreshToken };
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
    const { username, email, password, guestXP, nativeLanguage, targetLanguage, fullName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const fullNameCheck = fullNameValidation(fullName);
    if (!fullNameCheck.valid) {
      return res.status(400).json({
        code: fullNameCheck.code,
        message: 'Please enter a valid full name',
      });
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
      fullName: fullNameCheck.fullName || null,
      password,
      totalXP: transferXP,
      loginCount: 1,
      lastLogin: new Date(),
      lastActive: new Date(),
      emailVerified: false,
      nativeLanguage: nativeLanguage || null,
      targetLanguage: targetLanguage || null,
      languageSetupComplete: !!(nativeLanguage && targetLanguage),
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

    await syncInstitutionAccessForUser(user);
    const { token, refreshToken } = await issueTokens(user);

    res.status(201).json({
      token,
      refreshToken,
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

    await syncInstitutionAccessForUser(user);
    const { token, refreshToken } = await issueTokens(user);

    res.json({
      token,
      refreshToken,
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

      const googleFullName = cleanFullName(name);
      if (!user.fullName && googleFullName) {
        user.fullName = googleFullName;
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
        fullName: cleanFullName(name) || null,
        password: null,
        emailVerified: true,
        authProviders: [{ provider: 'google', providerId: googleId }],
        totalXP: transferXP,
        loginCount: 1,
        lastLogin: new Date(),
        lastActive: new Date(),
        nativeLanguage: nativeLanguage || null,
        targetLanguage: targetLanguage || null,
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

    await syncInstitutionAccessForUser(user);
    const { token, refreshToken } = await issueTokens(user);

    res.json({
      token,
      refreshToken,
      user: buildUserResponse(user),
      guestXPTransferred,
      isNewUser,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Refresh access token using a valid refresh token.
// Rotates the refresh token on every successful refresh — the previous token is
// invalidated by being replaced on the user record. The `oat` (original-auth-time)
// claim is preserved across rotations and enforces a hard 30-day cap from the
// original login, regardless of activity.
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    if (decoded.type !== 'refresh') {
      return res.status(401).json({ message: 'Invalid token type' });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      // Either the user is gone, has logged out, or this token was already
      // rotated (potential replay). Reject and force re-login.
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Account suspended' });
    }

    const nowSec = Math.floor(Date.now() / 1000);
    // Legacy tokens issued before rotation existed have no oat/authAt — treat
    // their iat as both, so existing sessions keep working but still hit the
    // 30-day absolute cap.
    const oat = typeof decoded.oat === 'number' ? decoded.oat : decoded.iat;
    const authAt = typeof decoded.authAt === 'number' ? decoded.authAt : decoded.iat;

    if (nowSec - oat >= REFRESH_ABSOLUTE_LIFETIME_SEC) {
      // Hit the absolute cap — invalidate the chain and require a fresh login.
      user.refreshToken = null;
      await user.save();
      return res.status(401).json({
        message: 'Session expired — please sign in again',
        code: 'SESSION_EXPIRED',
      });
    }

    const newToken = generateToken(user._id, authAt);
    const newRefreshToken = generateRefreshToken(user._id, authAt, oat);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ token: newToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout — invalidate the current refresh chain server-side.
// Idempotent: clients can call this without a valid access token, since by the
// time you log out your token may already be expired.
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body || {};
    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET, { ignoreExpiration: true });
        if (decoded?.userId) {
          await User.updateOne(
            { _id: decoded.userId, refreshToken },
            { $set: { refreshToken: null } },
          );
        }
      } catch (_) {
        // Malformed token — nothing to invalidate, but still respond OK.
      }
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Step-up authentication — re-verify password to mint a fresh `authAt`
// without changing the refresh-chain origin (`oat`). Used to gate sensitive
// actions like billing changes, password changes, and certificate downloads.
router.post('/step-up', verifyToken, async (req, res) => {
  try {
    const { password } = req.body || {};
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.password) {
      // Google-only accounts can't step up via password yet.
      return res.status(400).json({
        message: 'No password set — sign in with Google to confirm',
        code: 'NO_PASSWORD',
      });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Mint a new access+refresh pair with authAt = now. Preserve the existing
    // refresh chain's `oat` so step-up doesn't extend the absolute cap.
    const nowSec = Math.floor(Date.now() / 1000);
    let oat = nowSec;
    if (user.refreshToken) {
      try {
        const decoded = jwt.verify(user.refreshToken, JWT_SECRET, { ignoreExpiration: true });
        if (typeof decoded.oat === 'number') oat = decoded.oat;
      } catch (_) {
        // Stored token is corrupt — fall back to treating this as a fresh chain.
      }
    }
    const token = generateToken(user._id, nowSec);
    const refreshToken = generateRefreshToken(user._id, nowSec, oat);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ token, refreshToken });
  } catch (error) {
    console.error('Step-up error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot password — send reset email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal whether email exists
      return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
    }

    // Google-only users have no password to reset
    if (!user.password) {
      return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
    }

    // Rate limit: 60-second cooldown
    if (user.passwordResetExpires && user.passwordResetToken) {
      const tokenAge = Date.now() - (user.passwordResetExpires.getTime() - 60 * 60 * 1000);
      if (tokenAge < 60000) {
        return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
      }
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    sendPasswordResetEmail(user.email, user.username, resetToken, user.nativeLanguage || 'en').catch(err => {
      console.error('Failed to send password reset email:', err.message);
    });

    res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset link' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
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
    ensureResetsApplied(user);
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
