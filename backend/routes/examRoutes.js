
const express = require('express');
const { getExam, submitExam } = require('../controllers/examController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/:id', protect, getExam);
router.post('/:id/submit', protect, submitExam);

module.exports = router;
