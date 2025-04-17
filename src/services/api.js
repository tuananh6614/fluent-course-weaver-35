
import axios from 'axios';

// Create an axios instance
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, logout the user
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (userData) => api.post('/register', userData),
  login: (credentials) => api.post('/login', credentials),
  verifyToken: () => api.get('/verify-token'),
  forgotPassword: (email) => api.post('/forgot-password', { email }),
};

// User endpoints
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
};

// Course endpoints
export const courseAPI = {
  getCourses: () => api.get('/courses'),
  getCourse: (courseId) => api.get(`/courses/${courseId}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (courseId, courseData) => api.put(`/courses/${courseId}`, courseData),
  deleteCourse: (courseId) => api.delete(`/courses/${courseId}`),
};

// Chapter endpoints
export const chapterAPI = {
  getCourseChapters: (courseId) => api.get(`/courses/${courseId}/chapters`),
  getChapter: (chapterId) => api.get(`/chapters/${chapterId}`),
  createChapter: (courseId, chapterData) => api.post(`/courses/${courseId}/chapters`, chapterData),
  updateChapter: (chapterId, chapterData) => api.put(`/chapters/${chapterId}`, chapterData),
  deleteChapter: (chapterId) => api.delete(`/chapters/${chapterId}`),
};

// Lesson endpoints
export const lessonAPI = {
  getChapterLessons: (chapterId) => api.get(`/chapters/${chapterId}/lessons`),
  getLesson: (lessonId) => api.get(`/lessons/${lessonId}`),
  createLesson: (chapterId, lessonData) => api.post(`/chapters/${chapterId}/lessons`, lessonData),
  updateLesson: (lessonId, lessonData) => api.put(`/lessons/${lessonId}`, lessonData),
  deleteLesson: (lessonId) => api.delete(`/lessons/${lessonId}`),
};

// Enrollment endpoints
export const enrollmentAPI = {
  enrollCourse: (courseId) => api.post(`/courses/${courseId}/enroll`),
  getEnrollments: () => api.get('/enrollments'),
  updateProgress: (courseId, progressData) => api.put(`/enrollments/${courseId}/progress`, progressData),
};

// Exam endpoints
export const examAPI = {
  getCourseExams: (courseId) => api.get(`/courses/${courseId}/exams`),
  getExam: (examId) => api.get(`/exams/${examId}`),
  submitExam: (examId, answers) => api.post(`/exams/${examId}/submit`, { answers }),
  createExam: (courseId, examData) => api.post(`/courses/${courseId}/exams`, examData),
};

// Certificate endpoints
export const certificateAPI = {
  generateCertificate: (courseId) => api.post(`/certificates/generate/${courseId}`),
  getCertificate: (certificateId) => api.get(`/certificates/${certificateId}`),
  verifyCertificate: (certificateNumber) => api.get(`/certificates/verify/${certificateNumber}`),
};

export default api;
