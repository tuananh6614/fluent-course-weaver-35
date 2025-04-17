
const express = require('express');
const { getEnrollments, updateProgress } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes need authentication
router.get('/', protect, getEnrollments);
router.put('/:courseId/progress', protect, updateProgress);

module.exports = router;
