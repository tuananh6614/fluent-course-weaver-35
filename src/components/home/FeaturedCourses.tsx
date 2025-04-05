
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseCard from "@/components/courses/CourseCard";
import SectionHeading from "@/components/common/SectionHeading";

// Sample course data
const featuredCourses = [
  {
    id: "1",
    title: "Advanced Web Development with React",
    instructor: "Jane Smith",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Programming",
    rating: 4.9,
    students: 15423,
    duration: "25 hours",
    price: 59.99,
    featured: true,
  },
  {
    id: "2",
    title: "Data Science Fundamentals: Machine Learning",
    instructor: "Michael Chen",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Data Science",
    rating: 4.8,
    students: 12780,
    duration: "32 hours",
    price: 69.99,
    featured: true,
  },
  {
    id: "3",
    title: "UI/UX Design Principles and Best Practices",
    instructor: "Sarah Johnson",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
    category: "Design",
    rating: 4.7,
    students: 9245,
    duration: "18 hours",
    price: 49.99,
    featured: true,
  },
  {
    id: "4",
    title: "Business Leadership and Management",
    instructor: "Robert Williams",
    thumbnail: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Business",
    rating: 4.6,
    students: 7890,
    duration: "22 hours",
    price: 54.99,
  },
];

const FeaturedCourses: React.FC = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="page-container">
        <SectionHeading
          title="Featured Courses"
          subtitle="Explore our most popular courses hand-picked by our team"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <div key={course.id} className="animate-fade-in">
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
