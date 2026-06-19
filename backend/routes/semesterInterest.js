const express = require('express');
const SemesterInterest = require('../models/SemesterInterest');
const { optionalAuth } = require('../middleware/auth');
const { getClientIp } = require('../utils/geo');

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEVELS = ['unsure', 'beginner', 'elementary', 'intermediate', 'advanced'];

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function cleanLine(value, maxLength) {
  return cleanText(value, maxLength).replace(/[\r\n]+/g, ' ');
}

// Public: register interest in a future semester cohort. Stores a lead so the
// platform admin can remind the learner when the next registration opens.
router.post('/', optionalAuth, async (req, res) => {
  try {
    const body = req.body || {};
    const signedInUser = req.user;

    // Honeypot: hidden field bots tend to fill. Pretend success, store nothing.
    if (cleanLine(body.company, 120)) {
      return res.json({ message: 'Interest received' });
    }

    const fullName = signedInUser?.fullName || signedInUser?.username || cleanLine(body.fullName, 120);
    const email = (signedInUser?.email || cleanLine(body.email, 254)).toLowerCase();
    const targetLanguage = cleanLine(body.targetLanguage || signedInUser?.targetLanguage, 20).toLowerCase();
    const nativeLanguage = cleanLine(body.nativeLanguage || signedInUser?.nativeLanguage, 20).toLowerCase();
    const currentLevel = LEVELS.includes(body.currentLevel) ? body.currentLevel : 'unsure';
    const notes = cleanText(body.notes, 2000);
    const page = cleanLine(body.page, 500);
    const source = ['web', 'mobile'].includes(body.source) ? body.source : 'web';

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ message: 'Your name is required' });
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required' });
    }

    await SemesterInterest.create({
      fullName,
      email,
      targetLanguage,
      nativeLanguage,
      currentLevel,
      notes,
      page,
      source,
      userId: signedInUser?._id,
      userSnapshot: signedInUser ? {
        username: signedInUser.username,
        email: signedInUser.email,
      } : undefined,
      deviceId: cleanLine(req.get('x-lingo-device-id'), 160),
      request: {
        ip: getClientIp(req),
        origin: cleanLine(req.get('origin'), 500),
      },
    });

    res.json({ message: 'Interest received' });
  } catch (error) {
    console.error('Semester interest form error:', error);
    res.status(500).json({ message: 'Could not save your interest right now' });
  }
});

module.exports = router;
