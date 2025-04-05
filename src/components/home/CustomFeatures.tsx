
import React from "react";
import { BookOpen, Monitor, Users, Award } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const featuresData = [
  {
    icon: <BookOpen className="h-12 w-12 text-primary mb-4" />,
    title: "Chương Trình Học Toàn Diện",
    description:
      "Các khóa học của chúng tôi bao gồm mọi thứ từ khái niệm cơ bản đến kỹ thuật nâng cao, đảm bảo hiểu biết toàn diện về nội dung học tập.",
  },
  {
    icon: <Monitor className="h-12 w-12 text-primary mb-4" />,
    title: "Học Tập Tương Tác",
    description:
      "Tương tác với nội dung sống động, dự án thực hành và bài tập tương tác được thiết kế để củng cố kiến thức của bạn.",
  },
  {
    icon: <Users className="h-12 w-12 text-primary mb-4" />,
    title: "Giảng Viên Chuyên Gia",
    description:
      "Học từ các chuyên gia trong ngành với nhiều năm kinh nghiệm và đam mê giảng dạy.",
  },
  {
    icon: <Award className="h-12 w-12 text-primary mb-4" />,
    title: "Chứng Chỉ Được Công Nhận",
    description:
      "Nhận chứng chỉ sau khi hoàn thành khóa học để thể hiện kỹ năng mới và nâng cao hồ sơ chuyên môn của bạn.",
  },
];

const CustomFeatures = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="page-container">
        <SectionHeading
          title="Tại Sao Chọn Nền Tảng Của Chúng Tôi"
          subtitle="Chúng tôi cung cấp công cụ và tài nguyên bạn cần để đạt được mục tiêu học tập"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomFeatures;
