import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, Platform } from 'react-native';
import { API_URL } from '../config/api';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';

const DEVICE_ID_KEY = 'lingoDeviceId';
const RECENT_WINDOW_MS = 30000;
const recentReports = new Map<string, number>();
let cachedDeviceId: string | null = null;

const createDeviceId = () => `mobile-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;

const getDeviceId = async () => {
  if (cachedDeviceId) return cachedDeviceId;
  const stored = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (stored) {
    cachedDeviceId = stored;
    return stored;
  }
  const created = createDeviceId();
  await AsyncStorage.setItem(DEVICE_ID_KEY, created);
  cachedDeviceId = created;
  return created;
};

const shouldSkip = (key: string) => {
  const now = Date.now();
  recentReports.forEach((time, reportKey) => {
    if (now - time > RECENT_WINDOW_MS) recentReports.delete(reportKey);
  });
  const last = recentReports.get(key);
  if (last && now - last < RECENT_WINDOW_MS) return true;
  recentReports.set(key, now);
  return false;
};

type ErrorPayload = {
  kind?: 'api' | 'runtime' | 'unhandled-rejection' | 'error-boundary' | 'manual';
  severity?: 'info' | 'warning' | 'error' | 'critical';
  message?: string;
  stack?: string;
  componentStack?: string;
  screen?: string;
  api?: {
    method?: string;
    url?: string;
    statusCode?: number;
    statusText?: string;
    responseMessage?: string;
  };
  metadata?: Record<string, unknown>;
};

export const reportClientError = async (payload: ErrorPayload = {}) => {
  try {
    const message = String(payload.message || 'Client failure reported');
    const key = [
      payload.kind || 'manual',
      payload.severity || 'error',
      payload.screen || '',
      payload.api?.method || '',
      payload.api?.url || '',
      payload.api?.statusCode || '',
      message,
    ].join('|');

    if (shouldSkip(key)) return;

    const deviceId = await getDeviceId();
    const auth = useAuthStore.getState();
    const settings = useSettingsStore.getState();
    const windowSize = Dimensions.get('window');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Lingo-Device-Id': deviceId,
    };
    if (auth.token) headers.Authorization = `Bearer ${auth.token}`;

    await fetch(`${API_URL}/error-reports`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source: 'mobile',
        deviceId,
        userId: auth.userId || '',
        username: auth.username || '',
        role: auth.userRole || '',
        subscriptionTier: auth.subscriptionTier || '',
        session: {
          isGuest: auth.isGuest || !auth.token,
          nativeLanguage: settings.nativeLanguage,
          targetLanguage: settings.targetLanguage,
          subscriptionTier: auth.subscriptionTier || '',
        },
        client: {
          platform: `${Platform.OS} ${Platform.Version}`,
          viewport: `${windowSize.width}x${windowSize.height}`,
        },
        ...payload,
        message,
      }),
    });
  } catch {
    // Reporting must never interrupt the learner.
  }
};

export const reportApiError = (error: any, metadata: Record<string, unknown> = {}) => {
  if (!error || error.__reportedToAdmin) return;
  if (error.code === 'ERR_CANCELED' || error.name === 'CanceledError') return;

  const config = error.config || {};
  const url = config.url || '';
  if (url.includes('/error-reports')) return;

  error.__reportedToAdmin = true;
  const statusCode = error.response?.status;
  const responseMessage = error.response?.data?.message || error.response?.data?.error || error.message;

  reportClientError({
    kind: 'api',
    severity: statusCode >= 500 || !statusCode ? 'error' : 'warning',
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
