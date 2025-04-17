
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">EduHub</h1>
          <div className="flex space-x-4">
            <Link to="/courses" className="text-gray-700 hover:text-gray-900">Khóa học</Link>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-gray-900">Tài khoản</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-gray-900">Quản lý</Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">Đăng nhập</Link>
                <Link to="/register" className="text-gray-700 hover:text-gray-900">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 text-center">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Xin chào đến với EduHub</h2>
          <p className="text-xl text-gray-600 mb-8">Nơi bạn học những kỹ năng mới và nâng cao sự nghiệp</p>
          <Link to="/courses" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Khám phá khóa học
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
