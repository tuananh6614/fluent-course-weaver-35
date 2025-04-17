
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import admin sub-pages here when they are created
const CoursesAdmin = () => <div>Quản lý khóa học</div>;
const UsersAdmin = () => <div>Quản lý người dùng</div>;

const AdminDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Trang quản trị</h1>
          <p className="text-gray-600">Xin chào, {user?.full_name}</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:flex">
        {/* Sidebar */}
        <div className="w-full lg:w-64 mb-8 lg:mb-0">
          <nav className="space-y-1">
            <Link
              to="/admin/courses"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Quản lý khóa học
            </Link>
            <Link
              to="/admin/users"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Quản lý người dùng
            </Link>
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Quay lại trang chính
            </Link>
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <Routes>
            <Route path="/" element={<div>Chọn chức năng quản trị từ thanh bên.</div>} />
            <Route path="/courses/*" element={<CoursesAdmin />} />
            <Route path="/users/*" element={<UsersAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
