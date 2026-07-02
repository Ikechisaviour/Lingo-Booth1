// Helpers for returning *coded* error responses from route handlers.
//
// Replaces the old pattern:
//     console.error('X error:', error);
//     res.status(500).json({ message: 'Server error' });
// with:
//     return sendServerError(req, res, error, 'DOMAIN_OPERATION_FAILED');
//
// sendServerError records the failure to the ErrorReport dashboard (real
// server-side stack + stable code + correlation ref) AND returns a response
// body of { message, code, ref } so the code/ref propagate to the client and
// show up end-to-end.

const { recordServerError, makeRef } = require('./errorReporting');
const { resolveCode } = require('./errorCodes');

// Use inside a catch block for genuine server failures (500s). Awaitable so the
// generated `ref` can be echoed to the client; safe to `return` directly.
async function sendServerError(req, res, error, code, opts = {}) {
  const resolved = resolveCode(code || error?.code);
  const httpStatus = opts.httpStatus || error?.httpStatus || resolved.httpStatus || 500;

  // Local server log — prefixed with the code so tailing logs is greppable too.
  console.error(`[${resolved.code}]`, error?.stack || error?.message || error);

  let ref;
  // Only 5xx are genuine server failures worth a dashboard record; 4xx are
  // client mistakes (validation etc.) and would just be noise.
  if (httpStatus >= 500) {
    const report = await recordServerError(req, {
      error,
      code: resolved.code,
      message: opts.logMessage || error?.message,
      route: opts.route,
      metadata: opts.metadata,
      severity: opts.severity,
      statusCode: httpStatus,
    });
    ref = report?.ref;
  }

  if (res.headersSent) return res;
  const body = {
    message: opts.clientMessage || resolved.clientMessage || 'Server error',
    code: resolved.code,
  };
  if (ref) body.ref = ref;
  if (opts.extra && typeof opts.extra === 'object') Object.assign(body, opts.extra);
  return res.status(httpStatus).json(body);
}

// Use for expected client errors (400/401/403/404). Attaches a code + ref but
// does NOT create a dashboard record (4xx are client mistakes, not server
// failures — recording them would flood the dashboard). The ref still lets a
// user quote it, and the client-side error report stores it. Synchronous.
function sendClientError(res, httpStatus, code, message, extra) {
  if (res.headersSent) return res;
  const resolved = resolveCode(code);
  const body = {
    message: message || resolved.clientMessage || 'Request failed',
    code: resolved.code,
    ref: makeRef(),
  };
  if (extra && typeof extra === 'object') Object.assign(body, extra);
  return res.status(httpStatus || resolved.httpStatus || 400).json(body);
}

module.exports = { sendServerError, sendClientError };
