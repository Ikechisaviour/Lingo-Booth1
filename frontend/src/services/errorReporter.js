const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const DEVICE_ID_KEY = 'lingoDeviceId';
const RECENT_WINDOW_MS = 30000;
const recentReports = new Map();

const createDeviceId = () => {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `web-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
};

const getDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = createDeviceId();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
};

const cleanRecentReports = () => {
  const now = Date.now();
  recentReports.forEach((time, key) => {
    if (now - time > RECENT_WINDOW_MS) recentReports.delete(key);
  });
};

const shouldSkip = (key) => {
  cleanRecentReports();
  const now = Date.now();
  const last = recentReports.get(key);
  if (last && now - last < RECENT_WINDOW_MS) return true;
  recentReports.set(key, now);
  return false;
};

const currentRoute = () => {
  if (typeof window === 'undefined') return '';
  return `${window.location.pathname}${window.location.search}`;
};

const viewport = () => {
  if (typeof window === 'undefined') return '';
  return `${window.innerWidth}x${window.innerHeight}`;
};

const getSession = () => ({
  isGuest: localStorage.getItem('guestMode') === 'true',
  nativeLanguage: localStorage.getItem('nativeLanguage') || '',
  targetLanguage: localStorage.getItem('targetLanguage') || '',
  subscriptionTier: localStorage.getItem('subscriptionTier') || '',
});

const getClient = () => ({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  viewport: viewport(),
});

const sendReport = (payload) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'X-Lingo-Device-Id': getDeviceId(),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const body = JSON.stringify({
    source: 'web',
    route: currentRoute(),
    userId: localStorage.getItem('userId') || '',
    username: localStorage.getItem('username') || '',
    role: localStorage.getItem('userRole') || '',
    subscriptionTier: localStorage.getItem('subscriptionTier') || '',
    deviceId: getDeviceId(),
    session: getSession(),
    client: getClient(),
    ...payload,
  });

  fetch(`${API_URL}/error-reports`, {
    method: 'POST',
    headers,
    body,
    keepalive: body.length < 60000,
  }).catch(() => {});
};

export const reportClientError = (payload = {}) => {
  const message = String(payload.message || payload.error?.message || 'Client failure reported');
  const key = [
    payload.kind || 'manual',
    payload.severity || 'error',
    payload.route || currentRoute(),
    payload.api?.method || '',
    payload.api?.url || '',
    payload.api?.statusCode || '',
    message,
  ].join('|');

  if (shouldSkip(key)) return;

  sendReport({
    kind: payload.kind || 'manual',
    severity: payload.severity || 'error',
    message,
    stack: payload.stack || payload.error?.stack || '',
    componentStack: payload.componentStack || '',
    screen: payload.screen || '',
    api: payload.api || undefined,
    metadata: payload.metadata || {},
  });
};

export const reportApiError = (error, metadata = {}) => {
  if (!error || error.__reportedToAdmin) return;
  if (error.code === 'ERR_CANCELED' || error.name === 'CanceledError') return;

  const config = error.config || {};
  const url = config.url || '';
  if (url.includes('/error-reports')) return;

  error.__reportedToAdmin = true;
  const statusCode = error.response?.status;
  const responseMessage = error.response?.data?.message || error.response?.data?.error || error.message;
  const severity = statusCode >= 500 || !statusCode ? 'error' : 'warning';

  reportClientError({
    kind: 'api',
    severity,
    message: responseMessage || 'API request failed',
    stack: error.stack || '',
    api: {
      method: String(config.method || 'get').toUpperCase(),
      url,
      statusCode,
      statusText: error.response?.statusText || '',
      responseMessage,
    },
    metadata: {
      code: error.code || '',
      timeout: config.timeout || '',
      ...metadata,
    },
  });
};

export const installGlobalErrorReporting = () => {
  if (window.__lingoErrorReportingInstalled) return;
  window.__lingoErrorReportingInstalled = true;

  window.addEventListener('error', (event) => {
    reportClientError({
      kind: 'runtime',
      severity: 'error',
      message: event.message || event.error?.message || 'Runtime error',
      stack: event.error?.stack || '',
      metadata: {
        filename: event.filename || '',
        lineno: event.lineno || '',
        colno: event.colno || '',
      },
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason || {};
    reportClientError({
      kind: 'unhandled-rejection',
      severity: 'error',
      message: reason.message || String(reason || 'Unhandled promise rejection'),
      stack: reason.stack || '',
      metadata: {
        name: reason.name || '',
        code: reason.code || '',
      },
    });
  });
};
