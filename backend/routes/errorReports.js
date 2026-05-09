const express = require('express');
const mongoose = require('mongoose');
const ErrorReport = require('../models/ErrorReport');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.use(optionalAuth);

const VALID_SOURCES = new Set(['web', 'mobile', 'admin-web', 'backend', 'unknown']);
const VALID_KINDS = new Set(['api', 'runtime', 'unhandled-rejection', 'error-boundary', 'server', 'manual']);
const VALID_SEVERITIES = new Set(['info', 'warning', 'error', 'critical']);

function trimString(value, max = 1000) {
  if (value === undefined || value === null) return undefined;
  return String(value).slice(0, max);
}

function cleanMetadata(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const safe = {};
  Object.entries(value).slice(0, 30).forEach(([key, entry]) => {
    const cleanKey = trimString(key, 80);
    if (!cleanKey) return;

    if (entry === undefined || entry === null) {
      safe[cleanKey] = entry;
    } else if (['string', 'number', 'boolean'].includes(typeof entry)) {
      safe[cleanKey] = typeof entry === 'string' ? trimString(entry, 1000) : entry;
    } else {
      try {
        safe[cleanKey] = trimString(JSON.stringify(entry), 2000);
      } catch (_) {
        safe[cleanKey] = '[unserializable]';
      }
    }
  });

  return safe;
}

router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const source = VALID_SOURCES.has(body.source) ? body.source : 'unknown';
    const kind = VALID_KINDS.has(body.kind) ? body.kind : 'manual';
    const severity = VALID_SEVERITIES.has(body.severity) ? body.severity : 'error';
    const message = trimString(body.message || body.api?.responseMessage || 'Client failure reported', 2000);

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ message: 'Error message is required' });
    }

    const reportedUserId = trimString(body.userId, 120);
    const userSnapshot = req.user ? {
      username: trimString(req.user.username, 120),
      email: trimString(req.user.email, 250),
      role: trimString(req.user.role, 50),
      subscriptionTier: trimString(req.user.subscriptionTier, 50),
    } : {
      username: trimString(body.username, 120),
      role: trimString(body.role, 50),
      subscriptionTier: trimString(body.subscriptionTier, 50),
    };

    const report = await ErrorReport.create({
      source,
      kind,
      severity,
      message,
      stack: trimString(body.stack, 12000),
      componentStack: trimString(body.componentStack, 12000),
      route: trimString(body.route, 1000),
      screen: trimString(body.screen, 500),
      api: {
        method: trimString(body.api?.method, 20),
        url: trimString(body.api?.url, 1200),
        statusCode: Number.isFinite(Number(body.api?.statusCode)) ? Number(body.api.statusCode) : undefined,
        statusText: trimString(body.api?.statusText, 200),
        responseMessage: trimString(body.api?.responseMessage, 2000),
        requestId: trimString(body.api?.requestId, 200),
      },
      userId: req.user?._id,
      reportedUserId: reportedUserId && mongoose.Types.ObjectId.isValid(reportedUserId) ? reportedUserId : reportedUserId,
      userSnapshot,
      deviceId: trimString(body.deviceId || req.header('X-Lingo-Device-Id'), 160),
      session: {
        isGuest: Boolean(body.session?.isGuest),
        nativeLanguage: trimString(body.session?.nativeLanguage, 20),
        targetLanguage: trimString(body.session?.targetLanguage, 20),
        subscriptionTier: trimString(body.session?.subscriptionTier || body.subscriptionTier, 50),
      },
      client: {
        userAgent: trimString(body.client?.userAgent || req.header('User-Agent'), 1200),
        platform: trimString(body.client?.platform, 200),
        appVersion: trimString(body.client?.appVersion, 100),
        language: trimString(body.client?.language, 80),
        viewport: trimString(body.client?.viewport, 80),
      },
      request: {
        ip: trimString(req.ip || req.socket?.remoteAddress, 80),
        origin: trimString(req.header('Origin'), 500),
      },
      metadata: cleanMetadata(body.metadata),
    });

    return res.status(201).json({ id: report._id });
  } catch (error) {
    console.error('Error report create failed:', error.message || error);
    return res.status(500).json({ message: 'Could not record error report' });
  }
});

module.exports = router;
