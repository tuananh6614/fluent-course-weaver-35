
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'eduhub',
  port: process.env.DB_PORT || 3306
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    
    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create new user
      db.query(
        'INSERT INTO users (email, password, full_name, role) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, full_name, 'student'],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
          }
          
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const user = results[0];
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
      );
      
      res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          avatar_url: user.avatar_url
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Routes
app.get('/api/users/profile', authenticateToken, (req, res) => {
  db.query('SELECT id, email, full_name, avatar_url, role FROM users WHERE id = ?', 
    [req.user.id], 
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(results[0]);
    }
  );
});

// Course Routes
app.get('/api/courses', (req, res) => {
  const query = `
    SELECT c.*, u.full_name as instructor_name 
    FROM courses c 
    LEFT JOIN users u ON c.instructor_id = u.id 
    WHERE c.is_published = true
    ORDER BY c.created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    
    res.status(200).json(results);
  });
});

app.get('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT c.*, u.full_name as instructor_name, u.avatar_url as instructor_avatar 
    FROM courses c 
    LEFT JOIN users u ON c.instructor_id = u.id 
    WHERE c.id = ? AND c.is_published = true
  `;
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Get chapters
    db.query(
      `SELECT * FROM chapters WHERE course_id = ? AND is_published = true ORDER BY position`,
      [id],
      (err, chapters) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }
        
        const course = results[0];
        course.chapters = chapters;
        
        res.status(200).json(course);
      }
    );
  });
});

// Chapters and lessons routes
app.get('/api/chapters/:id/lessons', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.query(
    `SELECT * FROM lessons WHERE chapter_id = ? AND is_published = true ORDER BY position`,
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      
      res.status(200).json(results);
    }
  );
});

// Enrollment routes
app.post('/api/courses/:id/enroll', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  // Check if already enrolled
  db.query(
    'SELECT * FROM enrollment WHERE user_id = ? AND course_id = ?',
    [userId, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (results.length > 0) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }
      
      // Create enrollment
      db.query(
        'INSERT INTO enrollment (user_id, course_id) VALUES (?, ?)',
        [userId, id],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
          }
          
          res.status(201).json({ message: 'Successfully enrolled in course' });
        }
      );
    }
  );
});

// Get user's enrolled courses
app.get('/api/enrollments', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT c.*, e.progress, e.enrolled_at  
    FROM enrollment e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = ?
    ORDER BY e.enrolled_at DESC
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    
    res.status(200).json(results);
  });
});

// Certificate routes
app.get('/api/certificates/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT cert.*, u.full_name, c.title as course_title 
    FROM certificate cert
    JOIN users u ON cert.user_id = u.id
    JOIN courses c ON cert.course_id = c.id
    WHERE cert.id = ?
  `;
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.status(200).json(results[0]);
  });
});

// Forgot password
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  
  // Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    
    if (results.length === 0) {
      // Still return success to prevent email enumeration
      return res.status(200).json({ 
        message: 'If your email is registered, you will receive password reset instructions'
      });
    }
    
    // In a real application, generate a token and send a reset email
    // For this example, we'll just return success
    res.status(200).json({ 
      message: 'If your email is registered, you will receive password reset instructions'
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
