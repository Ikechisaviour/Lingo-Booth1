import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
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
