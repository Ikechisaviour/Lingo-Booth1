import axios from 'axios';
import { API_URL } from '../config/api';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Retry logic for GET 5xx / network errors + mid-session suspension detection
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
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
};

export const lessonService = {
  getLessons: (category?: string, difficulty?: string) => {
    const targetLang = useSettingsStore.getState().targetLanguage || 'ko';
    return api.get('/lessons', { params: { category, difficulty, targetLang } });
  },
  getLesson: (id: string) => {
    const nativeLang = useSettingsStore.getState().nativeLanguage || 'en';
    return api.get(`/lessons/${id}`, { params: { nativeLang }, timeout: 30000 });
  },
  createLesson: (lessonData: object) =>
    api.post('/lessons', lessonData),
};

export const flashcardService = {
  getCategories: () => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    return api.get('/flashcards/categories', { params: { targetLang: targetLanguage || 'ko', nativeLang: nativeLanguage || 'en' } });
  },
  getCategoryCards: (category: string) => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    return api.get('/flashcards/category-cards', { params: { targetLang: targetLanguage || 'ko', nativeLang: nativeLanguage || 'en', category } });
  },
  getFlashcards: (userId: string, page = 1, limit = 50, opts: { categories?: string; shuffle?: boolean; seed?: number } = {}) => {
    const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
    const params: Record<string, any> = { targetLang: targetLanguage || 'ko', nativeLang: nativeLanguage || 'en', page, limit };
    if (opts.categories) params.categories = opts.categories;
    if (opts.shuffle !== undefined) params.shuffle = opts.shuffle;
    if (opts.seed !== undefined) params.seed = opts.seed;
    return api.get(`/flashcards/user/${userId}`, { params });
  },
  getGuestFlashcards: (page = 1, limit = 50, opts: { categories?: string; shuffle?: boolean; seed?: number } = {}) => {
    const { nativeLanguage, targetLanguage } = useSettingsStore.getState();
    const params: Record<string, any> = { nativeLang: nativeLanguage || 'en', targetLang: targetLanguage || 'ko', page, limit };
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
};

export default api;
