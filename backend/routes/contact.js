const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const { optionalAuth } = require('../middleware/auth');
const { getClientIp } = require('../utils/geo');
const { getAiEntitlements } = require('../utils/subscription');

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function cleanLine(value, maxLength) {
  return cleanText(value, maxLength).replace(/[\r\n]+/g, ' ');
}

router.post('/', optionalAuth, async (req, res) => {
  try {
    const body = req.body || {};
    const signedInUser = req.user;
    const entitlements = signedInUser ? getAiEntitlements(signedInUser) : null;
    const name = signedInUser?.username || cleanLine(body.name, 120);
    const email = (signedInUser?.email || cleanLine(body.email, 254)).toLowerCase();
    const subject = cleanLine(body.subject || 'Contact message', 160);
    const message = cleanText(body.message, 5000);
    const page = cleanLine(body.page, 500);
    const userAgent = cleanLine(body.userAgent || req.get('user-agent'), 500);
    const company = cleanLine(body.company, 120);
    const source = ['web', 'mobile'].includes(body.source) ? body.source : 'web';

    // Honeypot: return a normal success response without sending anything.
    if (company) {
      return res.json({ message: 'Message received' });
    }

    if (!name || name.length < 2) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required' });
    }

    if (!message || message.length < 10) {
      return res.status(400).json({ message: 'Message must be at least 10 characters' });
    }

    await ContactMessage.create({
      name,
      email,
      subject,
      message,
      page,
      source,
      userId: signedInUser?._id,
      userSnapshot: signedInUser ? {
        username: signedInUser.username,
        email: signedInUser.email,
        role: signedInUser.role,
        subscriptionTier: entitlements?.subscriptionTier || signedInUser.subscriptionTier,
      } : undefined,
      deviceId: cleanLine(req.get('x-lingo-device-id'), 160),
      session: {
        isGuest: !signedInUser,
        nativeLanguage: cleanLine(body.nativeLanguage || signedInUser?.nativeLanguage, 20),
        targetLanguage: cleanLine(body.targetLanguage || signedInUser?.targetLanguage, 20),
        subscriptionTier: entitlements?.subscriptionTier || (signedInUser ? signedInUser.subscriptionTier : 'free'),
      },
      client: {
        userAgent,
        language: cleanLine(body.clientLanguage || req.get('accept-language'), 80),
      },
      request: {
        ip: getClientIp(req),
        origin: cleanLine(req.get('origin'), 500),
      },
    });

    res.json({ message: 'Message received' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Could not save your message right now' });
  }
});

module.exports = router;
