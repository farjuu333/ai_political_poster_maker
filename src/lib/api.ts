import axios, { AxiosInstance } from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create a configured Axios instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach JWT token if stored
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Optional: Handle token expiry, e.g. localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Auth API helper functions
export const authService = {
  register: async (userData: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    role?: 'user' | 'admin' | 'designer';
  }) => {
    const res = await api.post('/auth/register', userData);
    if (res.data.token && typeof window !== 'undefined') {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  },

  login: async (credentials: {
    identifier?: string;
    email?: string;
    phone?: string;
    password: string;
  }) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data.token && typeof window !== 'undefined') {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  checkHealth: async () => {
    const res = await api.get('/health');
    return res.data;
  },
};

// Poster Generation & Retrieval helper functions
export const posterService = {
  getTemplates: async () => {
    const res = await api.get('/posters/templates');
    return res.data;
  },

  generatePoster: async (formDataPayload: FormData | Record<string, any>) => {
    const isFormData = typeof FormData !== 'undefined' && formDataPayload instanceof FormData;
    const res = await api.post('/posters', formDataPayload, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' },
    });
    return res.data;
  },

  getPosterById: async (id: string) => {
    const res = await api.get(`/posters/${id}`);
    return res.data;
  },

  getUserPosters: async (userId: string) => {
    const res = await api.get(`/posters/user/${userId}`);
    return res.data;
  },

  listPosters: async (page = 1, limit = 12) => {
    const res = await api.get(`/posters?page=${page}&limit=${limit}`);
    return res.data;
  },
};

export default api;
