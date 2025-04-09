
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.user_id,
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    { expiresIn: '30d' }
  );
};
