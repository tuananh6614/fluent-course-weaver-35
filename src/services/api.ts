
import axios from 'axios';
import { toast } from "sonner";

// Base API URL - change this to match your backend server address
const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = 
      error.response?.data?.message || 
      'Đã xảy ra lỗi. Vui lòng thử lại sau.';
    
    toast.error('Lỗi', {
      description: message,
    });
    
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },
  
  register: async (full_name: string, email: string, password: string) => {
    const response = await api.post('/register', { full_name, email, password });
    return response.data;
  },
  
  forgotPassword: async (email: string) => {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Course services
export const courseService = {
  getAllCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },
  
  getCourseById: async (id: string | number) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  
  enrollCourse: async (courseId: string | number) => {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  },
  
  getEnrolledCourses: async () => {
    const response = await api.get('/enrollments');
    return response.data;
  },
  
  getChapterLessons: async (chapterId: string | number) => {
    const response = await api.get(`/chapters/${chapterId}/lessons`);
    return response.data;
  },
  
  getCertificate: async (id: string | number) => {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  },
};

export default api;
