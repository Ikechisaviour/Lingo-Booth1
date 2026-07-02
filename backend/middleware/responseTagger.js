// Response-layer safety net for error identification.
//
// WHY: Relying on every handler to call sendServerError/sendClientError misses
// everything UPSTREAM of the handler — auth middleware 401s, rate-limit 429s,
// library errors — and any site that was never migrated. Those were the bulk
// of dashboard entries with no code/ref.
//
// WHAT: This wraps res.json so that ANY response with status >= 400 is
// guaranteed to carry a `code` and a `ref` before it leaves the server, and any
// uncoded 5xx is recorded to the dashboard. It never overwrites a code/ref that
// a handler already set (semantic codes win); it only fills the gaps.
//
// Mount ONCE, early — before rate limiters and route mounts — so the patch is
// in place for every downstream response.

const { recordServerError, makeRef } = require('../utils/errorReporting');
const { httpFallbackCode } = require('../utils/errorCodes');

function tagErrorResponses(req, res, next) {
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    try {
      const status = res.statusCode || 200;
      if (status >= 400 && body && typeof body === 'object' && !Array.isArray(body)) {
        // Reuse one ref per response (in case json is somehow called twice).
        if (!res.locals.__errorRef) res.locals.__errorRef = body.ref || makeRef();

        const hadCode = !!body.code;
        if (!body.code) body.code = httpFallbackCode(status);
        if (!body.ref) body.ref = res.locals.__errorRef;

        // Record uncoded server failures only. A response that already carried a
        // code came through sendServerError / the global error handler, which
        // already recorded it (with the real stack) — recording again here would
        // duplicate. 4xx are expected client errors and are intentionally not
        // recorded (they'd flood the dashboard with normal auth/guest traffic).
        if (status >= 500 && !hadCode && !res.locals.__errorRecorded) {
          res.locals.__errorRecorded = true;
          recordServerError(req, {
            error: new Error(body.message || `Uncoded ${status} response`),
            code: body.code,
            ref: body.ref,
            statusCode: status,
            message: body.message,
            metadata: { uncoded: true, taggedBy: 'responseTagger' },
          }).catch(() => {});
        }
      }
    } catch (_) {
      // Tagging must never break a response.
    }
    return originalJson(body);
  };

  next();
}

module.exports = { tagErrorResponses };
