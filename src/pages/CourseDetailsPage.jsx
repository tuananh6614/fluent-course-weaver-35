
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseAPI, enrollmentAPI, chapterAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Get course details
        const courseResponse = await courseAPI.getCourse(courseId);
        setCourse(courseResponse.data.data);
        
        // Get chapters
        const chaptersResponse = await chapterAPI.getCourseChapters(courseId);
        setChapters(chaptersResponse.data.data);
        
        // Check enrollment status if user is logged in
        if (user) {
          try {
            const enrollmentsResponse = await enrollmentAPI.getEnrollments();
            const enrollment = enrollmentsResponse.data.data.find(
              (e) => e.course_id === parseInt(courseId)
            );
            
            setIsEnrolled(!!enrollment);
          } catch (error) {
            console.error('Error checking enrollment:', error);
          }
        }
      } catch (error) {
        toast.error('Không thể tải thông tin khóa học');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để đăng ký khóa học');
      return;
    }
    
    try {
      setEnrolling(true);
      await enrollmentAPI.enrollCourse(courseId);
      setIsEnrolled(true);
      toast.success('Đăng ký khóa học thành công');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký khóa học không thành công');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;
  }

  if (!course) {
    return <div className="text-center py-20">Không tìm thấy khóa học</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {course.thumbnail && (
            <div className="h-64 bg-gray-300">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">{course.title}</h2>
              
              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling || !user}
                  className={`px-6 py-2 rounded-md text-white ${
                    !user ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {enrolling ? 'Đang xử lý...' : 'Đăng ký học'}
                </button>
              ) : (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                  Đã đăng ký
                </span>
              )}
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Mô tả khóa học</h3>
              <p className="text-gray-700">{course.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Nội dung khóa học</h3>
              
              {chapters.length === 0 ? (
                <p className="text-gray-500">Chưa có nội dung.</p>
              ) : (
                <div className="space-y-4">
                  {chapters.map((chapter) => (
                    <div key={chapter.chapter_id} className="border rounded-md p-4">
                      <h4 className="text-lg font-medium">{chapter.title}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetailsPage;
