import axios from 'axios';
import { reportApiError } from './errorReporter';
import { normalizeLanguageCode } from '../utils/languagePairPolicy';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15-second timeout to avoid hanging requests
});

const GET_CACHE = new Map();

const stableSerialize = (value) => {
  if (!value || typeof value !== 'object') return JSON.stringify(value ?? null);
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`).join(',')}}`;
};

const getCacheKey = (url, config = {}) => `${url}|${stableSerialize(config.params || {})}`;

const cachedGet = (url, config = {}, ttlMs = 10000) => {
  const key = getCacheKey(url, config);
  const now = Date.now();
  const cached = GET_CACHE.get(key);
  if (cached && cached.expiresAt > now) return cached.promise;

  const promise = api.get(url, config).catch((error) => {
    GET_CACHE.delete(key);
    throw error;
  });
  GET_CACHE.set(key, { expiresAt: now + ttlMs, promise });
  return promise;
};

const invalidateCachedGets = (predicate) => {
  for (const key of GET_CACHE.keys()) {
    if (predicate(key)) GET_CACHE.delete(key);
  }
};

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

    // Step-up auth required for a sensitive action — hold the original promise
    // open while the UI prompts for a password, then transparently retry so
    // the caller never has to know step-up happened.
    if (error.response?.status === 401 && error.response?.data?.code === 'STEP_UP_REQUIRED') {
      return new Promise((resolve, reject) => {
        window.dispatchEvent(new CustomEvent('stepUpRequired', {
          detail: {
            maxAgeMinutes: error.response.data.maxAgeMinutes,
            onComplete: () => api(config).then(resolve, reject),
            onCancel: () => reject(error),
          },
        }));
      });
    }

    // Auto-refresh on 401 (expired access token).
    // Rotated refresh tokens come back on every successful refresh; store both.
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
                const newRefreshToken = res.data.refreshToken;
                localStorage.setItem('token', newToken);
                if (newRefreshToken) {
                  localStorage.setItem('refreshToken', newRefreshToken);
                }
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
  register: (username, email, password, guestXP, nativeLanguage, targetLanguage, fullName = '') =>
    api.post('/auth/register', { username, email, password, guestXP, nativeLanguage, targetLanguage, fullName }),
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
  // Server-side logout: invalidates the refresh chain so a stolen refresh
  // token can't be replayed after the user signs out.
  logout: () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return Promise.resolve();
    return axios.post(`${API_URL}/auth/logout`, { refreshToken }).catch(() => {});
  },
  // Step-up: re-verify the user's password and receive a fresh `authAt` so
  // they can perform a sensitive action without a full re-login.
  stepUp: (password) =>
    api.post('/auth/step-up', { password }),
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

export const notificationService = {
  list: (params = {}) =>
    api.get('/notifications', { params }),
  unreadCount: () =>
    api.get('/notifications/unread-count'),
  markRead: (notificationId) =>
    api.put(`/notifications/${notificationId}/read`),
  markAllRead: () =>
    api.put('/notifications/read-all'),
  archive: (notificationId) =>
    api.delete(`/notifications/${notificationId}`),
  adminBroadcast: (payload) =>
    api.post('/notifications/admin/broadcast', payload),
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
  verify: (certificateId, params = {}) =>
    api.get(`/certificates/verify/${encodeURIComponent(certificateId)}`, { params, expectedStatuses: [404] }),
  institutionSampleLink: (organizationId) =>
    api.post(`/certificates/institution-samples/${organizationId}/link`),
  download: (certificateId, certificateLanguage = 'en', params = {}) =>
    api.get(`/certificates/verify/${encodeURIComponent(certificateId)}/download`, {
      params: {
        certLang: normalizeLanguageCode(certificateLanguage) || 'en',
        ...params,
      },
      responseType: 'blob',
      timeout: 45000,
    }),
};

export const billingService = {
  getPlans: () =>
    api.get('/billing/plans'),
  getAccount: () =>
    api.get('/billing/me', { expectedStatuses: [401] }),
  switchSubscriptionContext: (payload) =>
    api.post('/billing/subscription-context', payload),
  createCheckoutSession: ({ planId, interval = 'monthly', successUrl, cancelUrl, discountCode = '', ...payload }) =>
    api.post('/billing/checkout-session', { ...payload, planId, interval, successUrl, cancelUrl, discountCode }, { timeout: 30000, expectedStatuses: [202] }),
  createLevelTestCheckoutSession: ({ successUrl, cancelUrl } = {}) =>
    api.post('/billing/level-test-checkout-session', { successUrl, cancelUrl }, { timeout: 30000, expectedStatuses: [202] }),
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
  getAdminOrganizations: () =>
    api.get('/billing/admin/organizations'),
  createOrganization: (payload) =>
    api.post('/billing/admin/organizations', payload),
  updateOrganization: (organizationId, payload) =>
    api.put(`/billing/admin/organizations/${organizationId}`, payload),
  addOrganizationMember: (organizationId, payload) =>
    api.post(`/billing/admin/organizations/${organizationId}/members`, payload),
  assignInstitutionAdmin: (organizationId, payload) =>
    api.post(`/billing/admin/organizations/${organizationId}/institution-admin`, payload),
  removeInstitutionAdmin: (organizationId, membershipId) =>
    api.delete(`/billing/admin/organizations/${organizationId}/institution-admins/${membershipId}`),
  getInstitutionalLeads: (status = '') =>
    api.get('/billing/admin/institutional-leads', { params: status ? { status } : {} }),
  updateInstitutionalLeadStatus: (leadId, status) =>
    api.put(`/billing/admin/institutional-leads/${leadId}/status`, { status }),
  getInstitutionDashboard: (organizationId = '') =>
    api.get('/billing/institution/dashboard', { params: organizationId ? { organizationId } : {}, expectedStatuses: [403] }),
  updateInstitutionProfile: (organizationId, payload) =>
    api.put(`/billing/institution/organizations/${organizationId}`, payload),
  updateInstitutionCertificateBranding: (organizationId, payload) =>
    api.put(`/billing/institution/organizations/${organizationId}/certificate-branding`, payload),
  createInstitutionGroup: (organizationId, payload) =>
    api.post(`/billing/institution/organizations/${organizationId}/groups`, payload),
  updateInstitutionGroup: (organizationId, groupId, payload) =>
    api.put(`/billing/institution/organizations/${organizationId}/groups/${groupId}`, payload),
  addInstitutionMember: (organizationId, payload) =>
    api.post(`/billing/institution/organizations/${organizationId}/members`, payload),
  updateInstitutionMember: (organizationId, membershipId, payload) =>
    api.put(`/billing/institution/organizations/${organizationId}/members/${membershipId}`, payload),
  getSeatWallet: (organizationId) =>
    api.get(`/billing/institution/organizations/${organizationId}/seat-wallet`),
  getSeatProjection: (organizationId, horizonDays = 7) =>
    api.get(`/billing/institution/organizations/${organizationId}/seat-projection`, { params: { horizonDays } }),
  getMemberSeatHistory: (organizationId, membershipId, limit = 50) =>
    api.get(`/billing/institution/organizations/${organizationId}/members/${membershipId}/seat-history`, { params: { limit } }),
  topUpInstitutionSeats: (organizationId, payload) =>
    api.post(`/billing/institution/organizations/${organizationId}/seats`, payload),
  suspendInstitutionMember: (organizationId, membershipId) =>
    api.post(`/billing/institution/organizations/${organizationId}/members/${membershipId}/suspend`),
  unsuspendInstitutionMember: (organizationId, membershipId) =>
    api.post(`/billing/institution/organizations/${organizationId}/members/${membershipId}/unsuspend`, {}, { expectedStatuses: [409] }),
  requestSeatSuspension: (organizationId, membershipId, payload) =>
    api.post(`/billing/institution/organizations/${organizationId}/members/${membershipId}/request-suspension`, payload),
  updateAutoRenew: (organizationId, payload) =>
    api.put(`/billing/institution/organizations/${organizationId}/auto-renew`, payload),
};

export const levelTestService = {
  getContexts: () =>
    api.get('/level-tests/contexts'),
  getOverview: ({ contextType = 'personal', organizationId = '', targetLanguage, nativeLanguage } = {}) => {
    const stored = getLanguageParams();
    return api.get('/level-tests/overview', {
      params: {
        contextType,
        organizationId,
        targetLang: targetLanguage || stored.targetLang,
        nativeLang: nativeLanguage || stored.nativeLang,
      },
    });
  },
  start: ({ level, mode, contextType = 'personal', organizationId = '', targetLanguage, nativeLanguage }) => {
    const stored = getLanguageParams();
    return api.post('/level-tests/start', {
      level,
      mode,
      contextType,
      organizationId,
      targetLanguage: targetLanguage || stored.targetLang,
      nativeLanguage: nativeLanguage || stored.nativeLang,
    }, { expectedStatuses: [403, 404] });
  },
  getAttempt: (attemptId) =>
    api.get(`/level-tests/attempts/${attemptId}`),
  submit: (attemptId, answers) =>
    api.post(`/level-tests/attempts/${attemptId}/submit`, { answers }),
  issueCertificate: (attemptId, payload = {}) =>
    api.post(`/level-tests/attempts/${attemptId}/certificate`, payload, { expectedStatuses: [400, 409] }),
  getInstitutionReport: (organizationId, targetLanguage) => {
    const stored = getLanguageParams();
    return api.get(`/level-tests/institution/${organizationId}/report`, {
      params: { targetLang: targetLanguage || stored.targetLang },
    });
  },
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
  getClassLessonSummaries: () => {
    const { targetLang, nativeLang } = getLanguageParams();
    return cachedGet('/class-lessons', { params: { targetLang, nativeLang, view: 'summary' } }, 60000);
  },
  getClassLesson: (classLessonId) => {
    if (!classLessonId) {
      return Promise.reject(new Error('classLessonId is required'));
    }
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get(`/class-lessons/${classLessonId}`, { params: { targetLang, nativeLang }, timeout: 30000 });
  },
  getClassLessonBootstrap: (classLessonId, { center = 0, windowSize = 8 } = {}) => {
    if (!classLessonId) {
      return Promise.reject(new Error('classLessonId is required'));
    }
    const { targetLang, nativeLang } = getLanguageParams();
    return cachedGet(`/class-lessons/${classLessonId}/bootstrap`, {
      params: { targetLang, nativeLang, center, windowSize },
      timeout: 30000,
    }, 5000);
  },
  getClassLessonItems: (classLessonId, { center = 0, windowSize = 8 } = {}) => {
    if (!classLessonId) {
      return Promise.reject(new Error('classLessonId is required'));
    }
    const { targetLang, nativeLang } = getLanguageParams();
    return cachedGet(`/class-lessons/${classLessonId}/items`, {
      params: { targetLang, nativeLang, center, windowSize },
      timeout: 30000,
    }, 30000);
  },
  preparePair: ({ targetLang, nativeLang } = {}) => {
    const stored = getLanguageParams();
    return api.post('/class-lessons/prepare-pair', {
      targetLang: targetLang || stored.targetLang,
      nativeLang: nativeLang || stored.nativeLang,
    }, { expectedStatuses: [202] });
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
    }).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/class-lessons/${classLessonId}/bootstrap`)
        || key.includes('/learning-hub/overview')
      ));
      return response;
    });
  },
};

export const learningHubService = {
  getOverview: () => {
    const { targetLang, nativeLang } = getLanguageParams();
    return cachedGet('/learning-hub/overview', { params: { targetLang, nativeLang } }, 10000);
  },
  getSavedItems: () => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get('/learning-hub/saved-items', { params: { targetLang, nativeLang } });
  },
  saveItem: (payload) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = getLanguageParams();
    return api.post('/learning-hub/saved-items', {
      ...payload,
      targetLanguage,
      nativeLanguage,
    }).then((response) => {
      invalidateCachedGets((key) => key.includes('/learning-hub/overview'));
      return response;
    });
  },
  reviewItem: (itemId, result) =>
    api.put(`/learning-hub/saved-items/${itemId}/review`, { result }).then((response) => {
      invalidateCachedGets((key) => key.includes('/learning-hub/overview'));
      return response;
    }),
  deleteItem: (itemId) =>
    api.delete(`/learning-hub/saved-items/${itemId}`).then((response) => {
      invalidateCachedGets((key) => key.includes('/learning-hub/overview'));
      return response;
    }),
  search: (query) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get('/learning-hub/search', { params: { targetLang, nativeLang, q: query } });
  },
  getPairProfile: () => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get('/learning-hub/pair-profile', { params: { targetLang, nativeLang } });
  },
  startPlacementCheck: () => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = getLanguageParams();
    return api.post('/learning-hub/placement-checks/start', { targetLanguage, nativeLanguage });
  },
  savePairProfile: (payload) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = getLanguageParams();
    return api.put('/learning-hub/pair-profile', {
      ...payload,
      targetLanguage,
      nativeLanguage,
    }).then((response) => {
      invalidateCachedGets((key) => key.includes('/learning-hub/overview'));
      return response;
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
    if (opts.scope && opts.scope !== 'all') params.scope = opts.scope;
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
  createFlashcard: (flashcardData) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.post('/flashcards', { targetLang, nativeLang, ...flashcardData });
  },
  updateFlashcard: (id, data) =>
    api.put(`/flashcards/${id}`, data),
  setCardFocus: (id, value) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.put(`/flashcards/${id}/focus`, { value, targetLang, nativeLang });
  },
  getFocusIds: () => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.get('/flashcards/focus-ids', { params: { targetLang, nativeLang } });
  },
  deleteFlashcard: (id) =>
    api.delete(`/flashcards/${id}`),
};

export const progressService = {
  getProgress: (userId) =>
    api.get(`/progress/user/${userId}`, { params: getLanguageParams() }),
  getSummary: (userId) =>
    api.get(`/progress/summary/${userId}`, { params: getLanguageParams() }),
  recordProgress: (progressData) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = getLanguageParams();
    return api.post('/progress', {
      ...progressData,
      targetLanguage,
      nativeLanguage,
    }).then((response) => {
      invalidateCachedGets((key) => key.includes('/learning-hub/overview'));
      return response;
    });
  },
};

export const userService = {
  getProfile: (userId) =>
    cachedGet(`/users/${userId}`, {}, 10000),
  updateProfile: (userId, data) =>
    api.put(`/users/${userId}`, data).then((response) => {
      invalidateCachedGets((key) => key.includes(`/users/${userId}`));
      return response;
    }),
  updateCurriculumPreference: (userId, payload) =>
    api.put(`/users/${userId}/curriculum-preference`, payload).then((response) => {
      invalidateCachedGets((key) => key.includes(`/users/${userId}`));
      return response;
    }),
  changePassword: (userId, data) =>
    api.put(`/users/${userId}/password`, data),
  deleteAccount: (userId) =>
    api.delete(`/users/${userId}`),
  saveActivityState: (userId, data) =>
    api.put(`/users/${userId}/activity-state`, data).then((response) => {
      invalidateCachedGets((key) => key.includes(`/users/${userId}/activity-state`));
      return response;
    }),
  getActivityState: (userId) =>
    cachedGet(`/users/${userId}/activity-state`, {}, 5000),
  // Resolve the current 12h-stable flashcard shuffle seed (server-side window).
  getFlashcardSeed: (userId) =>
    api.get(`/users/${userId}/flashcard-seed`),
  // Force a fresh seed and restart the 12h window (manual reshuffle).
  refreshFlashcardSeed: (userId) =>
    api.post(`/users/${userId}/flashcard-seed`),
  addXP: (userId, points) =>
    api.post(`/users/${userId}/xp`, { points }).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
      ));
      return response;
    }),
  awardXP: (userId, data) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = getLanguageParams();
    return api.post(`/users/${userId}/award-xp`, {
      ...data,
      targetLanguage,
      nativeLanguage,
    }).then(res => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
      ));
      window.dispatchEvent(new CustomEvent('xpUpdated', { detail: res.data }));
      return res;
    });
  },
  recordLearningEvent: (userId, data) => {
    const { targetLang, nativeLang } = getLanguageParams();
    return api.post(`/users/${userId}/learning-events`, {
      ...data,
      targetLanguage: targetLang,
      nativeLanguage: nativeLang,
    }).then((res) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
        || key.includes('/learning-hub/overview')
      ));
      window.dispatchEvent(new CustomEvent('xpUpdated', { detail: res.data }));
      return res;
    });
  },
  recordPeek: (userId, data) =>
    api.post(`/users/${userId}/peek`, data),
  resetXP: (userId) =>
    api.post(`/users/${userId}/reset-xp`).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
      ));
      return response;
    }),
  getXpStats: (userId) =>
    cachedGet(`/users/${userId}/xp-stats`, {}, 10000),
  toggleXpDecay: (userId, enabled) =>
    api.put(`/users/${userId}/xp-decay-mode`, { enabled }),
  getGamificationStats: (userId) =>
    cachedGet(`/users/${userId}/gamification-stats`, {}, 10000),
  claimQuestReward: (userId, questId) =>
    api.post(`/users/${userId}/claim-quest-reward`, { questId }).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
      ));
      return response;
    }),
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
    cachedGet('/ai/entitlements', {}, 10000),
  sendConversationTurn: (data) =>
    api.post('/ai/conversation', data, { timeout: 60000 }),
};

export const curriculumV2Service = {
  listLessons: () => api.get('/curriculum/v2/lessons'),
  getLesson: (id) => api.get(`/curriculum/v2/lessons/${encodeURIComponent(id)}`),
  getPlan: (params = {}) => api.get('/curriculum/v2/plan', { params }),
  markComplete: (id) => api.post(`/curriculum/v2/lessons/${encodeURIComponent(id)}/complete`),
  getProgress: () => api.get('/curriculum/v2/progress'),
  evaluateProduction: ({ lessonId, drillIndex, fillerConceptId, learnerText }) =>
    api.post('/curriculum/v2/feedback',
      { lessonId, drillIndex, fillerConceptId, learnerText },
      { timeout: 30000 }),
  evaluatePronunciation: ({ target, transcript }) =>
    api.post('/curriculum/v2/pronunciation-check',
      { target, transcript },
      { timeout: 30000 }),
  recordSrsReview: ({ conceptId, conceptKind, skill, outcome, targetLang }) =>
    api.post('/curriculum/v2/srs/review',
      { conceptId, conceptKind, skill, outcome, targetLang },
      { timeout: 10000 }),
  recordEvent: ({ conceptId, lessonId, lessonType, outcome, hintUsed, latencyMs, sessionId, targetLang, contextSignal }) =>
    api.post('/curriculum/v2/events',
      { conceptId, lessonId, lessonType, outcome, hintUsed, latencyMs, sessionId, targetLang, contextSignal },
      { timeout: 5000 }),
  // Korean alphabet (script) onboarding — backend routes unchanged
  getAlphabetGroups: () => api.get('/curriculum/v2/hangul/groups'),
  getAlphabetProgress: () => api.get('/curriculum/v2/hangul/progress'),
  completeAlphabetGroup: (groupId) =>
    api.post(`/curriculum/v2/hangul/groups/${encodeURIComponent(groupId)}/complete`),
  skipAlphabet: () => api.post('/curriculum/v2/hangul/skip'),
  // Catalog (Phase 3)
  getCatalog: (params = {}) => api.get('/curriculum/v2/catalog', { params }),
  getConceptLessons: (conceptId, params = {}) =>
    api.get(`/curriculum/v2/concepts/${encodeURIComponent(conceptId)}/lessons`, { params, expectedStatuses: [404] }),
  // Server-side ASR (Whisper)
  getAsrStatus: () => api.get('/curriculum/v2/asr/status'),
  transcribeAudio: ({ audioBase64, mimeType = 'audio/webm', language = 'ko', prompt = '' }) =>
    api.post('/curriculum/v2/asr/transcribe',
      { audioBase64, mimeType, language, prompt },
      { timeout: 35000, expectedStatuses: [400, 429, 502, 503] }),
};

export default api;
