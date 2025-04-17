
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonAPI, enrollmentAPI } from '../services/api';
import toast from 'react-hot-toast';

const LessonPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await lessonAPI.getLesson(lessonId);
        setLesson(response.data.data);
      } catch (error) {
        toast.error('Không thể tải bài học');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleUpdateProgress = async () => {
    if (!lesson) return;
    
    try {
      // This is a simplified implementation - in a real app you would track progress more accurately
      const progressData = {
        progress_percent: 100,  // Mark as completed
        current_lesson_id: lessonId
      };
      
      await enrollmentAPI.updateProgress(lesson.course_id, progressData);
      toast.success('Tiến độ đã được cập nhật');
    } catch (error) {
      toast.error('Không thể cập nhật tiến độ');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;
  }

  if (!lesson) {
    return <div className="text-center py-20">Không tìm thấy bài học</div>;
  }

  const pages = lesson.pages || [];
  const currentPageData = pages[currentPage] || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="bg-white shadow rounded-lg overflow-hidden p-6">
          {pages.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500">Chưa có nội dung cho bài học này.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  {currentPageData.page_type === 'video' ? 'Video' : 'Nội dung'}
                </h2>
                
                {currentPageData.page_type === 'video' ? (
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded">
                    {/* Video component would go here */}
                    <div className="flex items-center justify-center h-64 bg-gray-300">
                      <p>Video content placeholder</p>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {currentPageData.content}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className={`px-4 py-2 rounded ${
                    currentPage === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Trang trước
                </button>
                
                <span className="px-4 py-2">
                  Trang {currentPage + 1} / {pages.length}
                </span>
                
                {currentPage === pages.length - 1 ? (
                  <button
                    onClick={handleUpdateProgress}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Hoàn thành
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Trang tiếp
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
