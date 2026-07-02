// Global JS error capture for the mobile app.
//
// The React ErrorBoundary only catches errors thrown during RENDER of its
// descendants. It does NOT catch errors in event handlers (onPress), async
// callbacks / promises, timers, or native-adjacent code — those bubble to the
// RN global handler and, if fatal, close the app with nothing recorded. This
// installs an ErrorUtils global handler + an unhandled-rejection tracker so
// those fatal errors are reported to the failure dashboard (with a stack)
// BEFORE the app dies, and still crash as before so behaviour is unchanged.

import { reportClientError } from './errorReporter';

let installed = false;

export function installGlobalErrorHandler() {
  if (installed) return;
  installed = true;

  // 1) Uncaught JS errors (event handlers, timers, native callbacks, fatals).
  const ErrorUtils = (global as any).ErrorUtils;
  if (ErrorUtils?.getGlobalHandler && ErrorUtils?.setGlobalHandler) {
    const previousHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
      try {
        console.error('[GLOBAL_JS_ERROR]', isFatal ? '(fatal)' : '', error);
        reportClientError({
          kind: 'runtime',
          severity: isFatal ? 'critical' : 'error',
          message: (error && (error.message || String(error))) || 'Uncaught JS error',
          stack: (error && error.stack) || '',
          metadata: { fatal: !!isFatal, source: 'ErrorUtils.globalHandler' },
        });
      } catch (_) {
        // Reporting must never mask the original crash.
      }
      // Preserve default behaviour (red box in dev / crash in release).
      if (typeof previousHandler === 'function') previousHandler(error, isFatal);
    });
  }

  // 2) Unhandled promise rejections (async code without a .catch).
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const tracking = require('promise/setimmediate/rejection-tracking');
    tracking.enable({
      allRejections: true,
      onUnhandled: (id: number, error: any) => {
        try {
          console.error('[GLOBAL_UNHANDLED_REJECTION]', error);
          reportClientError({
            kind: 'unhandled-rejection',
            severity: 'error',
            message: (error && (error.message || String(error))) || 'Unhandled promise rejection',
            stack: (error && error.stack) || '',
            metadata: { source: 'rejection-tracking' },
          });
        } catch (_) {
          // ignore
        }
      },
      onHandled: () => {},
    });
  } catch (_) {
    // rejection-tracking not available in this RN/Hermes build — skip.
  }
}
