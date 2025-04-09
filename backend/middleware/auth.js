
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Không có quyền truy cập, vui lòng đăng nhập' 
      });
    }
    
    try {
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'your_jwt_secret_key_here'
      );
      
      const [rows] = await db.query(
        'SELECT user_id, email, full_name, role FROM Users WHERE user_id = ?', 
        [decoded.id]
      );
      
      if (rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Người dùng không tồn tại'
        });
      }
      
      req.user = rows[0];
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn'
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền thực hiện thao tác này'
      });
    }
    next();
  };
};
