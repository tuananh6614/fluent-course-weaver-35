
const express = require('express');
const { 
  getLesson, 
  updateLesson, 
  deleteLesson
} = require('../controllers/lessonController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public route
router.get('/:id', getLesson);

// Admin only routes
router.use(protect);
router.put('/:id', authorize('admin'), updateLesson);
router.delete('/:id', authorize('admin'), deleteLesson);

module.exports = router;
