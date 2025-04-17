
const express = require('express');
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { getCourseChapters, createChapter } = require('../controllers/chapterController');
const { getCourseExams, createExam } = require('../controllers/examController');
const { enrollCourse } = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);

// Protected routes
router.post('/:courseId/enroll', protect, enrollCourse);
router.get('/:courseId/chapters', getCourseChapters);
router.get('/:courseId/exams', protect, getCourseExams);

// Admin routes
router.post('/', protect, authorize('admin'), createCourse);
router.post('/:courseId/chapters', protect, authorize('admin'), createChapter);
router.post('/:courseId/exams', protect, authorize('admin'), createExam);
router.put('/:id', protect, authorize('admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
