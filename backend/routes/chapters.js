
const express = require('express');
const { 
  getChapter, 
  updateChapter, 
  deleteChapter 
} = require('../controllers/chapterController');

const { getChapterLessons, createLesson } = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public route
router.get('/:id', getChapter);

// Protected routes
router.use(protect);

// Lesson routes
router.get('/:chapterId/lessons', getChapterLessons);
router.post('/:chapterId/lessons', authorize('admin'), createLesson);

// Admin only routes
router.put('/:id', authorize('admin'), updateChapter);
router.delete('/:id', authorize('admin'), deleteChapter);

module.exports = router;
