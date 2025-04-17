
const express = require('express');
const { generateCertificate, getCertificate, verifyCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes for verification
router.get('/:id', getCertificate);
router.get('/verify/:number', verifyCertificate);

// Protected routes for generating
router.post('/generate/:courseId', protect, generateCertificate);

module.exports = router;
