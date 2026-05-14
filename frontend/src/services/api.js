import axios from 'axios';
import { reportApiError } from './errorReporter';
import { normalizeLanguageCode } from '../utils/languagePairPolicy';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15-second timeout to avoid hanging requests
});

const DEVICE_ID_KEY = 'lingoDeviceId';

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

const clearSession = ({ preserveGuest = false } = {}) => {
  [
    'token',
    'refreshToken',
    'userId',
    'username',
    'userEmail',
    'userRole',
    'subscriptionTier',
    'aiEntitlements',
    'emailVerified',
    'needsLanguageSetup',
  ].forEach((key) => localStorage.removeItem(key));
  if (!preserveGuest) {
    localStorage.removeItem('guestMode');
  }
};

const isCurrentUserProfileRequest = (config) => {
  const userId = localStorage.getItem('userId');
  if (!userId || !config?.url) return false;
  const url = config.url.split('?')[0];
  return url === `/users/${userId}` || url.startsWith(`/users/${userId}/`);
};

const isProtectedRequest = (url = '') => {
  const cleanUrl = url.split('?')[0];
  return (
    cleanUrl.startsWith('/users/') ||
    cleanUrl.startsWith('/progress/') ||
    cleanUrl.startsWith('/flashcards/user/') ||
    cleanUrl === '/auth/activity'
  );
};

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const isGuest = localStorage.getItem('guestMode') === 'true';
  let token = localStorage.getItem('token');
  const url = config.url || '';

  if (isGuest && token) {
    clearSession({ preserveGuest: true });
    token = null;
  }

  if (!token && isProtectedRequest(url)) {
    clearSession({ preserveGuest: isGuest });
    const error = new axios.Cancel('Skipped protected request without an active session.');
    error.code = 'ERR_AUTH_REQUIRED';
    throw error;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-Lingo-Device-Id'] = getDeviceId();
  return config;
});

// Track whether a token refresh is in progress to avoid concurrent refreshes
let refreshPromise = null;

const isAuthRequest = (url = '') => (
  url.includes('/auth/refresh') ||
  url.includes('/auth/login') ||
  url.includes('/auth/register') ||
  url.includes('/auth/google')
);

// Guard so concurrent 401s from a single stale token don't each report
// and re-dispatch sessionExpired. Reset on any successful response.
let sessionExpiryActive = false;

const endExpiredSession = (error, phase) => {
  if (sessionExpiryActive) return;
  sessionExpiryActive = true;
  if (error && phase) reportApiError(error, { phase });
  clearSession();
  window.dispatchEvent(new CustomEvent('sessionExpired'));
};

const isExpectedStatus = (config, status) => {
  const expected = config?.expectedStatuses;
  return Array.isArray(expected) && status != null && expected.includes(status);
};

// Retry logic for network errors and 5xx server errors + auto-refresh on 401
api.interceptors.response.use(
  (response) => {
    sessionExpiryActive = false;
    return response;
  },
  async (error) => {
    const config = error.config;

    // Auto-refresh on 401 (expired access token)
    if (
      error.response?.status === 401 &&
      config &&
      !config._refreshed &&
      !isAuthRequest(config.url)
    ) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        config._refreshed = true;
        try {
          if (!refreshPromise) {
            refreshPromise = axios
              .post(`${API_URL}/auth/refresh`, { refreshToken })
              .then((res) => {
                const newToken = res.data.token;
                localStorage.setItem('token', newToken);
                sessionExpiryActive = false;
                return newToken;
              })
              .finally(() => { refreshPromise = null; });
          }
          const newToken = await refreshPromise;
          config.headers.Authorization = `Bearer ${newToken}`;
          return api(config);
        } catch {
          // Refresh failed — force logout (deduped across concurrent 401s)
          endExpiredSession(error, 'auth-refresh-failed');
          return Promise.reject(error);
        }
      }
      endExpiredSession(error, 'auth-expired');
    }

    // Only retry GET requests, max 2 retries
    if (
      config &&
      !config._retryCount &&
      config.method === 'get' &&
      (!error.response || error.response.status >= 500)
    ) {
      config._retryCount = (config._retryCount || 0) + 1;
      if (config._retryCount <= 2) {
        await new Promise((r) => setTimeout(r, config._retryCount * 500));
        return api(config);
      }
    }
    // Detect mid-session suspension
    if (
      error.response?.status === 403 &&
      error.response?.data?.message === 'Account suspended' &&
      localStorage.getItem('token')
    ) {
      clearSession();
      window.dispatchEvent(new CustomEvent('accountSuspended'));
    }
    // Detect deleted current account without logging out for ordinary missing content.
    if (
      error.response?.status === 404 &&
      isCurrentUserProfileRequest(config) &&
      localStorage.getItem('token')
    ) {
      clearSession();
      window.dispatchEvent(new CustomEvent('accountSuspended'));
    }
    if (!isExpectedStatus(config, error.response?.status)) {
      reportApiError(error);
    }
    return Promise.reject(error);
  }
);

// Guest XP helpers — stored in localStorage, transferred on signup/login
export const guestXPHelper = {
  get: () => parseInt(localStorage.getItem('guestXP') || '0', 10),
  add: (points = 1) => {
    const current = parseInt(localStorage.getItem('guestXP') || '0', 10);
    const updated = current + points;
    localStorage.setItem('guestXP', String(updated));
    window.dispatchEvent(new CustomEvent('xpUpdated', { detail: { totalXP: updated, isGuest: true } }));
    return updated;
  },
  clear: () => localStorage.removeItem('guestXP'),
};

export const authService = {
  register: (username, email, password, guestXP, nativeLanguage, targetLanguage) =>
    api.post('/auth/register', { username, email, password, guestXP, nativeLanguage, targetLanguage }),
  login: (email, password, guestXP) =>
    api.post('/auth/login', { email, password, guestXP }),
  googleLogin: (credential, guestXP, nativeLanguage, targetLanguage) =>
    api.post('/auth/google', { credential, guestXP, nativeLanguage, targetLanguage }),
  resendVerification: () =>
    api.post('/auth/resend-verification'),
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) =>
    api.post('/auth/reset-password', { token, password }),
  trackActivity: (userId, timeSpent) =>
    api.post('/auth/activity', { userId, timeSpent }),
};

const getStoredLanguageCode = (key, fallback = '') => {
  const raw = localStorage.getItem(key) || '';
  const normalized = normalizeLanguageCode(raw) || fallback;
  if (raw && normalized && normalized !== raw) {
    localStorage.setItem(key, normalized);
  }
  return normalized;
};

const getLanguageParams = () => ({
  targetLang: getStoredLanguageCode('targetLanguage'),
  nativeLang: getStoredLanguageCode('nativeLanguage'),
});

export const contactService = {
  sendMessage: (message) =>
    api.post('/contact', message, { timeout: 30000 }),
};

export const certificateService = {
  list: () =>
    api.get('/certificates'),
  getClassLessonStatus: (classLessonId) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get(`/certificates/class-lessons/${classLessonId}/status`, {
      params: { targetLang, nativeLang },
    });
  },
  issueClassLessonCertificate: (classLessonId, payload = {}) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = getLanguageParams();
    return api.post(`/certificates/class-lessons/${classLessonId}/issue`, {
      ...payload,
      targetLanguage,
      nativeLanguage,
    }, { expectedStatuses: [402] });
  },
  verify: (certificateId) =>
    api.get(`/certificates/verify/${encodeURIComponent(certificateId)}`, { expectedStatuses: [404] }),
};

export const billingService = {
  getPlans: () =>
    api.get('/billing/plans'),
  getAccount: () =>
    api.get('/billing/me', { expectedStatuses: [401] }),
  createCheckoutSession: ({ planId, interval = 'monthly', successUrl, cancelUrl, discountCode = '' }) =>
    api.post('/billing/checkout-session', { planId, interval, successUrl, cancelUrl, discountCode }, { timeout: 30000, expectedStatuses: [202] }),
  validateDiscount: ({ planId, discountCode }) =>
    api.post('/billing/discounts/validate', { planId, discountCode }, { expectedStatuses: [404] }),
  openCustomerPortal: (returnUrl) =>
    api.post('/billing/customer-portal', { returnUrl }, { timeout: 30000, expectedStatuses: [202] }),
  sendInstitutionalInquiry: (payload) =>
    api.post('/billing/institutional-inquiry', payload, { timeout: 30000 }),
  getAdminOverview: () =>
    api.get('/billing/admin/overview'),
  getAdminSubscriptions: () =>
    api.get('/billing/admin/subscriptions'),
  getAdminPricing: () =>
    api.get('/billing/admin/pricing'),
  updatePlanOverride: (planId, payload) =>
    api.put(`/billing/admin/plan-overrides/${planId}`, payload),
  createDiscount: (payload) =>
    api.post('/billing/admin/discounts', payload),
  updateDiscount: (discountId, payload) =>
    api.put(`/billing/admin/discounts/${discountId}`, payload),
  assignManualPlan: (payload) =>
    api.post('/billing/admin/manual-plan', payload),
  createOrganization: (payload) =>
    api.post('/billing/admin/organizations', payload),
  updateOrganization: (organizationId, payload) =>
    api.put(`/billing/admin/organizations/${organizationId}`, payload),
  addOrganizationMember: (organizationId, payload) =>
    api.post(`/billing/admin/organizations/${organizationId}/members`, payload),
  getInstitutionalLeads: (status = '') =>
    api.get('/billing/admin/institutional-leads', { params: status ? { status } : {} }),
  updateInstitutionalLeadStatus: (leadId, status) =>
    api.put(`/billing/admin/institutional-leads/${leadId}/status`, { status }),
  getInstitutionDashboard: (organizationId = '') =>
    api.get('/billing/institution/dashboard', { params: organizationId ? { organizationId } : {}, expectedStatuses: [403] }),
  updateInstitutionProfile: (organizationId, payload) =>
    api.put(`/billing/institution/organizations/${organizationId}`, payload),
  addInstitutionMember: (organizationId, payload) =>
    api.post(`/billing/institution/organizations/${organizationId}/members`, payload),
  updateInstitutionMember: (organizationId, membershipId, payload) =>
    api.put(`/billing/institution/organizations/${organizationId}/members/${membershipId}`, payload),
};

export const quizService = {
  getQuizzes: (category, difficulty) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get('/quiz', { params: { category, difficulty, targetLang, nativeLang } });
  },
  getQuiz: (quizId) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get(`/quiz/${quizId}`, { params: { targetLang, nativeLang }, timeout: 30000 });
  },
};

export const classLessonService = {
  getClassLessons: () => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get('/class-lessons', { params: { targetLang, nativeLang } });
  },
  getClassLesson: (classLessonId) => {
    if (!classLessonId) {
      return Promise.reject(new Error('classLessonId is required'));
    }
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get(`/class-lessons/${classLessonId}`, { params: { targetLang, nativeLang }, timeout: 30000 });
  },
  getProgress: (classLessonId) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get(`/class-lessons/${classLessonId}/progress`, { params: { targetLang, nativeLang } });
  },
  saveProgress: (classLessonId, progress) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = getLanguageParams();
    return api.put(`/class-lessons/${classLessonId}/progress`, {
      ...progress,
      targetLanguage,
      nativeLanguage,
      source: 'web',
    });
  },
};

export const practiceContextService = {
  analyze: ({ transcript, nativeLanguage, targetLanguage, source = 'web' }) =>
    api.post('/practice-context/analyze', { transcript, nativeLanguage, targetLanguage, source }, { timeout: 30000 }),
  save: (context) =>
    api.post('/practice-context', { ...context, source: context.source || 'web' }),
  list: (targetLanguage) =>
    api.get('/practice-context', { params: { targetLanguage } }),
  recommendations: (targetLanguage) =>
    api.get('/practice-context/recommendations', {
      params: { targetLanguage },
      // Recommendations are optional UI sugar — entitlement (403) or missing
      // backend route (404) shouldn't show up as admin-side failures.
      expectedStatuses: [403, 404],
    }),
  delete: (contextId) =>
    api.delete(`/practice-context/${contextId}`),
};

export const flashcardService = {
  getCategories: () => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get('/flashcards/categories', { params: { targetLang, nativeLang } });
  },
  getCategoryCards: (category) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get('/flashcards/category-cards', { params: { targetLang, nativeLang, category } });
  },
  getFlashcards: (userId, page = 1, limit = 50, opts = {}) => {
    const { targetLang, nativeLang } = getLanguageParams();
    const params = { targetLang, nativeLang, page, limit };
    if (opts.categories) params.categories = opts.categories;
    if (opts.shuffle !== undefined) params.shuffle = opts.shuffle;
    if (opts.seed !== undefined) params.seed = opts.seed;
    return api.get(`/flashcards/user/${userId}`, { params });
  },
  getGuestFlashcards: (page = 1, limit = 50, opts = {}) => {
    const { targetLang, nativeLang } = getLanguageParams();
    const params = { nativeLang, targetLang, page, limit };
    if (opts.categories) params.categories = opts.categories;
    if (opts.shuffle !== undefined) params.shuffle = opts.shuffle;
    if (opts.seed !== undefined) params.seed = opts.seed;
    return api.get('/flashcards/guest', { params });
  },
  createFlashcard: (flashcardData) =>
    api.post('/flashcards', flashcardData),
  updateFlashcard: (id, data) =>
    api.put(`/flashcards/${id}`, data),
  deleteFlashcard: (id) =>
    api.delete(`/flashcards/${id}`),
};

export const progressService = {
  getProgress: (userId) =>
    api.get(`/progress/user/${userId}`),
  getSummary: (userId) =>
    api.get(`/progress/summary/${userId}`),
  recordProgress: (progressData) =>
    api.post('/progress', progressData),
};

export const userService = {
  getProfile: (userId) =>
    api.get(`/users/${userId}`),
  updateProfile: (userId, data) =>
    api.put(`/users/${userId}`, data),
  changePassword: (userId, data) =>
    api.put(`/users/${userId}/password`, data),
  deleteAccount: (userId) =>
    api.delete(`/users/${userId}`),
  saveActivityState: (userId, data) =>
    api.put(`/users/${userId}/activity-state`, data),
  getActivityState: (userId) =>
    api.get(`/users/${userId}/activity-state`),
  addXP: (userId, points) =>
    api.post(`/users/${userId}/xp`, { points }),
  awardXP: (userId, data) =>
    api.post(`/users/${userId}/award-xp`, data).then(res => {
      window.dispatchEvent(new CustomEvent('xpUpdated', { detail: res.data }));
      return res;
    }),
  recordPeek: (userId, data) =>
    api.post(`/users/${userId}/peek`, data),
  resetXP: (userId) =>
    api.post(`/users/${userId}/reset-xp`),
  getXpStats: (userId) =>
    api.get(`/users/${userId}/xp-stats`),
  toggleXpDecay: (userId, enabled) =>
    api.put(`/users/${userId}/xp-decay-mode`, { enabled }),
  getGamificationStats: (userId) =>
    api.get(`/users/${userId}/gamification-stats`),
  claimQuestReward: (userId, questId) =>
    api.post(`/users/${userId}/claim-quest-reward`, { questId }),
  getLeaderboard: (userId) =>
    api.get(`/users/${userId}/leaderboard`),
};

export const ttsService = {
  speak: (text, lang, voice, rate) =>
    api.post('/tts', { text, lang, voice, rate }, { responseType: 'blob' }),
  getVoices: (lang) =>
    api.get('/tts/voices', { params: lang ? { lang } : {} }),
  // Builds a direct GET URL so the frontend can set audio.src without a fetch,
  // keeping audio.play() synchronous within the user gesture on iOS Safari.
  buildSpeakUrl: (text, lang, voice, rate) => {
    const params = new URLSearchParams({ text: String(text || '').trim(), lang });
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
  getUserFlashcards: () =>
    api.get('/admin/flashcards'),
  deleteFlashcard: (flashcardId) =>
    api.delete(`/admin/flashcards/${flashcardId}`),
  getGuests: (page = 1) =>
    api.get(`/admin/guests?page=${page}`),
  getErrorReports: ({ page = 1, status = 'open', severity = '', source = '' } = {}) =>
    api.get('/admin/error-reports', { params: { page, status, severity, source } }),
  acknowledgeErrorReport: (reportId) =>
    api.put(`/admin/error-reports/${reportId}/acknowledge`),
  clearOpenErrorReports: () =>
    api.put('/admin/error-reports/clear-open'),
  getContactMessages: ({ page = 1, status = 'open', senderType = 'all' } = {}) =>
    api.get('/admin/contact-messages', { params: { page, status, senderType } }),
  acknowledgeContactMessage: (messageId) =>
    api.put(`/admin/contact-messages/${messageId}/acknowledge`),
  clearOpenContactMessages: () =>
    api.put('/admin/contact-messages/clear-open'),
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
