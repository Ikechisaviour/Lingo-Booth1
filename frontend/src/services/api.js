import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Detect mid-session suspension: when a logged-in user's API call returns 403 "Account suspended"
api.interceptors.response.use(
  (response) => response,
  (error) => {
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

export const authService = {
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
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
    api.post(`/users/${userId}/award-xp`, data),
  recordPeek: (userId, data) =>
    api.post(`/users/${userId}/peek`, data),
  resetXP: (userId) =>
    api.post(`/users/${userId}/reset-xp`),
  getXpStats: (userId) =>
    api.get(`/users/${userId}/xp-stats`),
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
