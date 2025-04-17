
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI, enrollmentAPI } from '../services/api';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
  });
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user profile
        const profileResponse = await userAPI.getProfile();
        const userData = profileResponse.data.data;
        
        setFormData({
          full_name: userData.full_name || '',
          phone: userData.phone || '',
          bio: userData.bio || '',
        });
        
        // Get enrollments
        const enrollmentsResponse = await enrollmentAPI.getEnrollments();
        setEnrollments(enrollmentsResponse.data.data);
      } catch (error) {
        toast.error('Không thể tải thông tin người dùng');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      await userAPI.updateProfile(formData);
      toast.success('Cập nhật thông tin thành công');
    } catch (error) {
      toast.error('Không thể cập nhật thông tin');
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Thông tin tài khoản</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Họ tên
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Giới thiệu
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {updating ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="p-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Khóa học đã đăng ký</h2>
            
            {enrollments.length === 0 ? (
              <p className="text-gray-500">Bạn chưa đăng ký khóa học nào.</p>
            ) : (
              <div className="space-y-4">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.enrollment_id} className="flex items-center border rounded-md p-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium">{enrollment.title}</h4>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${enrollment.progress_percent}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Tiến độ: {enrollment.progress_percent}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-6 border-t">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
