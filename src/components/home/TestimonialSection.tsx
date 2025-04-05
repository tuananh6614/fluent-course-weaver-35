
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  course: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Hà Minh Tâm",
    role: "Lập Trình Viên",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Khóa học phát triển web đã hoàn toàn thay đổi sự nghiệp của tôi. Chương trình học có cấu trúc và các dự án thực hành đã cung cấp cho tôi kỹ năng và sự tự tin để có được công việc mơ ước. Tôi không thể giới thiệu EduHub đủ nhiều!",
    course: "Phát Triển Web Nâng Cao với React",
  },
  {
    id: 2,
    name: "Nguyễn Đức Huy",
    role: "Chuyên Gia Phân Tích Dữ Liệu",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Với vai trò là người đang chuyển sang khoa học dữ liệu, tôi thấy các tài liệu khóa học vô cùng toàn diện nhưng dễ tiếp cận. Sự hỗ trợ từ giảng viên thật xuất sắc, và tôi có thể áp dụng ngay những gì học được vào công việc.",
    course: "Nền Tảng Khoa Học Dữ Liệu: Học Máy",
  },
  {
    id: 3,
    name: "Lê Thị Ánh Ngọc",
    role: "Nhà Thiết Kế UX",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "Khóa học UI/UX đã giúp tôi thay đổi cách tư duy thiết kế. Ví dụ thực tế và phản hồi từ các giảng viên đã nâng cao kỹ năng của tôi. Tôi đã nhận được nhiều lời mời làm việc sau khi trình bày các dự án trong danh mục đầu tư từ khóa học này.",
    course: "Nguyên Tắc Thiết Kế UI/UX và Thực Hành Tốt Nhất",
  },
  {
    id: 4,
    name: "Trần Văn Minh",
    role: "Giám Đốc Marketing",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    quote:
      "Khóa học lãnh đạo doanh nghiệp đã cung cấp những hiểu biết có giá trị mà tôi có thể áp dụng ngay vào tổ chức của mình. Các nghiên cứu tình huống rất phù hợp, và cơ hội kết nối là vô giá cho sự phát triển nghề nghiệp của tôi.",
    course: "Lãnh Đạo Kinh Doanh và Quản Lý",
  },
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="page-container">
        <SectionHeading
          title="Học Viên Nói Gì"
          subtitle="Lắng nghe từ cộng đồng người học của chúng tôi"
        />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="overflow-hidden py-10">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6 text-primary">
                          <Quote className="h-12 w-12 opacity-20" />
                        </div>

                        <p className="text-lg mb-8 italic">
                          "{testimonial.quote}"
                        </p>

                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground mb-1">
                              {testimonial.role}
                            </p>
                            <p className="text-sm text-primary font-medium">
                              {testimonial.course}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full"
            onClick={goToPrevious}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full"
            onClick={goToNext}
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                  }
                }}
                aria-label={`Chuyển tới lời chứng thực ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
