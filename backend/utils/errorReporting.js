const crypto = require('crypto');
const ErrorReport = require('../models/ErrorReport');

function trimString(value, max = 1000) {
  if (value === undefined || value === null) return undefined;
  return String(value).slice(0, max);
}

// Short, human-quotable correlation id stored on the report and returned to the
// client (e.g. "A1B2C3D4"). Lets a user say "I saw error A1B2C3D4" and have us
// jump straight to the exact record.
function makeRef() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

// Safe header read: process-level handlers pass a plain object (no .header()).
function header(req, name) {
  return typeof req?.header === 'function' ? req.header(name) : undefined;
}

// Records a backend failure to the ErrorReport dashboard. Never throws — a
// reporting failure must not mask the original error. Returns the created
// report (with `.ref` and `.code`) so callers can echo them to the client, or
// null if persistence failed.
async function recordServerError(req = {}, options = {}) {
  try {
    const error = options.error;
    const message = trimString(options.message || error?.message || 'Server failure reported', 2000);
    const route = trimString(options.route || req.originalUrl || req.url, 1000);
    // Prefer an explicit operation code; fall back to a thrown AppError's code.
    const code = trimString(options.code || error?.code, 120);
    // Caller may supply a ref (to match one already put in the response body);
    // otherwise mint a fresh one.
    const ref = trimString(options.ref, 40) || makeRef();

    // If the origin threw an AppError with its own code, keep it as the cause.
    const metadata = { ...(options.metadata || {}) };
    if (error?.code && error.code !== code) metadata.causeCode = trimString(error.code, 120);
    if (error?.details !== undefined && metadata.details === undefined) metadata.details = error.details;

    const report = await ErrorReport.create({
      source: options.source || 'backend',
      kind: options.kind || 'server',
      severity: options.severity || 'error',
      code,
      ref,
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
      deviceId: trimString(header(req, 'X-Lingo-Device-Id'), 160),
      session: {
        nativeLanguage: trimString(req.body?.nativeLanguage || req.query?.nativeLang, 20),
        targetLanguage: trimString(req.body?.targetLanguage || req.query?.targetLang, 20),
      },
      client: {
        userAgent: trimString(header(req, 'User-Agent'), 1200),
      },
      request: {
        ip: trimString(req.ip || req.socket?.remoteAddress, 80),
        origin: trimString(header(req, 'Origin'), 500),
      },
      metadata,
    });
    return report;
  } catch (reportError) {
    console.error('Server error report failed:', reportError.message || reportError);
    return null;
  }
}

module.exports = { recordServerError, makeRef };
