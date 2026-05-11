import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';
import { reportApiError } from './errorReporter';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

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
    reportApiError(error);
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

export const quizService = {
  getQuizzes: (category?: string, difficulty?: string) => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    const targetLang = targetLanguage;
    const nativeLang = nativeLanguage;
    return api.get('/quiz', { params: { category, difficulty, targetLang, nativeLang } });
  },
  getQuiz: (quizId: string) => {
    const nativeLang = useSettingsStore.getState().nativeLanguage;
    return api.get(`/quiz/${quizId}`, { params: { nativeLang }, timeout: 30000 });
  },
};

export const classLessonService = {
  getClassLessons: () => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    return api.get('/class-lessons', { params: { targetLang: targetLanguage, nativeLang: nativeLanguage } });
  },
  getClassLesson: (classLessonId: string) => {
    const nativeLang = useSettingsStore.getState().nativeLanguage;
    return api.get(`/class-lessons/${classLessonId}`, { params: { nativeLang }, timeout: 30000 });
  },
  getProgress: (classLessonId: string) => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    return api.get(`/class-lessons/${classLessonId}/progress`, { params: { targetLang: targetLanguage, nativeLang: nativeLanguage } });
  },
  saveProgress: (classLessonId: string, progress: Record<string, any>) => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    return api.put(`/class-lessons/${classLessonId}/progress`, {
      ...progress,
      targetLanguage,
      nativeLanguage,
      source: 'mobile',
    });
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

export const flashcardService = {
  getCategories: () => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    return api.get('/flashcards/categories', { params: { targetLang: targetLanguage, nativeLang: nativeLanguage } });
  },
  getCategoryCards: (category: string) => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    return api.get('/flashcards/category-cards', { params: { targetLang: targetLanguage, nativeLang: nativeLanguage, category } });
  },
  getFlashcards: (userId: string, page = 1, limit = 50, opts: { categories?: string; shuffle?: boolean; seed?: number } = {}) => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    const params: Record<string, any> = { targetLang: targetLanguage, nativeLang: nativeLanguage, page, limit };
    if (opts.categories) params.categories = opts.categories;
    if (opts.shuffle !== undefined) params.shuffle = opts.shuffle;
    if (opts.seed !== undefined) params.seed = opts.seed;
    return api.get(`/flashcards/user/${userId}`, { params });
  },
  getGuestFlashcards: (page = 1, limit = 50, opts: { categories?: string; shuffle?: boolean; seed?: number } = {}) => {
    const { nativeLanguage, targetLanguage } = useSettingsStore.getState();
    const params: Record<string, any> = { nativeLang: nativeLanguage, targetLang: targetLanguage, page, limit };
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
    api.get(`/progress/user/${userId}`),
  getSummary: (userId: string) =>
    api.get(`/progress/summary/${userId}`),
  recordProgress: (progressData: object) =>
    api.post('/progress', progressData),
};

export const userService = {
  getProfile: (userId: string) =>
    api.get(`/users/${userId}`),
  updateProfile: (userId: string, data: object) =>
    api.put(`/users/${userId}`, data),
  changePassword: (userId: string, data: object) =>
    api.put(`/users/${userId}/password`, data),
  deleteAccount: (userId: string) =>
    api.delete(`/users/${userId}`),
  saveActivityState: (userId: string, data: object) =>
    api.put(`/users/${userId}/activity-state`, data),
  getActivityState: (userId: string) =>
    api.get(`/users/${userId}/activity-state`),
  addXP: (userId: string, points: number) =>
    api.post(`/users/${userId}/xp`, { points }),
  awardXP: (userId: string, data: object) =>
    api.post(`/users/${userId}/award-xp`, data),
  recordPeek: (userId: string, data: object) =>
    api.post(`/users/${userId}/peek`, data),
  resetXP: (userId: string) =>
    api.post(`/users/${userId}/reset-xp`),
  getXpStats: (userId: string) =>
    api.get(`/users/${userId}/xp-stats`),
  toggleXpDecay: (userId: string, enabled: boolean) =>
    api.put(`/users/${userId}/xp-decay-mode`, { enabled }),
  getGamificationStats: (userId: string) =>
    api.get(`/users/${userId}/gamification-stats`),
  claimQuestReward: (userId: string, questId: string) =>
    api.post(`/users/${userId}/claim-quest-reward`, { questId }),
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
  sendSpeakingDemoTurn: (data: object) =>
    api.post('/admin/speaking-demo/conversation', data, { timeout: 60000 }),
  sendLocalSpeakingDemoTurn: (data: object) =>
    api.post('/admin/local-demo/speaking-demo/conversation', data, { timeout: 60000 }),
};

export const aiService = {
  getEntitlements: () =>
    api.get('/ai/entitlements'),
  sendConversationTurn: (data: object) =>
    api.post('/ai/conversation', data, { timeout: 60000 }),
};

export default api;
