const express = require('express');
const Review = require('../models/Review');
const { optionalAuth } = require('../middleware/auth');
const { getClientIp } = require('../utils/geo');

const router = express.Router();

// Max approved reviews ever returned to the public landing page.
const PUBLIC_LIMIT = 24;

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function cleanLine(value, maxLength) {
  return cleanText(value, maxLength).replace(/[\r\n]+/g, ' ');
}

// Public: approved reviews for the landing page. Returns only display-safe
// fields, newest approved first. Pending/rejected reviews are never exposed.
router.get('/approved', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' })
      .sort({ reviewedAt: -1, createdAt: -1 })
      .limit(PUBLIC_LIMIT)
      .select('name comment targetLanguage createdAt')
      .lean();

    res.json({ reviews });
  } catch (error) {
    console.error('Public reviews fetch error:', error);
    res.status(500).json({ message: 'Could not load reviews right now' });
  }
});

// Public: submit a review. Stored as `pending` until an admin approves it.
router.post('/', optionalAuth, async (req, res) => {
  try {
    const body = req.body || {};
    const signedInUser = req.user;

    // Honeypot: hidden field bots tend to fill. Pretend success, store nothing.
    if (cleanLine(body.company, 120)) {
      return res.json({ message: 'Review received' });
    }

    const name = signedInUser?.fullName || signedInUser?.username || cleanLine(body.name, 80);
    const comment = cleanText(body.comment, 600);
    const targetLanguage = cleanLine(body.targetLanguage || signedInUser?.targetLanguage, 40).toLowerCase();
    const email = (signedInUser?.email || cleanLine(body.email, 254)).toLowerCase();
    const page = cleanLine(body.page, 500);
    const source = ['web', 'mobile'].includes(body.source) ? body.source : 'web';

    if (!name || name.length < 2) {
      return res.status(400).json({ message: 'Your name is required' });
    }

    if (!comment || comment.length < 10) {
      return res.status(400).json({ message: 'Please share a few more words about your experience' });
    }

    await Review.create({
      name,
      comment,
      targetLanguage,
      email,
      page,
      source,
      status: 'pending',
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

    res.json({ message: 'Review received' });
  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ message: 'Could not save your review right now' });
  }
});

module.exports = router;
