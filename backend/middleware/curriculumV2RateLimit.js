/**
 * Per-user, per-endpoint rate limit for the AI-backed Curriculum v2 routes.
 *
 * Without this, a buggy client (or hostile one) can burn through hundreds of
 * dollars in AI calls overnight on a single account. The limiter is a simple
 * in-memory token bucket keyed on `${userId}|${bucketKey}` with two windows:
 *   - perMinute   protects against accidental tight loops in the client.
 *   - perDay      caps total spend per account per UTC day.
 *
 * In-memory storage is intentional: it's lightweight, requires no extra
 * infrastructure, and the worst case on a restart is that the bucket resets —
 * which only lets a hammering client get a fresh window of calls, not bypass
 * the cap entirely. Replace with Redis later if/when the backend scales out.
 *
 * Admins are always allowed through. Anyone else hits HTTP 429 with a
 * Retry-After header in seconds.
 */

const buckets = new Map(); // key → { perMinute: { count, windowStartMs }, perDay: { count, windowStartMs } }

function bucketKey(userId, name) {
  return `${userId}|${name}`;
}

function getOrInitBucket(key) {
  let entry = buckets.get(key);
  if (!entry) {
    entry = {
      perMinute: { count: 0, windowStartMs: Date.now() },
      perDay: { count: 0, windowStartMs: Date.now() },
    };
    buckets.set(key, entry);
  }
  return entry;
}

function rollWindow(window, windowMs) {
  if (Date.now() - window.windowStartMs >= windowMs) {
    window.count = 0;
    window.windowStartMs = Date.now();
  }
}

function curriculumV2RateLimit({ name, perMinute = 20, perDay = 200 }) {
  if (!name) throw new Error('curriculumV2RateLimit requires a `name` for the bucket.');
  return function rateLimiter(req, res, next) {
    if (req.user?.role === 'admin') return next(); // Admins bypass.
    const userId = req.userId || 'anon';
    const key = bucketKey(userId, name);
    const bucket = getOrInitBucket(key);
    rollWindow(bucket.perMinute, 60 * 1000);
    rollWindow(bucket.perDay, 24 * 60 * 60 * 1000);

    if (bucket.perMinute.count >= perMinute) {
      const retryAfter = Math.max(1, Math.ceil((bucket.perMinute.windowStartMs + 60 * 1000 - Date.now()) / 1000));
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({
        message: 'Too many requests — pace yourself a moment and try again.',
        code: 'RATE_LIMITED_MINUTE',
        retryAfterSeconds: retryAfter,
      });
    }
    if (bucket.perDay.count >= perDay) {
      const retryAfter = Math.max(1, Math.ceil((bucket.perDay.windowStartMs + 24 * 60 * 60 * 1000 - Date.now()) / 1000));
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({
        message: 'Daily AI usage limit reached for this account. Resets in less than a day.',
        code: 'RATE_LIMITED_DAY',
        retryAfterSeconds: retryAfter,
      });
    }

    bucket.perMinute.count += 1;
    bucket.perDay.count += 1;
    next();
  };
}

// Test/cleanup hook — not used in production but lets the unit tests reset
// the in-memory store between cases.
function _resetBucketsForTests() {
  buckets.clear();
}

module.exports = {
  curriculumV2RateLimit,
  _resetBucketsForTests,
};
