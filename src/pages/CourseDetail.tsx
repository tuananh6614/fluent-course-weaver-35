
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Clock, Users, CheckCircle2, 
  PlayCircle, FileText, ShoppingCart 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { courseService } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Fetch course data from API
  const { data: courseData, isLoading, error } = useQuery({
    queryKey: ['courseDetail', id],
    queryFn: () => courseService.getCourseById(id as string),
    enabled: !!id,
  });

  const course = courseData?.data;

  // Fetch chapters with lessons for this course
  useEffect(() => {
    if (course && course.chapters) {
      // Auto-expand the first chapter
      if (course.chapters.length > 0 && expandedSections.length === 0) {
        setExpandedSections([course.chapters[0].chapter_id.toString()]);
      }

      // Pre-fetch lessons for all chapters
      course.chapters.forEach((chapter) => {
        courseService.getChapterLessons(chapter.chapter_id);
      });
    }
  }, [course]);

  // Get lessons for a specific chapter
  const useChapterLessons = (chapterId: number | string) => {
    return useQuery({
      queryKey: ['chapterLessons', chapterId],
      queryFn: () => courseService.getChapterLessons(chapterId),
      enabled: !!chapterId && expandedSections.includes(chapterId.toString()),
    });
  };

  // Enroll course mutation
  const enrollMutation = useMutation({
    mutationFn: () => courseService.enrollCourse(id as string),
    onSuccess: () => {
      toast.success("Đăng ký khóa học thành công");
    },
    onError: (error: any) => {
      toast.error("Lỗi đăng ký khóa học", {
        description: error.response?.data?.message || "Vui lòng thử lại sau"
      });
    }
  });

  const handleEnroll = () => {
    enrollMutation.mutate();
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <section className="pt-16 bg-muted">
          <div className="page-container py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-1/2" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
              <Skeleton className="h-[400px]" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <Layout>
        <section className="pt-16 bg-muted">
          <div className="page-container py-12">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <h2 className="text-xl font-bold mb-4">Không tìm thấy khóa học</h2>
              <p className="text-muted-foreground mb-6">
                Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              <Button asChild>
                <a href="/courses">Quay lại danh sách khóa học</a>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Calculate total number of lessons
  const chapters = course.chapters || [];
  
  // Convert course features to an array
  const courseFeatures = [
    `Truy cập trọn đời vào ${course.duration || "25 giờ"} nội dung`,
    "Đảm bảo hoàn tiền trong 30 ngày",
    "Chứng chỉ hoàn thành khóa học",
    "Truy cập trên điện thoại và TV",
    `${course.projects_count || 12} dự án thực hành`,
    `${course.resources_count || 200}+ tài liệu tải xuống`,
  ];

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-4 w-4" />;
      case "quiz":
        return <FileText className="h-4 w-4" />;
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
                    {course.category || "Lập trình"}
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/10">
                    {course.level || "Trung cấp"}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                <p className="text-lg text-muted-foreground">
                  {course.description || "Mô tả khóa học."}
                </p>

                <div className="flex items-center flex-wrap gap-6">
                  <div className="flex items-center">
                    <div className="flex items-center text-amber-500 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">
                          {i < Math.floor(course.rating || 0) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="font-medium">{(course.rating || 0).toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">
                      ({(course.students || 0).toLocaleString()} học viên)
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{course.duration || "25 giờ"}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{chapters.length} chương</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in animation-delay-300">
              <Card className="sticky top-20">
                <CardContent className="pt-6">
                  <div className="aspect-video rounded-lg overflow-hidden mb-6">
                    <img
                      src={course.thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-4">
                      {course.price ? `$${course.price.toFixed(2)}` : "Miễn phí"}
                    </div>
                    <Button 
                      className="w-full mb-3" 
                      size="lg"
                      onClick={handleEnroll}
                      disabled={enrollMutation.isPending}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {enrollMutation.isPending ? "Đang xử lý..." : "Đăng ký ngay"}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Đảm bảo hoàn tiền trong 30 ngày
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Khóa học bao gồm:</h3>
                    <ul className="space-y-2">
                      {courseFeatures.map((feature, idx) => (
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
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Nội dung khóa học</h2>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {chapters.length} chương
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration || "25 giờ"} tổng thời gian
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {chapters.length > 0 ? (
              chapters.map((chapter) => {
                const { data: lessonsData, isLoading: lessonsLoading } = useChapterLessons(chapter.chapter_id);
                const lessons = lessonsData?.data || [];
                
                return (
                  <div key={chapter.chapter_id} className="border rounded-lg overflow-hidden">
                    <button
                      className="w-full p-4 flex justify-between items-center hover:bg-muted/50 transition-colors"
                      onClick={() => toggleSection(chapter.chapter_id.toString())}
                    >
                      <div className="flex items-center">
                        <h3 className="font-medium text-lg">{chapter.title}</h3>
                        <Badge variant="outline" className="ml-3">
                          {chapter.lessons_count || lessons.length || 0} bài
                        </Badge>
                      </div>
                      <div>
                        {expandedSections.includes(chapter.chapter_id.toString()) ? (
                          <span>−</span>
                        ) : (
                          <span>+</span>
                        )}
                      </div>
                    </button>

                    {expandedSections.includes(chapter.chapter_id.toString()) && (
                      <div className="border-t">
                        {lessonsLoading ? (
                          <div className="p-4">
                            <Skeleton className="h-6 w-full mb-2" />
                            <Skeleton className="h-6 w-3/4" />
                          </div>
                        ) : lessons.length > 0 ? (
                          lessons.map((lesson) => (
                            <div
                              key={lesson.lesson_id}
                              className="p-4 flex justify-between items-center hover:bg-muted/30 transition-colors border-b last:border-b-0"
                            >
                              <div className="flex items-center">
                                <div className="mr-3 text-primary">
                                  {getLessonIcon(lesson.type || "video")}
                                </div>
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {lesson.duration || "15:00"}
                                  </p>
                                </div>
                              </div>
                              {lesson.preview ? (
                                <Button variant="ghost" size="sm">
                                  Xem trước
                                </Button>
                              ) : (
                                <div className="text-sm text-muted-foreground">
                                  <i className="fas fa-lock"></i>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            Không có bài học nào trong chương này.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 border rounded-lg">
                <p className="text-muted-foreground">Chưa có chương nào cho khóa học này.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetail;
