// Global safety-net error handling. Route handlers should still return coded
// responses via sendServerError(), but anything that escapes a handler (a
// thrown AppError passed to next(err), a sync throw, an unmatched route, or an
// unhandled promise rejection at the process level) is caught here so it is
// never a silent/uncoded 500.

const { recordServerError } = require('../utils/errorReporting');
const { resolveCode } = require('../utils/errorCodes');

// 404 for unmatched API routes — coded, so "route typo vs real bug" is obvious.
function notFoundHandler(req, res) {
  res.status(404).json({
    message: 'Not found',
    code: 'ROUTE_NOT_FOUND',
    path: req.originalUrl,
  });
}

// Express error middleware (must have 4 args). Mount LAST, after all routes.
// eslint-disable-next-line no-unused-vars
async function errorHandler(err, req, res, next) {
  const resolved = resolveCode(err?.code || 'UNHANDLED_ERROR');
  const httpStatus = err?.httpStatus || err?.status || resolved.httpStatus || 500;

  console.error(`[${resolved.code}] unhandled in ${req?.method} ${req?.originalUrl}:`, err?.stack || err);

  let ref;
  if (httpStatus >= 500) {
    const report = await recordServerError(req, {
      error: err,
      code: resolved.code,
      statusCode: httpStatus,
      metadata: { unhandled: true },
    });
    ref = report?.ref;
  }

  if (res.headersSent) return next(err);
  const body = {
    message: err?.clientMessage || resolved.clientMessage || 'Server error',
    code: resolved.code,
  };
  if (ref) body.ref = ref;
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
