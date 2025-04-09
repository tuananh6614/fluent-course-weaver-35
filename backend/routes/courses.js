
const express = require('express');
const { 
  getCourses, 
  getCourse, 
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const { 
  getCourseChapters,
  createChapter 
} = require('../controllers/chapterController');

const {
  getCourseExams,
  createExam
} = require('../controllers/examController');

const { enrollCourse } = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);

// Protected routes
router.use(protect);

// User routes
router.post('/:courseId/enroll', enrollCourse);

// Chapter routes
router.get('/:courseId/chapters', getCourseChapters);
router.post('/:courseId/chapters', authorize('admin'), createChapter);

// Exam routes
router.get('/:courseId/exams', getCourseExams);
router.post('/:courseId/exams', authorize('admin'), createExam);

// Admin only routes
router.post('/', authorize('admin'), createCourse);
router.put('/:id', authorize('admin'), updateCourse);
router.delete('/:id', authorize('admin'), deleteCourse);

module.exports = router;
