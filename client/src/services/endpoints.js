import api from './api';

export const userAPI = {
  createProfile: (data) => api.post('/users/profile', data),
  getProfile: (clerkId) => api.get(`/users/profile/${clerkId}`),
  updateProfile: (data) => api.put('/users/profile', data),
  getMe: () => api.get('/users/me'),
};

export const symptomAPI = {
  getAll: (params) => api.get('/symptoms', { params }),
  getById: (id) => api.get(`/symptoms/${id}`),
  search: (query) => api.get('/symptoms', { params: { search: query } }),
};

export const diseaseAPI = {
  getAll: (params) => api.get('/diseases', { params }),
  getById: (id) => api.get(`/diseases/${id}`),
  getCommon: () => api.get('/diseases', { params: { commonInKenya: true } }),
};

export const facilityAPI = {
  getAll: (params) => api.get('/facilities', { params }),
  getById: (id) => api.get(`/facilities/${id}`),
  getByCounty: (county) => api.get('/facilities', { params: { county } }),
};

export const assessmentAPI = {
  create: (data) => api.post('/assessments', data),
  getHistory: () => api.get('/assessments/history'),
  getStats: () => api.get('/assessments/stats'),
};