import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';
import { normalizeLanguageCode } from '../utils/languagePairPolicy';
import { reportApiError } from './errorReporter';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

const getCache = new Map<string, { expiresAt: number; promise: Promise<any> }>();

const stableSerialize = (value: any): string => {
  if (!value || typeof value !== 'object') return JSON.stringify(value ?? null);
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`).join(',')}}`;
};

const cachedGet = (url: string, config: any = {}, ttlMs = 10000) => {
  const key = `${url}|${stableSerialize(config.params || {})}`;
  const now = Date.now();
  const cached = getCache.get(key);
  if (cached && cached.expiresAt > now) return cached.promise;
  const promise = api.get(url, config).catch((error) => {
    getCache.delete(key);
    throw error;
  });
  getCache.set(key, { expiresAt: now + ttlMs, promise });
  return promise;
};

const invalidateCachedGets = (predicate: (key: string) => boolean) => {
  Array.from(getCache.keys()).forEach((key) => {
    if (predicate(key)) getCache.delete(key);
  });
};

const currentLanguageParams = () => {
  const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
  return {
    targetLang: normalizeLanguageCode(targetLanguage),
    nativeLang: normalizeLanguageCode(nativeLanguage),
  };
};

const DEVICE_ID_KEY = 'lingoDeviceId';
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

// Attach JWT token to every request
api.interceptors.request.use(async (config) => {
  config.headers = config.headers || {};
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-Lingo-Device-Id'] = await getDeviceId();
  return config;
});

// Track whether a token refresh is already in progress to avoid concurrent refreshes
let refreshPromise: Promise<string> | null = null;

const isExpectedStatus = (config: any, status?: number) => {
  const expected = config?.expectedStatuses;
  return Array.isArray(expected) && status != null && expected.includes(status);
};

// Retry logic for GET 5xx / network errors + auto-refresh on 401 + suspension detection
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Auto-refresh on 401 (expired access token)
    if (
      error.response?.status === 401 &&
      config &&
      !config._refreshed &&
      !config.url?.includes('/auth/refresh') &&
      !config.url?.includes('/auth/login') &&
      !config.url?.includes('/auth/register')
    ) {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        config._refreshed = true;
        try {
          // Deduplicate concurrent refresh calls
          if (!refreshPromise) {
            refreshPromise = axios
              .post(`${API_URL}/auth/refresh`, { refreshToken })
              .then((res) => {
                const newToken = res.data.token;
                useAuthStore.getState().setToken(newToken);
                return newToken;
              })
              .finally(() => { refreshPromise = null; });
          }
          const newToken = await refreshPromise;
          config.headers.Authorization = `Bearer ${newToken}`;
          return api(config);
        } catch {
          // Refresh failed — force logout
          reportApiError(error, { phase: 'auth-refresh-failed' });
          useAuthStore.getState().logout();
          error._forcedLogout = true;
          return Promise.reject(error);
        }
      }
    }

    // Retry GET 5xx / network errors
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
      useAuthStore.getState().token
    ) {
      useAuthStore.getState().logout();
      error._forcedLogout = true;
    }
    // Detect deleted current account only from the current user's profile endpoints.
    const currentUserId = useAuthStore.getState().userId;
    const cleanUrl = String(config?.url || '').split('?')[0];
    if (
      error.response?.status === 404 &&
      currentUserId &&
      (cleanUrl === `/users/${currentUserId}` || cleanUrl.startsWith(`/users/${currentUserId}/`)) &&
      useAuthStore.getState().token
    ) {
      useAuthStore.getState().logout();
      error._forcedLogout = true;
    }
    if (!isExpectedStatus(config, error.response?.status)) {
      reportApiError(error);
    }
    return Promise.reject(error);
  },
);

// --- Service objects ---

export const authService = {
  register: (username: string, email: string, password: string, guestXP: number, nativeLanguage: string, targetLanguage: string) =>
    api.post('/auth/register', { username, email, password, guestXP, nativeLanguage, targetLanguage }),
  login: (email: string, password: string, guestXP: number) =>
    api.post('/auth/login', { email, password, guestXP }),
  trackActivity: (userId: string, timeSpent: number) =>
    api.post('/auth/activity', { userId, timeSpent }),
  guestActivity: (data: object) =>
    api.post('/auth/guest-activity', data),
  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email/${token}`),
  googleLogin: (credential: string, guestXP: number, nativeLanguage: string, targetLanguage: string) =>
    api.post('/auth/google', { credential, guestXP, nativeLanguage, targetLanguage }),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  resendVerification: () =>
    api.post('/auth/resend-verification'),
};

export const contactService = {
  sendMessage: (message: Record<string, any>) =>
    api.post('/contact', { ...message, source: message.source || 'mobile' }, { timeout: 30000 }),
};

export const quizService = {
  getQuizzes: (category?: string, difficulty?: string) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get('/quiz', { params: { category, difficulty, targetLang, nativeLang } });
  },
  getQuiz: (quizId: string) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get(`/quiz/${quizId}`, {
      params: { targetLang, nativeLang },
      timeout: 30000,
    });
  },
};

export const classLessonService = {
  getClassLessons: () => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get('/class-lessons', { params: { targetLang, nativeLang } });
  },
  getClassLessonSummaries: () => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return cachedGet('/class-lessons', { params: { targetLang, nativeLang, view: 'summary' } }, 60000);
  },
  getClassLesson: (classLessonId: string) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get(`/class-lessons/${classLessonId}`, {
      params: { targetLang, nativeLang },
      timeout: 30000,
    });
  },
  getClassLessonBootstrap: (classLessonId: string, { center = 0, windowSize = 8 } = {}) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return cachedGet(`/class-lessons/${classLessonId}/bootstrap`, {
      params: { targetLang, nativeLang, center, windowSize },
      timeout: 30000,
    }, 5000);
  },
  getClassLessonItems: (classLessonId: string, { center = 0, windowSize = 8 } = {}) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return cachedGet(`/class-lessons/${classLessonId}/items`, {
      params: { targetLang, nativeLang, center, windowSize },
      timeout: 30000,
    }, 30000);
  },
  preparePair: ({ targetLang, nativeLang }: { targetLang?: string; nativeLang?: string } = {}) => {
    const stored = currentLanguageParams();
    return api.post('/class-lessons/prepare-pair', {
      targetLang: targetLang || stored.targetLang,
      nativeLang: nativeLang || stored.nativeLang,
    }, { expectedStatuses: [202] } as any);
  },
  getProgress: (classLessonId: string) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get(`/class-lessons/${classLessonId}/progress`, { params: { targetLang, nativeLang } });
  },
  saveProgress: (classLessonId: string, progress: Record<string, any>) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = currentLanguageParams();
    return api.put(`/class-lessons/${classLessonId}/progress`, {
      ...progress,
      targetLanguage,
      nativeLanguage,
      source: 'mobile',
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
    const { targetLang, nativeLang } = currentLanguageParams();
    return cachedGet('/learning-hub/overview', { params: { targetLang, nativeLang } }, 10000);
  },
  getSavedItems: () => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get('/learning-hub/saved-items', { params: { targetLang, nativeLang } });
  },
  saveItem: (payload: Record<string, any>) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = currentLanguageParams();
    return api.post('/learning-hub/saved-items', {
      ...payload,
      targetLanguage,
      nativeLanguage,
    }).then((response) => {
      invalidateCachedGets((key) => key.includes('/learning-hub/overview'));
      return response;
    });
  },
  reviewItem: (itemId: string, result: 'again' | 'hard' | 'good' | 'easy') =>
    api.put(`/learning-hub/saved-items/${itemId}/review`, { result }).then((response) => {
      invalidateCachedGets((key) => key.includes('/learning-hub/overview'));
      return response;
    }),
  deleteItem: (itemId: string) =>
    api.delete(`/learning-hub/saved-items/${itemId}`).then((response) => {
      invalidateCachedGets((key) => key.includes('/learning-hub/overview'));
      return response;
    }),
  search: (query: string) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get('/learning-hub/search', { params: { targetLang, nativeLang, q: query } });
  },
  getPairProfile: () => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get('/learning-hub/pair-profile', { params: { targetLang, nativeLang } });
  },
  savePairProfile: (payload: Record<string, any>) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = currentLanguageParams();
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

export const certificateService = {
  list: () =>
    api.get('/certificates'),
  verify: (certificateId: string) =>
    api.get(`/certificates/verify/${certificateId}`),
  getClassLessonStatus: (classLessonId: string) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get(`/certificates/class-lessons/${classLessonId}/status`, {
      params: { targetLang, nativeLang },
    });
  },
  issueClassLessonCertificate: (classLessonId: string, payload: Record<string, any> = {}) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = currentLanguageParams();
    return api.post(`/certificates/class-lessons/${classLessonId}/issue`, {
      ...payload,
      targetLanguage,
      nativeLanguage,
    }, { expectedStatuses: [402] } as any);
  },
};

export const practiceContextService = {
  analyze: (data: { transcript: string; nativeLanguage: string; targetLanguage: string; source?: 'web' | 'mobile' }) =>
    api.post('/practice-context/analyze', { ...data, source: data.source || 'mobile' }, { timeout: 30000 }),
  save: (context: Record<string, any>) =>
    api.post('/practice-context', { ...context, source: context.source || 'mobile' }),
  list: (targetLanguage?: string) =>
    api.get('/practice-context', { params: { targetLanguage } }),
  recommendations: (targetLanguage?: string) =>
    api.get('/practice-context/recommendations', { params: { targetLanguage } }),
  delete: (contextId: string) =>
    api.delete(`/practice-context/${contextId}`),
};

export const billingService = {
  getPlans: () =>
    api.get('/billing/plans'),
  getAccount: () =>
    api.get('/billing/me'),
  verifyMobilePurchase: (payload: { platform: 'ios' | 'android'; planId: string; productId?: string; transactionId?: string; receipt?: string; purchaseToken?: string }) =>
    api.post('/billing/mobile/verify', payload, { timeout: 30000 }),
  sendInstitutionalInquiry: (payload: Record<string, any>) =>
    api.post('/billing/institutional-inquiry', { ...payload, source: 'mobile' }, { timeout: 30000 }),
  getInstitutionDashboard: (organizationId = '') =>
    api.get('/billing/institution/dashboard', { params: organizationId ? { organizationId } : {} }),
  addInstitutionMember: (organizationId: string, payload: Record<string, any>) =>
    api.post(`/billing/institution/organizations/${organizationId}/members`, payload),
  updateInstitutionMember: (organizationId: string, membershipId: string, payload: Record<string, any>) =>
    api.put(`/billing/institution/organizations/${organizationId}/members/${membershipId}`, payload),
};

export const flashcardService = {
  getCategories: () => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get('/flashcards/categories', { params: { targetLang, nativeLang } });
  },
  getCategoryCards: (category: string) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.get('/flashcards/category-cards', { params: { targetLang, nativeLang, category } });
  },
  getFlashcards: (userId: string, page = 1, limit = 50, opts: { categories?: string; shuffle?: boolean; seed?: number } = {}) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    const params: Record<string, any> = { targetLang, nativeLang, page, limit };
    if (opts.categories) params.categories = opts.categories;
    if (opts.shuffle !== undefined) params.shuffle = opts.shuffle;
    if (opts.seed !== undefined) params.seed = opts.seed;
    return api.get(`/flashcards/user/${userId}`, { params });
  },
  getGuestFlashcards: (page = 1, limit = 50, opts: { categories?: string; shuffle?: boolean; seed?: number } = {}) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    const params: Record<string, any> = { nativeLang, targetLang, page, limit };
    if (opts.categories) params.categories = opts.categories;
    if (opts.shuffle !== undefined) params.shuffle = opts.shuffle;
    if (opts.seed !== undefined) params.seed = opts.seed;
    return api.get('/flashcards/guest', { params });
  },
  createFlashcard: (flashcardData: object) =>
    api.post('/flashcards', flashcardData),
  updateFlashcard: (id: string, data: object) =>
    api.put(`/flashcards/${id}`, data),
  deleteFlashcard: (id: string) =>
    api.delete(`/flashcards/${id}`),
};

export const progressService = {
  getProgress: (userId: string) =>
    api.get(`/progress/user/${userId}`, { params: currentLanguageParams() }),
  getSummary: (userId: string) =>
    api.get(`/progress/summary/${userId}`, { params: currentLanguageParams() }),
  recordProgress: (progressData: object) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = currentLanguageParams();
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
  getProfile: (userId: string) =>
    cachedGet(`/users/${userId}`, {}, 10000),
  updateProfile: (userId: string, data: object) =>
    api.put(`/users/${userId}`, data).then((response) => {
      invalidateCachedGets((key) => key.includes(`/users/${userId}`));
      return response;
    }),
  changePassword: (userId: string, data: object) =>
    api.put(`/users/${userId}/password`, data),
  deleteAccount: (userId: string) =>
    api.delete(`/users/${userId}`),
  saveActivityState: (userId: string, data: object) =>
    api.put(`/users/${userId}/activity-state`, data).then((response) => {
      invalidateCachedGets((key) => key.includes(`/users/${userId}/activity-state`));
      return response;
    }),
  getActivityState: (userId: string) =>
    cachedGet(`/users/${userId}/activity-state`, {}, 5000),
  addXP: (userId: string, points: number) =>
    api.post(`/users/${userId}/xp`, { points }).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
      ));
      return response;
    }),
  awardXP: (userId: string, data: object) => {
    const { targetLang: targetLanguage, nativeLang: nativeLanguage } = currentLanguageParams();
    return api.post(`/users/${userId}/award-xp`, {
      ...data,
      targetLanguage,
      nativeLanguage,
    }).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
      ));
      return response;
    });
  },
  recordLearningEvent: (userId: string, data: object) => {
    const { targetLang, nativeLang } = currentLanguageParams();
    return api.post(`/users/${userId}/learning-events`, {
      ...data,
      targetLanguage: targetLang,
      nativeLanguage: nativeLang,
    }).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
        || key.includes('/learning-hub/overview')
      ));
      return response;
    });
  },
  recordPeek: (userId: string, data: object) =>
    api.post(`/users/${userId}/peek`, data),
  resetXP: (userId: string) =>
    api.post(`/users/${userId}/reset-xp`).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
      ));
      return response;
    }),
  getXpStats: (userId: string) =>
    cachedGet(`/users/${userId}/xp-stats`, {}, 10000),
  toggleXpDecay: (userId: string, enabled: boolean) =>
    api.put(`/users/${userId}/xp-decay-mode`, { enabled }),
  getGamificationStats: (userId: string) =>
    cachedGet(`/users/${userId}/gamification-stats`, {}, 10000),
  claimQuestReward: (userId: string, questId: string) =>
    api.post(`/users/${userId}/claim-quest-reward`, { questId }).then((response) => {
      invalidateCachedGets((key) => (
        key.includes(`/users/${userId}/xp-stats`)
        || key.includes(`/users/${userId}/gamification-stats`)
      ));
      return response;
    }),
  getLeaderboard: (userId: string) =>
    api.get(`/users/${userId}/leaderboard`),
};

export const ttsService = {
  speak: (text: string, lang: string, voice?: string, rate?: string) =>
    api.post('/tts', { text, lang, voice, rate }, { responseType: 'arraybuffer' }),
  getVoices: (lang?: string) =>
    api.get('/tts/voices', { params: lang ? { lang } : {} }),
  buildSpeakUrl: (text: string, lang: string, voice?: string, rate?: string): string => {
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
  getUser: (userId: string) =>
    api.get(`/admin/users/${userId}`),
  suspendUser: (userId: string, reason: string) =>
    api.put(`/admin/users/${userId}/suspend`, { reason }),
  unsuspendUser: (userId: string) =>
    api.put(`/admin/users/${userId}/unsuspend`),
  updateUserRole: (userId: string, role: string) =>
    api.put(`/admin/users/${userId}/role`, { role }),
  deleteUser: (userId: string) =>
    api.delete(`/admin/users/${userId}`),
  getUserFlashcards: () =>
    api.get('/admin/flashcards'),
  deleteFlashcard: (flashcardId: string) =>
    api.delete(`/admin/flashcards/${flashcardId}`),
  getGuests: (page = 1) =>
    api.get(`/admin/guests?page=${page}`),
  getErrorReports: ({ page = 1, status = 'open', severity = '', source = '' } = {}) =>
    api.get('/admin/error-reports', { params: { page, status, severity, source } }),
  acknowledgeErrorReport: (reportId: string) =>
    api.put(`/admin/error-reports/${reportId}/acknowledge`),
  clearOpenErrorReports: () =>
    api.put('/admin/error-reports/clear-open'),
  getContactMessages: ({ page = 1, status = 'open', senderType = 'all' } = {}) =>
    api.get('/admin/contact-messages', { params: { page, status, senderType } }),
  acknowledgeContactMessage: (messageId: string) =>
    api.put(`/admin/contact-messages/${messageId}/acknowledge`),
  clearOpenContactMessages: () =>
    api.put('/admin/contact-messages/clear-open'),
  sendSpeakingDemoTurn: (data: object) =>
    api.post('/admin/speaking-demo/conversation', data, { timeout: 60000 }),
  sendLocalSpeakingDemoTurn: (data: object) =>
    api.post('/admin/local-demo/speaking-demo/conversation', data, { timeout: 60000 }),
};

export const aiService = {
  getEntitlements: () =>
    cachedGet('/ai/entitlements', {}, 10000),
  sendConversationTurn: (data: object) =>
    api.post('/ai/conversation', data, { timeout: 60000 }),
};

export default api;
