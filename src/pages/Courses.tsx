
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/common/SectionHeading";
import CourseCard from "@/components/courses/CourseCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Fetch courses data
  const { data: coursesResponse, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: courseService.getAllCourses,
  });

  const coursesData = coursesResponse?.data || [];

  // Filtered courses based on search
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course?.instructor?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Sort courses based on selected option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.students || 0) - (a.students || 0);
    } else if (sortBy === "newest") {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    } else if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  // Skeleton loader for courses
  const CourseSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, index) => (
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
    <Layout>
      <section className="bg-muted py-16">
        <div className="page-container">
          <SectionHeading
            title="Khám Phá Các Khóa Học"
            subtitle="Khám phá kỹ năng mới, mở rộng kiến thức và theo đuổi đam mê của bạn"
            align="center"
          />

          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Tìm kiếm khóa học, chủ đề, hoặc giảng viên..."
                className="pr-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="page-container">
          <div className="space-y-6">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium">
                {isLoading 
                  ? "Đang tải khóa học..." 
                  : `Hiển thị ${sortedCourses.length} kết quả`
                }
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Phổ Biến Nhất</SelectItem>
                  <SelectItem value="newest">Mới Nhất</SelectItem>
                  <SelectItem value="rating">Đánh Giá Cao Nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Grid */}
            <div>
              {isLoading ? (
                <CourseSkeletons />
              ) : error ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-medium mb-2">Không thể tải khóa học</h3>
                  <p className="text-muted-foreground">
                    Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
                  </p>
                </div>
              ) : sortedCourses.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-medium mb-2">Không tìm thấy khóa học</h3>
                  <p className="text-muted-foreground">
                    Vui lòng điều chỉnh tiêu chí tìm kiếm của bạn
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedCourses.map((course, index) => (
                    <div 
                      key={course.course_id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
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
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
