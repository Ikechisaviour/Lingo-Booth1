// Global safety-net error handling. Route handlers should still return coded
// responses via sendServerError(), but anything that escapes a handler (a
// thrown AppError passed to next(err), a sync throw, an unmatched route, or an
// unhandled promise rejection at the process level) is caught here so it is
// never a silent/uncoded 500.

const { recordServerError, makeRef } = require('../utils/errorReporting');
const { resolveCode } = require('../utils/errorCodes');

// 404 for unmatched API routes — coded, so "route typo vs real bug" is obvious.
function notFoundHandler(req, res) {
  res.status(404).json({
    message: 'Not found',
    code: 'ROUTE_NOT_FOUND',
    path: req.originalUrl,
  });
}

// Map well-known library error shapes (that have no `code` of their own) to a
// meaningful code so they don't all collapse into UNHANDLED_ERROR.
function deriveCode(err) {
  if (err?.code) return err.code;
  if (err?.type === 'entity.parse.failed') return 'REQUEST_BODY_INVALID_JSON';
  if (err?.type === 'entity.too.large') return 'REQUEST_PAYLOAD_TOO_LARGE';
  return 'UNHANDLED_ERROR';
}

// Express error middleware (must have 4 args). Mount LAST, after all routes.
// eslint-disable-next-line no-unused-vars
async function errorHandler(err, req, res, next) {
  const resolved = resolveCode(deriveCode(err));
  const httpStatus = err?.httpStatus || err?.status || resolved.httpStatus || 500;

  console.error(`[${resolved.code}] unhandled in ${req?.method} ${req?.originalUrl}:`, err?.stack || err);

  // Always mint a ref so the response is quotable even for 4xx that were thrown
  // (e.g. malformed JSON). For 5xx we reuse the recorded report's ref.
  let ref = makeRef();
  if (httpStatus >= 500) {
    const report = await recordServerError(req, {
      error: err,
      code: resolved.code,
      ref,
      statusCode: httpStatus,
      metadata: { unhandled: true },
    });
    if (report?.ref) ref = report.ref;
  }

  if (res.headersSent) return next(err);
  const body = {
    message: err?.clientMessage || resolved.clientMessage || 'Server error',
    code: resolved.code,
    ref,
  };
  res.status(httpStatus).json(body);
}

// Process-level backstops so a crash-worthy error still lands in the dashboard
// with a code before the process (potentially) exits.
function installProcessHandlers() {
  process.on('unhandledRejection', (reason) => {
    const err = reason instanceof Error ? reason : new Error(String(reason));
    console.error('[PROCESS_UNHANDLED_REJECTION]', err.stack || err);
    recordServerError({}, {
      error: err,
      code: 'PROCESS_UNHANDLED_REJECTION',
      severity: 'critical',
      route: 'process',
    }).catch(() => {});
  });

  process.on('uncaughtException', (err) => {
    console.error('[PROCESS_UNCAUGHT_EXCEPTION]', err?.stack || err);
    recordServerError({}, {
      error: err,
      code: 'PROCESS_UNCAUGHT_EXCEPTION',
      severity: 'critical',
      route: 'process',
    }).catch(() => {});
    // Deliberately do NOT exit here — existing behaviour was to keep running;
    // we only add visibility. Revisit if a supervisor should restart instead.
  });
}

module.exports = { notFoundHandler, errorHandler, installProcessHandlers };
