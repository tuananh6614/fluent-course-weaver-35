
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/common/SectionHeading";
import CourseCard from "@/components/courses/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Search, Filter } from "lucide-react";

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  // Sẽ được lấy từ API sau này
  const coursesData: any[] = [];

  // Các khóa học đã được lọc
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course?.instructor?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Sắp xếp khóa học
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") {
      return b.students - a.students;
    } else if (sortBy === "newest") {
      // Trong ứng dụng thực tế, chúng ta sẽ sử dụng ngày tạo khóa học
      return 0;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

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
            {/* Mobile Filters Toggle Button */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium">
                Hiển thị {sortedCourses.length} kết quả
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
              {sortedCourses.length === 0 ? (
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
                      key={course.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CourseCard {...course} />
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
