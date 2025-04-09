
const express = require('express');
const { 
  getExam,
  submitExam
} = require('../controllers/examController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/:id', getExam);
router.post('/:id/submit', submitExam);

module.exports = router;
