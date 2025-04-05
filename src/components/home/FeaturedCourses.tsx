
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseCard from "@/components/courses/CourseCard";
import SectionHeading from "@/components/common/SectionHeading";

const FeaturedCourses: React.FC = () => {
  // Empty array for courses - will be populated from backend later
  const featuredCourses: any[] = [];

  return (
    <section className="section-padding bg-muted/50">
      <div className="page-container">
        <SectionHeading
          title="Khóa Học Nổi Bật"
          subtitle="Khám phá các khóa học phổ biến nhất được đội ngũ của chúng tôi lựa chọn"
        />

        {featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div key={course.id} className="animate-fade-in">
                <CourseCard {...course} />
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
