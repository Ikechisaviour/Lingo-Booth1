import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

const DEVICE_ID_KEY = 'lingoAdminDeviceId';

const createDeviceId = () => {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `admin-web-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
};

const getDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = createDeviceId();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
};

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-Lingo-Device-Id'] = getDeviceId();
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';
    if (status === 401 && !requestUrl.includes('/auth/login')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUserId');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminRole');
      window.dispatchEvent(new Event('adminUnauthorized'));
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const ttsService = {
  speak: (text, lang, voice, rate) =>
    api.post('/tts', { text, lang, voice, rate }, { responseType: 'blob' }),
  getVoices: (lang) =>
    api.get('/tts/voices', { params: lang ? { lang } : {} }),
  buildSpeakUrl: (text, lang, voice, rate) => {
    const params = new URLSearchParams({ text, lang });
    if (voice) params.set('voice', voice);
    if (rate) params.set('rate', rate);
    return `${API_URL}/tts?${params.toString()}`;
  },
};

export const adminService = {
  getStats: () =>
    api.get('/admin/stats'),
  getUsers: () =>
    api.get('/admin/users'),
  getUser: (userId) =>
    api.get(`/admin/users/${userId}`),
  suspendUser: (userId, reason) =>
    api.put(`/admin/users/${userId}/suspend`, { reason }),
  unsuspendUser: (userId) =>
    api.put(`/admin/users/${userId}/unsuspend`),
  updateUserRole: (userId, role) =>
    api.put(`/admin/users/${userId}/role`, { role }),
  deleteUser: (userId) =>
    api.delete(`/admin/users/${userId}`),
  resetRateLimit: (userId) =>
    api.put(`/admin/users/${userId}/reset-rate-limit`),
  getErrorReports: ({ page = 1, status = 'open', severity = '', source = '' } = {}) =>
    api.get('/admin/error-reports', { params: { page, status, severity, source } }),
  acknowledgeErrorReport: (reportId) =>
    api.put(`/admin/error-reports/${reportId}/acknowledge`),
  sendSpeakingDemoTurn: (data) =>
    api.post('/admin/speaking-demo/conversation', data, { timeout: 60000 }),
  sendLocalSpeakingDemoTurn: (data) =>
    api.post('/admin/local-demo/speaking-demo/conversation', data, { timeout: 60000 }),
};

export const aiService = {
  getEntitlements: () =>
    api.get('/ai/entitlements'),
  sendConversationTurn: (data) =>
    api.post('/ai/conversation', data, { timeout: 60000 }),
};

export default api;
