
const express = require('express');
const { getLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/:id', getLesson);

// Admin routes
router.put('/:id', protect, authorize('admin'), updateLesson);
router.delete('/:id', protect, authorize('admin'), deleteLesson);

module.exports = router;
