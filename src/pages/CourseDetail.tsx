
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Clock, BarChart, Users, Award, CheckCircle2, 
  PlayCircle, FileText, Download, ShoppingCart 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Sample course data - in a real app this would be fetched based on the id
  const course = {
    id: "1",
    title: "Advanced Web Development with React",
    description:
      "Master modern web development with React. This comprehensive course covers everything from basic components to advanced patterns, state management, hooks, and integrating with backend services. By the end, you'll be able to build complex, scalable applications with React's ecosystem.",
    category: "Programming",
    level: "Intermediate",
    instructor: {
      name: "Jane Smith",
      title: "Senior Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Jane has over 8 years of experience in web development and has worked with companies like Google and Microsoft. She specializes in frontend technologies and is passionate about teaching React.",
    },
    rating: 4.9,
    students: 15423,
    duration: "25 hours",
    lastUpdated: "March 2023",
    language: "English",
    price: 59.99,
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    features: [
      "Lifetime access to 25 hours of content",
      "30-day money-back guarantee",
      "Certificate of completion",
      "Access on mobile and TV",
      "12 hands-on projects",
      "200+ downloadable resources",
    ],
    overview: {
      whatYouWillLearn: [
        "Build powerful, fast, user-friendly and reactive web apps",
        "Apply for high-paid jobs or work as a freelancer in one of the most demanded sectors",
        "Understand the React ecosystem and build complex frontend applications",
        "Learn state management and hooks for efficient component interaction",
        "Create responsive UIs with modern design patterns",
        "Integrate with RESTful APIs and GraphQL services",
      ],
      prerequisites: [
        "Basic JavaScript knowledge",
        "Understanding of HTML and CSS",
        "No prior React experience needed",
      ],
      targetAudience: [
        "Web developers looking to learn React",
        "JavaScript developers wanting to expand their skillset",
        "Beginners with basic web development knowledge",
        "Anyone interested in frontend development",
      ],
    },
    curriculum: [
      {
        id: "section-1",
        title: "Getting Started with React",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to React",
            duration: "15:30",
            type: "video",
            preview: true,
          },
          {
            id: "lesson-1-2",
            title: "Setting Up Your Development Environment",
            duration: "22:15",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-1-3",
            title: "Your First React Component",
            duration: "18:45",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-1-4",
            title: "Module 1 Quiz",
            duration: "10:00",
            type: "quiz",
            preview: false,
          },
        ],
      },
      {
        id: "section-2",
        title: "React Fundamentals",
        lessons: [
          {
            id: "lesson-2-1",
            title: "JSX and Virtual DOM",
            duration: "20:10",
            type: "video",
            preview: true,
          },
          {
            id: "lesson-2-2",
            title: "Props and State",
            duration: "25:30",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-2-3",
            title: "Handling Events",
            duration: "17:45",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-2-4",
            title: "Conditional Rendering",
            duration: "14:20",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-2-5",
            title: "Module 2 Practice Exercise",
            duration: "30:00",
            type: "exercise",
            preview: false,
          },
        ],
      },
      {
        id: "section-3",
        title: "React Hooks",
        lessons: [
          {
            id: "lesson-3-1",
            title: "Introduction to Hooks",
            duration: "12:45",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-3-2",
            title: "useState and useEffect",
            duration: "28:15",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-3-3",
            title: "Custom Hooks",
            duration: "22:30",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-3-4",
            title: "Hooks Practice Project",
            duration: "45:00",
            type: "exercise",
            preview: false,
          },
        ],
      },
      {
        id: "section-4",
        title: "State Management",
        lessons: [
          {
            id: "lesson-4-1",
            title: "Context API",
            duration: "24:10",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-4-2",
            title: "Redux Basics",
            duration: "32:20",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-4-3",
            title: "Modern Redux with Redux Toolkit",
            duration: "28:35",
            type: "video",
            preview: false,
          },
          {
            id: "lesson-4-4",
            title: "State Management Final Project",
            duration: "60:00",
            type: "exercise",
            preview: false,
          },
        ],
      },
    ],
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Calculate total lessons and course duration
  const totalLessons = course.curriculum.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-4 w-4" />;
      case "quiz":
        return <BarChart className="h-4 w-4" />;
      case "exercise":
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-16 bg-muted">
        <div className="page-container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 animate-fade-in">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-primary/10">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/10">
                    {course.level}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                <p className="text-lg text-muted-foreground">
                  {course.description}
                </p>

                <div className="flex items-center flex-wrap gap-6">
                  <div className="flex items-center">
                    <div className="flex items-center text-amber-500 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">
                          {i < Math.floor(course.rating) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="font-medium">{course.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{totalLessons} lessons</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in animation-delay-300">
              <Card className="sticky top-20">
                <CardContent className="pt-6">
                  <div className="aspect-video rounded-lg overflow-hidden mb-6">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-4">
                      ${course.price.toFixed(2)}
                    </div>
                    <Button className="w-full mb-3" size="lg">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Enroll Now
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      30-day money-back guarantee
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">This course includes:</h3>
                    <ul className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="page-container">
          <Tabs defaultValue="curriculum">
            <TabsList className="mb-8 w-full grid grid-cols-3">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {totalLessons} lessons
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration} total
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {course.curriculum.map((section) => (
                  <div key={section.id} className="border rounded-lg overflow-hidden">
                    <button
                      className="w-full p-4 flex justify-between items-center hover:bg-muted/50 transition-colors"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center">
                        <h3 className="font-medium text-lg">{section.title}</h3>
                        <Badge variant="outline" className="ml-3">
                          {section.lessons.length} lessons
                        </Badge>
                      </div>
                      <div>
                        {expandedSections.includes(section.id) ? (
                          <span>−</span>
                        ) : (
                          <span>+</span>
                        )}
                      </div>
                    </button>

                    {expandedSections.includes(section.id) && (
                      <div className="border-t">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-4 flex justify-between items-center hover:bg-muted/30 transition-colors border-b last:border-b-0"
                          >
                            <div className="flex items-center">
                              <div className="mr-3 text-primary">
                                {getLessonIcon(lesson.type)}
                              </div>
                              <div>
                                <p className="font-medium">{lesson.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                            {lesson.preview ? (
                              <Button variant="ghost" size="sm">
                                Preview
                              </Button>
                            ) : (
                              <div className="text-sm text-muted-foreground">
                                <i className="fas fa-lock"></i>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="overview" className="animate-fade-in">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    What You Will Learn
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.overview.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    {course.overview.prerequisites.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Target Audience</h2>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    {course.overview.targetAudience.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="instructor" className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="aspect-square w-48 h-48 rounded-full overflow-hidden mb-4 mx-auto">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-semibold mb-1">
                    {course.instructor.name}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {course.instructor.title}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>15,423 students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>6 courses</span>
                    </div>
                  </div>
                  <p className="text-lg mb-6">{course.instructor.bio}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetail;
