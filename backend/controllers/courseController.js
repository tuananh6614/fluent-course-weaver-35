const db = require('../config/db');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
  try {
    const [courses] = await db.query(`
      SELECT c.*, 
        COUNT(DISTINCT e.user_id) as students,
        COALESCE(AVG(ts.score), 0) as rating
      FROM Courses c
      LEFT JOIN Enrollments e ON c.course_id = e.course_id
      LEFT JOIN Test_Scores ts ON c.course_id = ts.exam_id
      GROUP BY c.course_id
      ORDER BY c.created_at DESC
    `);
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    
    // Get course details with student count and rating
    const [courses] = await db.query(`
      SELECT c.*, 
        COUNT(DISTINCT e.user_id) as students,
        COALESCE(AVG(ts.score), 0) as rating
      FROM Courses c
      LEFT JOIN Enrollments e ON c.course_id = e.course_id
      LEFT JOIN Test_Scores ts ON c.course_id = ts.exam_id
      WHERE c.course_id = ?
      GROUP BY c.course_id
    `, [courseId]);
    
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }
    
    const course = courses[0];
    
    // Get chapters with lesson count for the course
    const [chapters] = await db.query(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM Lessons l WHERE l.chapter_id = c.chapter_id) as lessons_count
      FROM Chapters c
      WHERE c.course_id = ?
      ORDER BY c.chapter_order
    `, [courseId]);
    
    // Add chapters to course
    course.chapters = chapters;
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new course (admin only)
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, thumbnail, duration, level, category, price } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp tiêu đề khóa học'
      });
    }
    
    const [result] = await db.query(
      'INSERT INTO Courses (title, description, thumbnail, duration, level, category, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', thumbnail || '', duration || '0 giờ', level || 'Cơ bản', category || 'Chung', price || 0]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: 'Không thể tạo khóa học'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Tạo khóa học thành công',
      data: {
        course_id: result.insertId,
        title,
        description,
        thumbnail,
        duration,
        level,
        category,
        price
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course (admin only)
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const { title, description, thumbnail, duration, level, category, price } = req.body;
    
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
    
    // Update course
    const [result] = await db.query(
      'UPDATE Courses SET title = ?, description = ?, thumbnail = ?, duration = ?, level = ?, category = ?, price = ? WHERE course_id = ?',
      [
        title || courses[0].title,
        description !== undefined ? description : courses[0].description,
        thumbnail || courses[0].thumbnail,
        duration || courses[0].duration,
        level || courses[0].level,
        category || courses[0].category,
        price !== undefined ? price : courses[0].price,
        courseId
      ]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cập nhật khóa học không thành công'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Cập nhật khóa học thành công',
      data: {
        course_id: courseId,
        title: title || courses[0].title,
        description: description !== undefined ? description : courses[0].description,
        thumbnail: thumbnail || courses[0].thumbnail,
        duration: duration || courses[0].duration,
        level: level || courses[0].level,
        category: category || courses[0].category,
        price: price !== undefined ? price : courses[0].price
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course (admin only)
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    
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
    
    // Delete course
    const [result] = await db.query(
      'DELETE FROM Courses WHERE course_id = ?',
      [courseId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: 'Xóa khóa học không thành công'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Xóa khóa học thành công'
    });
  } catch (error) {
    next(error);
  }
};
