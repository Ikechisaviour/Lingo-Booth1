// A typed error that carries a stable code + HTTP status from the point of
// failure up to the route/global handler. Throw this at origin points (utils,
// services, model helpers) so the catch site / global error handler can report
// the *specific* cause instead of a generic 500.
//
//   throw new AppError('LEARN_EVENT_UNSUPPORTED_TYPE');
//   throw new AppError('BILLING_PLAN_INVALID', { httpStatus: 400, details: { plan } });
//   fail('AUTH_TOKEN_EXPIRED');
//
// The global error handler (middleware/errorHandler.js) and sendServerError()
// both understand `.code`, `.httpStatus` and `.details`.

const { resolveCode } = require('./errorCodes');

class AppError extends Error {
  constructor(code, { message, httpStatus, details, cause } = {}) {
    const resolved = resolveCode(code);
    super(message || resolved.clientMessage || code);
    this.name = 'AppError';
    this.isAppError = true;
    this.code = resolved.code;
    this.httpStatus = httpStatus || resolved.httpStatus || 500;
    this.clientMessage = resolved.clientMessage;
    if (details !== undefined) this.details = details;
    if (cause !== undefined) this.cause = cause;
    // Keep a clean stack that points at the throw site, not this constructor.
    if (Error.captureStackTrace) Error.captureStackTrace(this, AppError);
  }
}

// Convenience thrower so origin code reads as a guard clause.
function fail(code, opts) {
  throw new AppError(code, opts);
}

module.exports = { AppError, fail };
