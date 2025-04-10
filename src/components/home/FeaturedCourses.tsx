
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseCard from "@/components/courses/CourseCard";
import SectionHeading from "@/components/common/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedCourses: React.FC = () => {
  // Fetch courses data
  const { data: coursesResponse, isLoading, error } = useQuery({
    queryKey: ['featuredCourses'],
    queryFn: courseService.getAllCourses,
  });

  // Get all courses and display the first 4 courses directly
  const allCourses = coursesResponse?.data || [];
  const featuredCourses = allCourses.slice(0, 4);

  // Skeleton loader for featured courses
  const CourseSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(4).fill(0).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-video bg-muted rounded-t-md"></div>
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="section-padding bg-muted/50">
      <div className="page-container">
        <SectionHeading
          title="Khóa Học Nổi Bật"
          subtitle="Khám phá các khóa học phổ biến nhất được đội ngũ của chúng tôi lựa chọn"
        />

        {isLoading ? (
          <CourseSkeletons />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Không thể tải khóa học nổi bật</p>
          </div>
        ) : featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <div 
                key={course.course_id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CourseCard 
                  id={course.course_id}
                  title={course.title || "Khóa học"}
                  instructor={course.instructor || "Giảng viên"}
                  thumbnail={course.thumbnail || "https://placehold.co/800x450"}
                  category={course.category || "General"}
                  rating={course.rating || 0}
                  students={course.students || 0}
                  duration={course.duration || "0 giờ"}
                  price={course.price || 0}
                  featured={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Hiện chưa có khóa học nổi bật</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/courses">Xem Tất Cả Khóa Học</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
