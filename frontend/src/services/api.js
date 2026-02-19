import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15-second timeout to avoid hanging requests
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Retry logic for network errors and 5xx server errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
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
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      localStorage.removeItem('guestMode');
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
  register: (username, email, password, guestXP) =>
    api.post('/auth/register', { username, email, password, guestXP }),
  login: (email, password, guestXP) =>
    api.post('/auth/login', { email, password, guestXP }),
  trackActivity: (userId, timeSpent) =>
    api.post('/auth/activity', { userId, timeSpent }),
};

export const lessonService = {
  getLessons: (category, difficulty) =>
    api.get('/lessons', { params: { category, difficulty } }),
  getLesson: (id) =>
    api.get(`/lessons/${id}`),
  createLesson: (lessonData) =>
    api.post('/lessons', lessonData),
};

export const flashcardService = {
  getFlashcards: (userId) =>
    api.get(`/flashcards/user/${userId}`),
  getGuestFlashcards: () =>
    api.get('/flashcards/guest'),
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
};

export default api;
