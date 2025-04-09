
const db = require('../config/db');

// @desc    Get course exams
// @route   GET /api/courses/:courseId/exams
// @access  Private
exports.getCourseExams = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    
    // Check if course exists
    const [courses] = await db.query(
      'SELECT * FROM Courses WHERE course_id = ?',
      [courseId]
    );
    
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }
    
    // Check if user is enrolled
    const [enrollments] = await db.query(
      'SELECT * FROM Enrollments WHERE user_id = ? AND course_id = ?',
      [req.user.user_id, courseId]
    );
    
    if (enrollments.length === 0 && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn chưa đăng ký khóa học này'
      });
    }
    
    // Get exams
    const [exams] = await db.query(
      'SELECT * FROM Exams WHERE course_id = ?',
      [courseId]
    );
    
    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single exam
// @route   GET /api/exams/:id
// @access  Private
exports.getExam = async (req, res, next) => {
  try {
    const examId = req.params.id;
    
    // Get exam details
    const [exams] = await db.query(
      'SELECT * FROM Exams WHERE exam_id = ?',
      [examId]
    );
    
    if (exams.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài kiểm tra'
      });
    }
    
    const exam = exams[0];
    
    // Check if user is enrolled in the course
    if (req.user.role !== 'admin') {
      const [enrollments] = await db.query(
        'SELECT * FROM Enrollments WHERE user_id = ? AND course_id = ?',
        [req.user.user_id, exam.course_id]
      );
      
      if (enrollments.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Bạn chưa đăng ký khóa học này'
        });
      }
    }
    
    // Get questions without correct answers
    const [questions] = await db.query(
      `SELECT 
        question_id, 
        question_text, 
        option_a, 
        option_b, 
        option_c, 
        option_d 
      FROM Questions 
      WHERE exam_id = ?`,
      [examId]
    );
    
    // Add questions to exam
    exam.questions = questions;
    
    res.status(200).json({
      success: true,
      data: exam
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit exam answers
// @route   POST /api/exams/:id/submit
// @access  Private
exports.submitExam = async (req, res, next) => {
  try {
    const examId = req.params.id;
    const userId = req.user.user_id;
    const { answers } = req.body;
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp câu trả lời'
      });
    }
    
    // Get exam details
    const [exams] = await db.query(
      'SELECT * FROM Exams WHERE exam_id = ?',
      [examId]
    );
    
    if (exams.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài kiểm tra'
      });
    }
    
    const exam = exams[0];
    
    // Check if user is enrolled in the course
    const [enrollments] = await db.query(
      'SELECT * FROM Enrollments WHERE user_id = ? AND course_id = ?',
      [userId, exam.course_id]
    );
    
    if (enrollments.length === 0 && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn chưa đăng ký khóa học này'
      });
    }
    
    // Get all questions with correct answers
    const [questions] = await db.query(
      'SELECT * FROM Questions WHERE exam_id = ?',
      [examId]
    );
    
    // Calculate score
    let correctCount = 0;
    const questionMap = {};
    
    questions.forEach(question => {
      questionMap[question.question_id] = question.correct_answer;
    });
    
    answers.forEach(answer => {
      if (questionMap[answer.question_id] && 
          questionMap[answer.question_id].toUpperCase() === answer.selected_option.toUpperCase()) {
        correctCount++;
      }
    });
    
    const totalQuestions = questions.length;
    const score = (correctCount / totalQuestions) * 100;
    const passStatus = score >= exam.passing_score ? 'pass' : 'fail';
    
    // Save test score
    const [result] = await db.query(
      'INSERT INTO Test_Scores (user_id, exam_id, score, status) VALUES (?, ?, ?, ?)',
      [userId, examId, score, passStatus]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: 'Không thể lưu kết quả bài kiểm tra'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Nộp bài kiểm tra thành công',
      data: {
        exam_id: examId,
        score,
        correct_count: correctCount,
        total_questions: totalQuestions,
        status: passStatus,
        passing_score: exam.passing_score
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new exam (admin only)
// @route   POST /api/courses/:courseId/exams
// @access  Private/Admin
exports.createExam = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const { title, time_limit, passing_score, chapter_id, questions } = req.body;
    
    // Check if course exists
    const [courses] = await db.query(
      'SELECT * FROM Courses WHERE course_id = ?',
      [courseId]
    );
    
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }
    
    // Check if chapter exists if provided
    if (chapter_id) {
      const [chapters] = await db.query(
        'SELECT * FROM Chapters WHERE chapter_id = ?',
        [chapter_id]
      );
      
      if (chapters.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy chương'
        });
      }
    }
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp tiêu đề bài kiểm tra'
      });
    }
    
    // Create exam transaction
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      
      // Create exam
      const [examResult] = await connection.query(
        'INSERT INTO Exams (course_id, chapter_id, title, time_limit, total_questions, passing_score) VALUES (?, ?, ?, ?, ?, ?)',
        [
          courseId, 
          chapter_id || null, 
          title, 
          time_limit || 30, 
          questions?.length || 0, 
          passing_score || 70
        ]
      );
      
      const examId = examResult.insertId;
      
      // Add questions if provided
      if (questions && Array.isArray(questions) && questions.length > 0) {
        const questionValues = questions.map(q => [
          examId,
          q.question_text,
          q.option_a,
          q.option_b,
          q.option_c,
          q.option_d,
          q.correct_answer
        ]);
        
        await connection.query(
          'INSERT INTO Questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES ?',
          [questionValues]
        );
        
        // Update total questions
        await connection.query(
          'UPDATE Exams SET total_questions = ? WHERE exam_id = ?',
          [questions.length, examId]
        );
      }
      
      await connection.commit();
      
      res.status(201).json({
        success: true,
        message: 'Tạo bài kiểm tra thành công',
        data: {
          exam_id: examId,
          course_id: courseId,
          chapter_id: chapter_id || null,
          title,
          time_limit: time_limit || 30,
          total_questions: questions?.length || 0,
          passing_score: passing_score || 70
        }
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    next(error);
  }
};
