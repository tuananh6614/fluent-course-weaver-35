
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// @desc    Generate certificate for completed course
// @route   POST /api/certificates/generate/:courseId
// @access  Private
exports.generateCertificate = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.user_id;
    
    // Check if enrolled and completed
    const [enrollments] = await db.query(
      'SELECT * FROM Enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    
    if (enrollments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bạn chưa đăng ký khóa học này'
      });
    }
    
    const enrollment = enrollments[0];
    
    // Check if course is completed (100% progress)
    if (enrollment.progress_percent < 100) {
      return res.status(400).json({
        success: false,
        message: 'Bạn chưa hoàn thành khóa học này'
      });
    }
    
    // Check if certificate already exists
    const [certificates] = await db.query(
      'SELECT * FROM Certificates WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    
    if (certificates.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Chứng chỉ đã được cấp trước đó',
        data: certificates[0]
      });
    }
    
    // Generate certificate
    const certificateNumber = `EH-${uuidv4().substring(0, 8).toUpperCase()}-${new Date().getFullYear()}`;
    
    const [result] = await db.query(
      'INSERT INTO Certificates (user_id, course_id, certificate_number, completion_date) VALUES (?, ?, ?, NOW())',
      [userId, courseId, certificateNumber]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: 'Không thể cấp chứng chỉ'
      });
    }
    
    // Get certificate details
    const [newCertificate] = await db.query(
      'SELECT * FROM Certificates WHERE certificate_id = ?',
      [result.insertId]
    );
    
    res.status(201).json({
      success: true,
      message: 'Chứng chỉ đã được cấp thành công',
      data: newCertificate[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get certificate details
// @route   GET /api/certificates/:id
// @access  Public
exports.getCertificate = async (req, res, next) => {
  try {
    const certificateId = req.params.id;
    
    // Get certificate with course and user details
    const [certificates] = await db.query(`
      SELECT c.*, u.full_name, co.title as course_title 
      FROM Certificates c
      JOIN Users u ON c.user_id = u.user_id
      JOIN Courses co ON c.course_id = co.course_id
      WHERE c.certificate_id = ?
    `, [certificateId]);
    
    if (certificates.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy chứng chỉ'
      });
    }
    
    res.status(200).json({
      success: true,
      data: certificates[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify certificate by certificate number
// @route   GET /api/certificates/verify/:number
// @access  Public
exports.verifyCertificate = async (req, res, next) => {
  try {
    const certificateNumber = req.params.number;
    
    // Get certificate with course and user details
    const [certificates] = await db.query(`
      SELECT c.*, u.full_name, co.title as course_title 
      FROM Certificates c
      JOIN Users u ON c.user_id = u.user_id
      JOIN Courses co ON c.course_id = co.course_id
      WHERE c.certificate_number = ?
    `, [certificateNumber]);
    
    if (certificates.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Chứng chỉ không hợp lệ hoặc không tồn tại'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Chứng chỉ hợp lệ',
      data: certificates[0]
    });
  } catch (error) {
    next(error);
  }
};
