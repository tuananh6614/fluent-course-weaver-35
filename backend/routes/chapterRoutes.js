
const express = require('express');
const { getChapter, updateChapter, deleteChapter } = require('../controllers/chapterController');
const { getChapterLessons, createLesson } = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/:id', getChapter);
router.get('/:chapterId/lessons', getChapterLessons);

// Admin routes
router.post('/:chapterId/lessons', protect, authorize('admin'), createLesson);
router.put('/:id', protect, authorize('admin'), updateChapter);
router.delete('/:id', protect, authorize('admin'), deleteChapter);

module.exports = router;
