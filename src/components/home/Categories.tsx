
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/common/SectionHeading";
import { 
  Code, Database, Brush, TrendingUp, BookOpen, 
  Briefcase, BarChart, Film, Mic, Globe
} from "lucide-react";

interface CategoryItem {
  name: string;
  icon: React.ReactNode;
  count: number;
  slug: string;
}

const categories: CategoryItem[] = [
  {
    name: "Lập Trình",
    icon: <Code className="h-10 w-10" />,
    count: 127,
    slug: "programming",
  },
  {
    name: "Khoa Học Dữ Liệu",
    icon: <Database className="h-10 w-10" />,
    count: 95,
    slug: "data-science",
  },
  {
    name: "Thiết Kế",
    icon: <Brush className="h-10 w-10" />,
    count: 82,
    slug: "design",
  },
  {
    name: "Kinh Doanh",
    icon: <Briefcase className="h-10 w-10" />,
    count: 140,
    slug: "business",
  },
  {
    name: "Marketing",
    icon: <TrendingUp className="h-10 w-10" />,
    count: 76,
    slug: "marketing",
  },
  {
    name: "Phát Triển Cá Nhân",
    icon: <BookOpen className="h-10 w-10" />,
    count: 115,
    slug: "personal-development",
  },
  {
    name: "Tài Chính",
    icon: <BarChart className="h-10 w-10" />,
    count: 68,
    slug: "finance",
  },
  {
    name: "Video & Nhiếp Ảnh",
    icon: <Film className="h-10 w-10" />,
    count: 53,
    slug: "video-photography",
  },
  {
    name: "Âm Thanh & Âm Nhạc",
    icon: <Mic className="h-10 w-10" />,
    count: 42,
    slug: "audio-music",
  },
  {
    name: "Học Ngoại Ngữ",
    icon: <Globe className="h-10 w-10" />,
    count: 67,
    slug: "language-learning",
  },
];

const Categories: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="page-container">
        <SectionHeading
          title="Duyệt Theo Danh Mục"
          subtitle="Tìm khóa học phù hợp từ các danh mục đa dạng của chúng tôi"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.slug}
              to={`/courses/category/${category.slug}`} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card className="h-full card-hover border-2 hover:border-primary/50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="mb-4 text-primary">{category.icon}</div>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} khóa học
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
