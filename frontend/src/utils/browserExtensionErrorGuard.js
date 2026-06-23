const EXTENSION_PROTOCOL_PATTERN = /\b(?:chrome|moz|safari-web)-extension:\/\//i;
const EXTENSION_SOURCE_PATTERN = /(?:^|[\\/])(?:content|contentscript|inpage|read)\.js\b/i;
const EXTENSION_MESSAGE_PATTERNS = [
  /Failed to connect to MetaMask/i,
  /MetaMask extension not found/i,
  /ObjectMultiplex - orphaned data/i,
  /Host validation failed/i,
  /Host is not supported/i,
  /Host is not valid or supported/i,
  /insights whitelist/i,
  /MaxListenersExceededWarning: Possible EventEmitter memory leak detected/i,
];

const safeString = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value.message) return String(value.message);
  try {
    return String(value);
  } catch {
    return '';
  }
};

export const isBrowserExtensionRuntimeIssue = ({
  message = '',
  filename = '',
  stack = '',
  reason = null,
} = {}) => {
  const combined = [
    safeString(message),
    safeString(filename),
    safeString(stack),
    safeString(reason),
    safeString(reason?.message),
    safeString(reason?.stack),
  ].filter(Boolean).join('\n');

  if (!combined) return false;
  if (EXTENSION_PROTOCOL_PATTERN.test(combined)) return true;

  const hasExtensionMessage = EXTENSION_MESSAGE_PATTERNS.some((pattern) => pattern.test(combined));
  if (!hasExtensionMessage) return false;

  return EXTENSION_SOURCE_PATTERN.test(combined)
    || /MetaMask|ObjectMultiplex|background-liveness|app-init-liveness/i.test(combined);
};

export const installBrowserExtensionErrorGuard = () => {
  if (typeof window === 'undefined' || window.__lingoBrowserExtensionErrorGuardInstalled) return;
  window.__lingoBrowserExtensionErrorGuardInstalled = true;

  const silence = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  window.addEventListener('error', (event) => {
    if (isBrowserExtensionRuntimeIssue({
      message: event.message,
      filename: event.filename,
      stack: event.error?.stack,
      reason: event.error,
    })) {
      silence(event);
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason || {};
    if (isBrowserExtensionRuntimeIssue({
      message: reason.message || safeString(reason),
      stack: reason.stack,
      reason,
    })) {
      silence(event);
    }
  }, true);
};
