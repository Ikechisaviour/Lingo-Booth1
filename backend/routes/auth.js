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
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendLoginNotificationEmail,
  sendNewDeviceEmail,
} = require('../utils/emailService');
const { verifyToken } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const { cleanFullName, fullNameValidation } = require('../utils/fullName');
const { syncInstitutionAccessForUser } = require('../utils/institutionAccess');
const { sendServerError, sendClientError } = require('../utils/sendError');

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

const DEVICE_HEADER = 'x-lingo-device-id';
// The "welcome back" login email is throttled to at most once per 30 days.
// This throttle is specific to that email — verification, reset, new-device,
// and admin emails are never affected by it.
const LOGIN_EMAIL_THROTTLE_MS = 30 * 24 * 60 * 60 * 1000;

// Human-friendly device label from a User-Agent string.
function summarizeUserAgent(ua) {
  if (!ua) return 'Unknown device';
  const os = /Windows/i.test(ua) ? 'Windows'
    : /iPhone|iPad|iPod/i.test(ua) ? 'iOS'
    : /Android/i.test(ua) ? 'Android'
    : /Mac OS X|Macintosh/i.test(ua) ? 'macOS'
    : /Linux/i.test(ua) ? 'Linux' : '';
  const browser = /Edg\//i.test(ua) ? 'Edge'
    : /OPR\/|Opera/i.test(ua) ? 'Opera'
    : /Chrome\//i.test(ua) ? 'Chrome'
    : /Firefox\//i.test(ua) ? 'Firefox'
    : (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) ? 'Safari' : '';
  const parts = [browser, os].filter(Boolean);
  return parts.length ? parts.join(' on ') : ua.slice(0, 80);
}

// Record the current device and trigger the appropriate login-related email.
// Mutates `user` (knownDevices / lastLoginNotificationAt); the caller persists
// via a later save() (issueTokens or an explicit save). All email sends are
// fire-and-forget so they never block or fail the auth response.
//
// Rules:
//   - New account (isNewUser): seed the sign-up device as known and set the
//     login-email clock so we don't immediately send "welcome back". The
//     welcome email itself is sent by the route.
//   - Login from an unrecognized device: send the new-device security email
//     (never throttled) and record the device. (Exception: if the account has
//     NO known devices yet — e.g. pre-existing users on first login after this
//     feature ships — seed silently to avoid alerting everyone once.)
//   - Login from a known device: send the "welcome back" email only if at least
//     30 days have passed since the last one.
function processLoginNotifications(user, req, { isNewUser = false } = {}) {
  const deviceId = String(req.headers[DEVICE_HEADER] || '').trim().slice(0, 200);
  const ua = String(req.headers['user-agent'] || '').slice(0, 300);
  const ip = user.lastIp || getClientIp(req);
  const geo = getGeoInfo(ip) || {};
  const where = [geo.city, geo.country].filter(Boolean).join(', ') || 'Unknown location';
  const when = new Date().toUTCString();
  const device = summarizeUserAgent(ua);
  const lang = user.nativeLanguage || 'en';
  const now = new Date();

  if (!Array.isArray(user.knownDevices)) user.knownDevices = [];

  if (isNewUser) {
    if (deviceId) {
      user.knownDevices.push({ deviceId, userAgent: ua, ip, country: geo.country, city: geo.city, firstSeen: now, lastSeen: now });
    }
    user.lastLoginNotificationAt = now; // don't "welcome back" right after sign-up
    return;
  }

  const existing = deviceId ? user.knownDevices.find((d) => d.deviceId === deviceId) : null;

  if (deviceId && !existing) {
    const isFirstEverDevice = user.knownDevices.length === 0;
    user.knownDevices.push({ deviceId, userAgent: ua, ip, country: geo.country, city: geo.city, firstSeen: now, lastSeen: now });
    if (!isFirstEverDevice) {
      // Unrecognized device on an established account → security alert.
      sendNewDeviceEmail(user.email, user.username, lang, { when, where, device }).catch((err) => {
        console.error('Failed to send new-device email:', err.message);
      });
      return; // new-device and welcome-back are mutually exclusive per login
    }
    // else: baseline-seed silently, then fall through to welcome-back logic
  } else if (existing) {
    existing.lastSeen = now;
    existing.ip = ip;
    existing.country = geo.country;
    existing.city = geo.city;
  }

  const last = user.lastLoginNotificationAt ? user.lastLoginNotificationAt.getTime() : 0;
  if (now.getTime() - last >= LOGIN_EMAIL_THROTTLE_MS) {
    user.lastLoginNotificationAt = now;
    sendLoginNotificationEmail(user.email, user.username, lang).catch((err) => {
      console.error('Failed to send login notification email:', err.message);
    });
  }
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, guestXP, nativeLanguage, targetLanguage, fullName } = req.body;

    if (!username || !email || !password) {
      return sendClientError(res, 400, 'AUTH_REGISTER_MISSING_FIELDS', 'All fields are required');
    }

    if (!EMAIL_REGEX.test(email)) {
      return sendClientError(res, 400, 'AUTH_REGISTER_INVALID_EMAIL', 'Please enter a valid email address');
    }

    if (password.length < 6) {
      return sendClientError(res, 400, 'AUTH_REGISTER_PASSWORD_TOO_SHORT', 'Password must be at least 6 characters');
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
      return sendClientError(res, 400, 'AUTH_EMAIL_ALREADY_EXISTS', 'User already exists');
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

    // Seed the sign-up device as known, then send a welcome email (fire-and-forget)
    processLoginNotifications(user, req, { isNewUser: true });
    sendWelcomeEmail(user.email, user.username, user.nativeLanguage || 'en').catch(err => {
      console.error('Failed to send welcome email:', err.message);
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
    return sendServerError(req, res, error, 'AUTH_REGISTER_FAILED', { metadata: { email: req.body?.email } });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, guestXP } = req.body;

    if (!email || !password) {
      return sendClientError(res, 400, 'AUTH_LOGIN_MISSING_FIELDS', 'Email and password are required');
    }

    if (!EMAIL_REGEX.test(email)) {
      return sendClientError(res, 400, 'AUTH_LOGIN_INVALID_EMAIL', 'Please enter a valid email address');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendClientError(res, 400, 'AUTH_LOGIN_INVALID_CREDENTIALS', 'Invalid credentials');
    }

    // Check if user is suspended
    if (user.status === 'suspended') {
      return res.status(403).json({
        message: 'Your account has been suspended',
        code: 'AUTH_ACCOUNT_SUSPENDED',
        reason: user.suspendReason || 'Contact support for more information',
      });
    }

    // Google-only users have no password
    if (!user.password) {
      return sendClientError(res, 400, 'AUTH_LOGIN_INVALID_CREDENTIALS', 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendClientError(res, 400, 'AUTH_LOGIN_INVALID_CREDENTIALS', 'Invalid credentials');
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

    // Device check + welcome-back email (persisted by issueTokens' save())
    processLoginNotifications(user, req, { isNewUser: false });

    await syncInstitutionAccessForUser(user);
    const { token, refreshToken } = await issueTokens(user);

    res.json({
      token,
      refreshToken,
      user: buildUserResponse(user),
      guestXPTransferred,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'AUTH_LOGIN_FAILED', { metadata: { email: req.body?.email } });
  }
});

// Verify email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return sendClientError(res, 400, 'AUTH_VERIFY_EMAIL_TOKEN_REQUIRED', 'Verification token is required');
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

    return sendClientError(res, 400, 'AUTH_VERIFY_EMAIL_INVALID_TOKEN', 'Invalid or expired verification link');
  } catch (error) {
    return sendServerError(req, res, error, 'AUTH_VERIFY_EMAIL_FAILED');
  }
});

// Resend verification email
router.post('/resend-verification', verifyToken, async (req, res) => {
  try {
    const user = req.user;

    if (user.emailVerified) {
      return sendClientError(res, 400, 'AUTH_RESEND_VERIFICATION_ALREADY_VERIFIED', 'Email is already verified');
    }

    // Rate limit: 60-second cooldown
    if (user.lastVerificationSent) {
      const elapsed = Date.now() - user.lastVerificationSent.getTime();
      if (elapsed < 60000) {
        const wait = Math.ceil((60000 - elapsed) / 1000);
        return sendClientError(res, 429, 'AUTH_RESEND_VERIFICATION_RATE_LIMITED', `Please wait ${wait} seconds before requesting another email`);
      }
    }

    const verificationToken = setVerificationToken(user);
    await user.save();

    await sendVerificationEmail(user.email, user.username, verificationToken, user.nativeLanguage || 'en');

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    return sendServerError(req, res, error, 'AUTH_RESEND_VERIFICATION_FAILED', { clientMessage: 'Failed to send verification email' });
  }
});

// Google OAuth
router.post('/google', async (req, res) => {
  try {
    const { credential, guestXP, nativeLanguage, targetLanguage } = req.body;

    if (!credential) {
      return sendClientError(res, 400, 'AUTH_GOOGLE_CREDENTIAL_REQUIRED', 'Google credential is required');
    }

    if (!GOOGLE_CLIENT_ID) {
      return sendServerError(req, res, new Error('GOOGLE_CLIENT_ID is not configured'), 'AUTH_GOOGLE_NOT_CONFIGURED', { clientMessage: 'Google OAuth is not configured' });
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
      return sendClientError(res, 401, 'AUTH_GOOGLE_TOKEN_INVALID', 'Invalid Google token');
    }

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return sendClientError(res, 400, 'AUTH_GOOGLE_NO_EMAIL', 'Google account has no email');
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
          code: 'AUTH_ACCOUNT_SUSPENDED',
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
      // Device check + welcome-back email (persisted by the save below)
      processLoginNotifications(user, req, { isNewUser: false });
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

      // Seed the sign-up device as known, then send a welcome email (fire-and-forget)
      processLoginNotifications(user, req, { isNewUser: true });
      sendWelcomeEmail(user.email, user.username, user.nativeLanguage || 'en').catch(err => {
        console.error('Failed to send welcome email:', err.message);
      });

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
    return sendServerError(req, res, error, 'AUTH_GOOGLE_FAILED');
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
      return sendClientError(res, 400, 'AUTH_REFRESH_TOKEN_REQUIRED', 'Refresh token is required');
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET);
    } catch (err) {
      return sendClientError(res, 401, 'AUTH_REFRESH_TOKEN_INVALID', 'Invalid or expired refresh token');
    }

    if (decoded.type !== 'refresh') {
      return sendClientError(res, 401, 'AUTH_REFRESH_TOKEN_WRONG_TYPE', 'Invalid token type');
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      // Either the user is gone, has logged out, or this token was already
      // rotated (potential replay). Reject and force re-login.
      return sendClientError(res, 401, 'AUTH_REFRESH_TOKEN_INVALID', 'Invalid refresh token');
    }

    if (user.status === 'suspended') {
      return sendClientError(res, 403, 'AUTH_ACCOUNT_SUSPENDED', 'Account suspended');
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
    return sendServerError(req, res, error, 'AUTH_REFRESH_FAILED');
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
    return sendServerError(req, res, error, 'AUTH_LOGOUT_FAILED');
  }
});

// Step-up authentication — re-verify password to mint a fresh `authAt`
// without changing the refresh-chain origin (`oat`). Used to gate sensitive
// actions like billing changes, password changes, and certificate downloads.
router.post('/step-up', verifyToken, async (req, res) => {
  try {
    const { password } = req.body || {};
    const user = await User.findById(req.userId);
    if (!user) return sendClientError(res, 404, 'AUTH_STEP_UP_USER_NOT_FOUND', 'User not found');

    if (!user.password) {
      // Google-only accounts can't step up via password yet.
      return res.status(400).json({
        message: 'No password set — sign in with Google to confirm',
        code: 'NO_PASSWORD',
      });
    }
    if (!password) {
      return sendClientError(res, 400, 'AUTH_STEP_UP_PASSWORD_REQUIRED', 'Password is required');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendClientError(res, 400, 'AUTH_STEP_UP_INCORRECT_PASSWORD', 'Incorrect password');
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
    return sendServerError(req, res, error, 'AUTH_STEP_UP_FAILED');
  }
});

// Forgot password — send reset email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !EMAIL_REGEX.test(email)) {
      return sendClientError(res, 400, 'AUTH_FORGOT_PASSWORD_INVALID_EMAIL', 'Please enter a valid email address');
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal whether email exists (but log why nothing was sent)
      console.warn(`[forgot-password] no reset sent — no account for ${email}`);
      return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
    }

    // Google-only users have no password to reset — tell them how to sign in
    // instead of silently pretending a reset email went out.
    if (!user.password) {
      console.warn(`[forgot-password] no reset sent — ${email} is a Google sign-in account (no password)`);
      return res.json({
        message: 'This account was created with Google sign-in, so there is no password to reset. Please use “Continue with Google” to sign in.',
        provider: 'google',
      });
    }

    // Rate limit: 60-second cooldown
    if (user.passwordResetExpires && user.passwordResetToken) {
      const tokenAge = Date.now() - (user.passwordResetExpires.getTime() - 60 * 60 * 1000);
      if (tokenAge < 60000) {
        console.warn(`[forgot-password] no reset sent — ${email} within 60s cooldown`);
        return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
      }
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    console.log(`[forgot-password] sending reset email to ${email}`);
    sendPasswordResetEmail(user.email, user.username, resetToken, user.nativeLanguage || 'en')
      .then(() => console.log(`[forgot-password] reset email accepted by Resend for ${email}`))
      .catch(err => {
        console.error(`[forgot-password] Resend send FAILED for ${email}:`, err.message);
      });

    res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
  } catch (error) {
    return sendServerError(req, res, error, 'AUTH_FORGOT_PASSWORD_FAILED', { metadata: { email: req.body?.email } });
  }
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return sendClientError(res, 400, 'AUTH_RESET_PASSWORD_MISSING_FIELDS', 'Token and new password are required');
    }

    if (password.length < 6) {
      return sendClientError(res, 400, 'AUTH_RESET_PASSWORD_TOO_SHORT', 'Password must be at least 6 characters');
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return sendClientError(res, 400, 'AUTH_RESET_PASSWORD_INVALID_TOKEN', 'Invalid or expired reset link');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    return sendServerError(req, res, error, 'AUTH_RESET_PASSWORD_FAILED');
  }
});

// Track user activity (called periodically from frontend)
router.post('/activity', async (req, res) => {
  try {
    const { userId, timeSpent } = req.body; // timeSpent in minutes

    if (!userId) {
      return sendClientError(res, 400, 'AUTH_ACTIVITY_USER_ID_REQUIRED', 'userId is required');
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendClientError(res, 404, 'AUTH_ACTIVITY_USER_NOT_FOUND', 'User not found');
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
    return sendServerError(req, res, error, 'AUTH_ACTIVITY_FAILED', { metadata: { userId: req.body?.userId } });
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
    return sendServerError(req, res, error, 'AUTH_GUEST_ACTIVITY_FAILED');
  }
});

module.exports = router;
