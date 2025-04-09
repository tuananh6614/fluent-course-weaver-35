
# EduHub Backend API

This is the backend API for the EduHub e-learning platform, built with Express.js and MySQL.

## Setup Instructions

1. Install dependencies:
   ```bash
   cd src/backend
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables in `.env` with your configuration

3. Set up the MySQL database:
   - Create a database named `eduhub` in MySQL
   - Import the schema from `database.sql` into your MySQL database

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `POST /api/forgot-password` - Request password reset

### Users
- `GET /api/users/profile` - Get user profile (requires authentication)

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details by ID

### Enrollments
- `POST /api/courses/:id/enroll` - Enroll in a course (requires authentication)
- `GET /api/enrollments` - Get user's enrolled courses (requires authentication)

### Chapters & Lessons
- `GET /api/chapters/:id/lessons` - Get lessons for a chapter (requires authentication)

### Certificates
- `GET /api/certificates/:id` - Get certificate details

## Database Schema

The database schema includes tables for:
- Users
- Courses
- Chapters
- Lessons
- Pages
- Enrollment
- Certificate
- Exams
- Questions and answers
- Test scores

See `database.sql` for the complete schema.
