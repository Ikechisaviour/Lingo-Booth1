import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15-second timeout to avoid hanging requests
});

const clearSession = () => {
  [
    'token',
    'refreshToken',
    'userId',
    'username',
    'userRole',
    'guestMode',
    'emailVerified',
    'needsLanguageSetup',
  ].forEach((key) => localStorage.removeItem(key));
};

const isCurrentUserProfileRequest = (config) => {
  const userId = localStorage.getItem('userId');
  if (!userId || !config?.url) return false;
  const url = config.url.split('?')[0];
  return url === `/users/${userId}` || url.startsWith(`/users/${userId}/`);
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Track whether a token refresh is in progress to avoid concurrent refreshes
let refreshPromise = null;

// Retry logic for network errors and 5xx server errors + auto-refresh on 401
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
                return newToken;
              })
              .finally(() => { refreshPromise = null; });
          }
          const newToken = await refreshPromise;
          config.headers.Authorization = `Bearer ${newToken}`;
          return api(config);
        } catch {
          // Refresh failed — force logout
          clearSession();
          window.dispatchEvent(new CustomEvent('accountSuspended'));
          return Promise.reject(error);
        }
      }
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

export const lessonService = {
  getLessons: (category, difficulty) => {
    const targetLang = localStorage.getItem('targetLanguage') || '';
    const nativeLang = localStorage.getItem('nativeLanguage') || '';
    return api.get('/lessons', { params: { category, difficulty, targetLang, nativeLang } });
  },
  getLesson: (id) => {
    const nativeLang = localStorage.getItem('nativeLanguage') || '';
    return api.get(`/lessons/${id}`, { params: { nativeLang }, timeout: 30000 });
  },
  createLesson: (lessonData) =>
    api.post('/lessons', lessonData),
};

export const flashcardService = {
  getCategories: () => {
    const targetLang = localStorage.getItem('targetLanguage') || '';
    const nativeLang = localStorage.getItem('nativeLanguage') || '';
    return api.get('/flashcards/categories', { params: { targetLang, nativeLang } });
  },
  getCategoryCards: (category) => {
    const targetLang = localStorage.getItem('targetLanguage') || '';
    const nativeLang = localStorage.getItem('nativeLanguage') || '';
    return api.get('/flashcards/category-cards', { params: { targetLang, nativeLang, category } });
  },
  getFlashcards: (userId, page = 1, limit = 50, opts = {}) => {
    const targetLang = localStorage.getItem('targetLanguage') || '';
    const nativeLang = localStorage.getItem('nativeLanguage') || '';
    const params = { targetLang, nativeLang, page, limit };
    if (opts.categories) params.categories = opts.categories;
    if (opts.shuffle !== undefined) params.shuffle = opts.shuffle;
    if (opts.seed !== undefined) params.seed = opts.seed;
    return api.get(`/flashcards/user/${userId}`, { params });
  },
  getGuestFlashcards: (page = 1, limit = 50, opts = {}) => {
    const nativeLang = localStorage.getItem('nativeLanguage') || '';
    const targetLang = localStorage.getItem('targetLanguage') || '';
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
  getUserFlashcards: () =>
    api.get('/admin/flashcards'),
  deleteFlashcard: (flashcardId) =>
    api.delete(`/admin/flashcards/${flashcardId}`),
  getGuests: (page = 1) =>
    api.get(`/admin/guests?page=${page}`),
};

export default api;
