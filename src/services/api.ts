
import axios from 'axios';
import { toast } from "sonner";

// Base API URL - change this to match your backend server address
// Use an environment variable if available, or fallback to a default URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add a timeout to avoid hanging requests
  timeout: 10000,
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
    console.error('API Error:', error);
    
    // Get an appropriate error message
    let message = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
    
    if (error.code === 'ERR_NETWORK') {
      message = 'Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.';
    } else if (error.response?.data?.message) {
      message = error.response.data.message;
    }
    
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

  updateProfile: async (data: { full_name: string, phone?: string, bio?: string }) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  changePassword: async (data: { currentPassword: string, newPassword: string }) => {
    const response = await api.put('/users/change-password', data);
    return response.data;
  },
};

// Course services
export const courseService = {
  getAllCourses: async () => {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching all courses:', error);
      // Return empty data structure to prevent UI errors
      return { success: false, data: [] };
    }
  },
  
  getCourseById: async (id: string | number) => {
    try {
      if (!id) throw new Error('Course ID is required');
      
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course details:', error);
      throw error;
    }
  },
  
  enrollCourse: async (courseId: string | number) => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      console.error(`Error enrolling in course ${courseId}:`, error);
      throw error;
    }
  },
  
  getEnrolledCourses: async () => {
    try {
      const response = await api.get('/enrollments');
      return response.data;
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      // Return empty data structure to prevent UI errors
      return { success: false, data: [] };
    }
  },
  
  getChapterLessons: async (chapterId: string | number) => {
    try {
      if (!chapterId) throw new Error('Chapter ID is required');
      
      const response = await api.get(`/chapters/${chapterId}/lessons`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching lessons for chapter ${chapterId}:`, error);
      // Return empty data structure to prevent UI errors
      return { success: false, data: [] };
    }
  },

  getLesson: async (lessonId: string | number) => {
    try {
      const response = await api.get(`/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching lesson ${lessonId}:`, error);
      throw error;
    }
  },

  updateProgress: async (courseId: string | number, data: { progress_percent: number, current_lesson_id?: number }) => {
    try {
      const response = await api.put(`/enrollments/${courseId}/progress`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating progress for course ${courseId}:`, error);
      throw error;
    }
  },
};

// Certificate services
export const certificateService = {
  getCertificate: async (id: string | number) => {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  },

  generateCertificate: async (courseId: string | number) => {
    const response = await api.post(`/certificates/generate/${courseId}`);
    return response.data;
  },

  verifyCertificate: async (certificateNumber: string) => {
    const response = await api.get(`/certificates/verify/${certificateNumber}`);
    return response.data;
  },
};

// Exam services
export const examService = {
  getCourseExams: async (courseId: string | number) => {
    const response = await api.get(`/courses/${courseId}/exams`);
    return response.data;
  },

  getExam: async (examId: string | number) => {
    const response = await api.get(`/exams/${examId}`);
    return response.data;
  },

  submitExam: async (examId: string | number, answers: Array<{question_id: number, selected_option: string}>) => {
    const response = await api.post(`/exams/${examId}/submit`, { answers });
    return response.data;
  },
};

export default api;
