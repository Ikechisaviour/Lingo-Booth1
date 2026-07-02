// ---------------------------------------------------------------------------
// Stable error codes for the whole backend.
//
// WHY THIS EXISTS
//   Before this file, every failing route returned `{ message: 'Server error' }`
//   with a 500, and only 2 of 19 route files recorded the real server-side
//   stack. The result: the error dashboard could not tell *which* function,
//   feature or operation broke. A code fixes that — every failure now carries a
//   stable, greppable identifier so `grep -rn CODE backend/` jumps straight to
//   the throw/catch site, and the dashboard can group + filter by it.
//
// CONVENTION
//   Codes are UPPER_SNAKE_CASE, prefixed by domain (usually the route file):
//     <DOMAIN>_<OPERATION>_<OUTCOME>
//   e.g. USERS_LEARNING_EVENT_RECORD_FAILED, AUTH_LOGIN_FAILED,
//        BILLING_WEBHOOK_VERIFY_FAILED, LEARN_EVENT_UNSUPPORTED_TYPE.
//   Any string is accepted by sendServerError()/AppError — this registry only
//   needs to hold codes that want a NON-default HTTP status or a specific
//   user-facing message. Everything else defaults to 500 / "Server error".
//
// HOW TO USE
//   - In a catch block:   return sendServerError(req, res, error, 'USERS_XXX_FAILED')
//   - At a throw origin:   throw new AppError('LEARN_EVENT_UNSUPPORTED_TYPE')
//                          (or fail('LEARN_EVENT_UNSUPPORTED_TYPE'))
// ---------------------------------------------------------------------------

// Registry of codes that need something other than the 500 / "Server error"
// default. httpStatus drives the response status; clientMessage is what the
// user sees (keep it non-leaky). Anything not listed here still works — it just
// falls back to DEFAULT.
const ERROR_CODES = {
  // --- Generic / cross-cutting ---------------------------------------------
  UNKNOWN: { httpStatus: 500, clientMessage: 'Server error' },
  UNHANDLED_ERROR: { httpStatus: 500, clientMessage: 'Server error' },
  ROUTE_NOT_FOUND: { httpStatus: 404, clientMessage: 'Not found' },
  VALIDATION_FAILED: { httpStatus: 400, clientMessage: 'Invalid request' },
  UNAUTHORIZED: { httpStatus: 401, clientMessage: 'Not authorized' },
  FORBIDDEN: { httpStatus: 403, clientMessage: 'Forbidden' },
  NOT_FOUND: { httpStatus: 404, clientMessage: 'Not found' },
  DB_UNAVAILABLE: { httpStatus: 503, clientMessage: 'Service temporarily unavailable' },

  // --- Auth / access middleware (the highest-frequency uncoded errors) -----
  AUTH_NO_TOKEN: { httpStatus: 401, clientMessage: 'No token, authorization denied' },
  AUTH_TOKEN_INVALID: { httpStatus: 401, clientMessage: 'Token is not valid' },
  AUTH_TOKEN_EXPIRED: { httpStatus: 401, clientMessage: 'Token is not valid' },
  AUTH_USER_NOT_FOUND: { httpStatus: 401, clientMessage: 'User not found' },
  AUTH_ACCOUNT_SUSPENDED: { httpStatus: 403, clientMessage: 'Account suspended' },
  AUTH_ADMIN_ONLY: { httpStatus: 403, clientMessage: 'Access denied. Admin only.' },
  AUTH_OWNERSHIP_DENIED: { httpStatus: 403, clientMessage: 'Access denied. You can only access your own resources.' },

  // --- Rate limiting -------------------------------------------------------
  RATE_LIMITED: { httpStatus: 429, clientMessage: 'Too many requests, please try again later' },
  AUTH_RATE_LIMITED: { httpStatus: 429, clientMessage: 'Too many authentication attempts, please try again later' },

  // --- Request parsing -----------------------------------------------------
  REQUEST_BODY_INVALID_JSON: { httpStatus: 400, clientMessage: 'Malformed JSON in request body' },
  REQUEST_PAYLOAD_TOO_LARGE: { httpStatus: 413, clientMessage: 'Request payload too large' },

  // --- Learning events (the class of bug that motivated this) --------------
  LEARN_EVENT_MISSING_FIELDS: { httpStatus: 400, clientMessage: 'Missing required fields for learning event' },
  LEARN_EVENT_UNSUPPORTED_TYPE: { httpStatus: 400, clientMessage: 'Unsupported learning event type' },
};

// Fallback code for an error response that reached the wire WITHOUT an explicit
// code (e.g. from a library, a hand-written middleware, or a site not yet
// migrated). Low-cardinality by design (HTTP_<status>) so the dashboard can
// group "all uncoded 401s" at a glance; the route/stack pin down the exact one.
function httpFallbackCode(status) {
  return `HTTP_${status || 500}`;
}

const DEFAULT = { httpStatus: 500, clientMessage: 'Server error' };

// Resolve a code (any string) to its { httpStatus, clientMessage } config,
// falling back to a 500/"Server error" default for unregistered codes.
function resolveCode(code) {
  if (code && Object.prototype.hasOwnProperty.call(ERROR_CODES, code)) {
    return { code, ...DEFAULT, ...ERROR_CODES[code] };
  }
  return { code: code || 'UNKNOWN', ...DEFAULT };
}

module.exports = { ERROR_CODES, DEFAULT, resolveCode, httpFallbackCode };
