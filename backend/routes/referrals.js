const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const ReferralLink = require('../models/ReferralLink');
const ReferralVisit = require('../models/ReferralVisit');
const { verifyToken, optionalAuth, canManageReferrals } = require('../middleware/auth');
const { getClientIp, getGeoInfo } = require('../utils/geo');
const { sendServerError, sendClientError } = require('../utils/sendError');

// Turn arbitrary text into a url-safe slug: lowercase, alnum + single hyphens.
function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

// YYYY-MM-DD in UTC for the given date.
function utcDay(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

// Shape a link document for the client, including a computed conversion rate.
function serializeLink(link) {
  const totalVisits = link.totalVisits || 0;
  const uniqueVisits = link.uniqueVisits || 0;
  const signups = link.signups || 0;
  const payingCustomers = link.payingCustomers || 0;
  return {
    id: link._id,
    code: link.code,
    name: link.name,
    destination: link.destination || '/',
    active: link.active !== false,
    totalVisits,
    uniqueVisits,
    signups,
    payingCustomers,
    // % of unique visitors who created an account / who started paying.
    signupRate: uniqueVisits ? Math.round((signups / uniqueVisits) * 1000) / 10 : 0,
    payingRate: uniqueVisits ? Math.round((payingCustomers / uniqueVisits) * 1000) / 10 : 0,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC: record a visit. Called (fire-and-forget) by the site when a visitor
// lands with ?ref=<code>. optionalAuth so a logged-in visitor is fine too, but
// no auth is required. Always responds 200 so the client never surfaces an error
// for an unknown/inactive code.
// ─────────────────────────────────────────────────────────────────────────────
router.post('/hit', optionalAuth, async (req, res) => {
  try {
    const code = slugify(req.body?.code);
    if (!code) return res.json({ ok: false });

    const link = await ReferralLink.findOne({ code, active: true });
    if (!link) return res.json({ ok: false });

    // visitorId: prefer the stable device id header the web client sends,
    // fall back to the request IP so a visit is still recorded.
    const ip = getClientIp(req);
    const visitorId = (req.headers['x-lingo-device-id'] || '').toString().slice(0, 128) || `ip:${ip}`;

    // A visit is "unique" the first time this visitor hits this code.
    const seenBefore = await ReferralVisit.exists({ code, visitorId });
    const isUnique = !seenBefore;

    await ReferralVisit.create({
      code,
      link: link._id,
      visitorId,
      ip,
      country: getGeoInfo(ip).country,
      userAgent: (req.headers['user-agent'] || '').toString().slice(0, 512),
      isUnique,
      day: utcDay(),
    });

    await ReferralLink.updateOne(
      { _id: link._id },
      { $inc: { totalVisits: 1, uniqueVisits: isUnique ? 1 : 0 } },
    );

    return res.json({ ok: true });
  } catch (error) {
    // Never block the visitor's page load on a tracking failure.
    return res.json({ ok: false });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC (authenticated user): attribute the caller's signup to a referral code.
// Called by the client right after registration when a ?ref= code was stored.
// Idempotent — a user can only ever be attributed to one code.
// ─────────────────────────────────────────────────────────────────────────────
router.post('/attribute-signup', verifyToken, async (req, res) => {
  try {
    const code = slugify(req.body?.code);
    if (!code) return res.json({ ok: false });

    // Already attributed → no-op (don't let a user pad a link's signup count).
    if (req.user.referralCode) return res.json({ ok: true, alreadyAttributed: true });

    const link = await ReferralLink.findOne({ code });
    if (!link) return res.json({ ok: false });

    req.user.referralCode = code;
    req.user.referralAttributedAt = new Date();
    await req.user.save();

    await ReferralLink.updateOne({ _id: link._id }, { $inc: { signups: 1 } });
    return res.json({ ok: true });
  } catch (error) {
    return sendServerError(req, res, error, 'REFERRAL_ATTRIBUTE_FAILED');
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Everything below is admin / marketing only.
// ─────────────────────────────────────────────────────────────────────────────
router.use(verifyToken);
router.use(canManageReferrals);

// List all links, newest first.
router.get('/', async (req, res) => {
  try {
    const links = await ReferralLink.find().sort({ createdAt: -1 }).lean();
    return res.json({ links: links.map(serializeLink) });
  } catch (error) {
    return sendServerError(req, res, error, 'REFERRAL_LIST_FAILED');
  }
});

// Create a link. Auto-slugs a code from the name when none is supplied.
router.post('/', async (req, res) => {
  try {
    const name = (req.body?.name || '').toString().trim();
    if (!name) return sendClientError(res, 400, 'REFERRAL_NAME_REQUIRED', 'A name is required');

    let code = slugify(req.body?.code || name);
    if (!code) return sendClientError(res, 400, 'REFERRAL_CODE_INVALID', 'Could not derive a valid code');

    // Normalise the destination to a leading-slash path (reject absolute URLs
    // to other hosts — the link always lands on our own site).
    let destination = (req.body?.destination || '/').toString().trim();
    if (!destination.startsWith('/')) destination = `/${destination}`;

    const exists = await ReferralLink.findOne({ code });
    if (exists) return sendClientError(res, 409, 'REFERRAL_CODE_TAKEN', 'That code is already in use');

    const link = await ReferralLink.create({
      code,
      name: name.slice(0, 120),
      destination: destination.slice(0, 512),
      createdBy: req.user._id,
    });
    return res.status(201).json({ link: serializeLink(link) });
  } catch (error) {
    return sendServerError(req, res, error, 'REFERRAL_CREATE_FAILED');
  }
});

// Update name / destination / active state. Code is immutable once created so
// links already shared in the wild keep working.
router.patch('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendClientError(res, 400, 'REFERRAL_ID_INVALID', 'Invalid link id');
    }
    const update = {};
    if (typeof req.body?.name === 'string' && req.body.name.trim()) {
      update.name = req.body.name.trim().slice(0, 120);
    }
    if (typeof req.body?.destination === 'string') {
      let destination = req.body.destination.trim() || '/';
      if (!destination.startsWith('/')) destination = `/${destination}`;
      update.destination = destination.slice(0, 512);
    }
    if (typeof req.body?.active === 'boolean') {
      update.active = req.body.active;
    }
    const link = await ReferralLink.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!link) return sendClientError(res, 404, 'REFERRAL_NOT_FOUND', 'Link not found');
    return res.json({ link: serializeLink(link) });
  } catch (error) {
    return sendServerError(req, res, error, 'REFERRAL_UPDATE_FAILED');
  }
});

// Delete a link and its raw visit rows.
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendClientError(res, 400, 'REFERRAL_ID_INVALID', 'Invalid link id');
    }
    const link = await ReferralLink.findByIdAndDelete(req.params.id);
    if (!link) return sendClientError(res, 404, 'REFERRAL_NOT_FOUND', 'Link not found');
    await ReferralVisit.deleteMany({ link: link._id });
    return res.json({ ok: true });
  } catch (error) {
    return sendServerError(req, res, error, 'REFERRAL_DELETE_FAILED');
  }
});

// Per-link detail: counters + a daily visit time series for the last N days.
router.get('/:id/stats', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendClientError(res, 400, 'REFERRAL_ID_INVALID', 'Invalid link id');
    }
    const link = await ReferralLink.findById(req.params.id);
    if (!link) return sendClientError(res, 404, 'REFERRAL_NOT_FOUND', 'Link not found');

    const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 7), 90);
    const since = new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000);
    since.setUTCHours(0, 0, 0, 0);

    const rows = await ReferralVisit.aggregate([
      { $match: { link: link._id, createdAt: { $gte: since } } },
      {
        $group: {
          _id: '$day',
          visits: { $sum: 1 },
          unique: { $sum: { $cond: ['$isUnique', 1, 0] } },
        },
      },
    ]);
    const byDay = new Map(rows.map((r) => [r._id, r]));

    // Fill every day in the window so the chart has no gaps.
    const series = [];
    for (let i = 0; i < days; i += 1) {
      const d = new Date(since.getTime() + i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      const row = byDay.get(key);
      series.push({ day: key, visits: row?.visits || 0, unique: row?.unique || 0 });
    }

    return res.json({ link: serializeLink(link), days, series });
  } catch (error) {
    return sendServerError(req, res, error, 'REFERRAL_STATS_FAILED');
  }
});

module.exports = router;
