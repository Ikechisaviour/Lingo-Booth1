const ErrorReport = require('../models/ErrorReport');

function trimString(value, max = 1000) {
  if (value === undefined || value === null) return undefined;
  return String(value).slice(0, max);
}

async function recordServerError(req, options = {}) {
  try {
    const error = options.error;
    const message = trimString(options.message || error?.message || 'Server failure reported', 2000);
    const route = trimString(options.route || req.originalUrl || req.url, 1000);

    await ErrorReport.create({
      source: 'backend',
      kind: 'server',
      severity: options.severity || 'error',
      message,
      stack: trimString(error?.stack, 12000),
      route,
      api: {
        method: trimString(req.method, 20),
        url: route,
        statusCode: options.statusCode || 500,
        responseMessage: message,
      },
      userId: req.user?._id,
      reportedUserId: trimString(req.body?.userId || req.params?.userId, 120),
      userSnapshot: req.user ? {
        username: trimString(req.user.username, 120),
        email: trimString(req.user.email, 250),
        role: trimString(req.user.role, 50),
        subscriptionTier: trimString(req.user.subscriptionTier, 50),
      } : {},
      deviceId: trimString(req.header('X-Lingo-Device-Id'), 160),
      session: {
        nativeLanguage: trimString(req.body?.nativeLanguage || req.query?.nativeLang, 20),
        targetLanguage: trimString(req.body?.targetLanguage || req.query?.targetLang, 20),
      },
      client: {
        userAgent: trimString(req.header('User-Agent'), 1200),
      },
      request: {
        ip: trimString(req.ip || req.socket?.remoteAddress, 80),
        origin: trimString(req.header('Origin'), 500),
      },
      metadata: options.metadata || {},
    });
  } catch (reportError) {
    console.error('Server error report failed:', reportError.message || reportError);
  }
}

module.exports = { recordServerError };
