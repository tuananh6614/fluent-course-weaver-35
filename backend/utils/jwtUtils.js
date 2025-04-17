
const jwt = require('jsonwebtoken');

// Generate JWT token
exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.user_id, role: user.role },
    process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    { expiresIn: '30d' }
  );
};

// Verify JWT token
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
};

// Get token expiration time
exports.getTokenExpiration = (token) => {
  const decoded = jwt.decode(token);
  return decoded.exp * 1000; // Convert to milliseconds
};
