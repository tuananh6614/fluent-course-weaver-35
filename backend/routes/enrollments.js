
const express = require('express');
const { 
  getEnrollments, 
  updateProgress 
} = require('../controllers/enrollmentController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/', getEnrollments);
router.put('/:courseId/progress', updateProgress);

module.exports = router;
