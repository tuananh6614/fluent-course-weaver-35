
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/common/SectionHeading";
import CourseCard from "@/components/courses/CourseCard";

interface Category {
  name: string;
  slug: string;
}

// Mapping from slug to user-friendly category names
const categoryNames: Record<string, string> = {
  "programming": "Lập Trình",
  "data-science": "Khoa Học Dữ Liệu",
  "design": "Thiết Kế",
  "business": "Kinh Doanh",
  "marketing": "Marketing",
  "personal-development": "Phát Triển Cá Nhân",
  "finance": "Tài Chính",
  "video-photography": "Video & Nhiếp Ảnh",
  "audio-music": "Âm Thanh & Âm Nhạc",
  "language-learning": "Học Ngoại Ngữ",
};

const CategoryCourses: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categoryName = categoryNames[slug || ""] || slug;

  useEffect(() => {
    // Placeholder for API call
    // In a real application, you would fetch courses by category here
    const fetchCoursesByCategory = async () => {
      try {
        setIsLoading(true);
        // API call would go here
        // const response = await api.getCoursesByCategory(slug);
        // setCourses(response.data);
        
        // For now, we'll just set an empty array
        setCourses([]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses by category:", error);
        setCourses([]);
        setIsLoading(false);
      }
    };

    fetchCoursesByCategory();
  }, [slug]);

  return (
    <Layout>
      <section className="py-16 bg-muted/50">
        <div className="page-container">
          <SectionHeading
            title={`Khóa Học ${categoryName}`}
            subtitle={`Khám phá các khóa học ${categoryName.toLowerCase()} để phát triển kỹ năng của bạn`}
            align="center"
          />
          
          <div className="mt-12">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Đang tải...</p>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="animate-fade-in">
                    <CourseCard {...course} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">
                  Hiện chưa có khóa học nào trong danh mục {categoryName.toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryCourses;
