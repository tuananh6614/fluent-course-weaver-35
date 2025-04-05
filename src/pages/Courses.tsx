
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/common/SectionHeading";
import CourseCard from "@/components/courses/CourseCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Slider, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  Checkbox
} from "@/components/ui";
import { Search, Filter } from "lucide-react";

// Sample course data
const coursesData = [
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
  {
    id: "5",
    title: "Digital Marketing Mastery",
    instructor: "Emily Clark",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80",
    category: "Marketing",
    rating: 4.5,
    students: 6547,
    duration: "20 hours",
    price: 44.99,
  },
  {
    id: "6",
    title: "Mobile App Development with Flutter",
    instructor: "David Lee",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Programming",
    rating: 4.8,
    students: 5432,
    duration: "28 hours",
    price: 59.99,
  },
  {
    id: "7",
    title: "Financial Planning and Wealth Management",
    instructor: "Amanda Rodriguez",
    thumbnail: "https://images.unsplash.com/photo-1565514020179-026b92b2d9b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
    category: "Finance",
    rating: 4.7,
    students: 4321,
    duration: "15 hours",
    price: 39.99,
  },
  {
    id: "8",
    title: "Photography Masterclass: Professional Techniques",
    instructor: "Thomas Green",
    thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Photography",
    rating: 4.9,
    students: 8765,
    duration: "24 hours",
    price: 49.99,
  },
  {
    id: "9",
    title: "Language Learning: Spanish for Beginners",
    instructor: "Maria Gonzalez",
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Language",
    rating: 4.6,
    students: 9876,
    duration: "30 hours",
    price: 29.99,
  },
  {
    id: "10",
    title: "Personal Development: Build Confidence and Self-Esteem",
    instructor: "Rachel Brown",
    thumbnail: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    category: "Personal Development",
    rating: 4.8,
    students: 12345,
    duration: "12 hours",
    price: 0,
  },
  {
    id: "11",
    title: "Database Design and Management with SQL",
    instructor: "John Peterson",
    thumbnail: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Programming",
    rating: 4.5,
    students: 6789,
    duration: "26 hours",
    price: 54.99,
  },
  {
    id: "12",
    title: "Content Creation for Social Media",
    instructor: "Lisa Taylor",
    thumbnail: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Marketing",
    rating: 4.7,
    students: 5432,
    duration: "16 hours",
    price: 44.99,
  },
];

const categories = [
  "All Categories",
  "Programming",
  "Data Science",
  "Design",
  "Business",
  "Marketing",
  "Finance",
  "Photography",
  "Language",
  "Personal Development",
];

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFreeCourses, setShowFreeCourses] = useState(false);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  // Filter courses based on search, category, price, and free courses
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    const matchesFree = showFreeCourses ? course.price === 0 : true;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesFree;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") {
      return b.students - a.students;
    } else if (sortBy === "newest") {
      // In a real app, we'd use the course creation date
      return 0;
    } else if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
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
            title="Explore Our Courses"
            subtitle="Discover new skills, expand your knowledge, and follow your passion"
            align="center"
          />

          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for courses, topics, or instructors..."
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
          <div className="lg:grid lg:grid-cols-4 gap-8">
            {/* Mobile Filters Toggle Button */}
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <p className="text-lg font-medium">
                Showing {sortedCourses.length} results
              </p>
              <Button
                variant="outline"
                onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters - Desktop & Mobile */}
            <div className={`lg:block ${mobileFiltersVisible ? 'block' : 'hidden'} mb-6 lg:mb-0`}>
              <div className="bg-card rounded-lg border p-5 sticky top-20 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <button
                          className={`text-sm hover:text-primary transition-colors ${
                            selectedCategory === category
                              ? "text-primary font-medium"
                              : ""
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="free-courses" 
                      checked={showFreeCourses}
                      onCheckedChange={() => setShowFreeCourses(!showFreeCourses)}
                    />
                    <Label htmlFor="free-courses">Free Courses</Label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Sort By</h3>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full lg:hidden" onClick={() => setMobileFiltersVisible(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>

            {/* Course Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-lg">
                  Showing <span className="font-medium">{sortedCourses.length}</span> results
                </p>
                <div className="hidden lg:block">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {sortedCourses.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-medium mb-2">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
