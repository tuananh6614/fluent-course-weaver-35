
const express = require('express');
const { 
  getCertificate, 
  verifyCertificate,
  generateCertificate 
} = require('../controllers/certificateController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Public route
router.get('/verify/:number', verifyCertificate);
router.get('/:id', getCertificate);

// Protected routes
router.use(protect);
router.post('/generate/:courseId', generateCertificate);

module.exports = router;
