
import React from "react";
import { Users, BookOpen, GraduationCap, Award } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-primary mb-4">{icon}</div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-muted-foreground text-center">{label}</div>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem
            icon={<Users className="h-8 w-8" />}
            value="50K+"
            label="Học Viên Tích Cực"
          />
          <StatItem
            icon={<BookOpen className="h-8 w-8" />}
            value="500+"
            label="Khóa Học Chất Lượng"
          />
          <StatItem
            icon={<GraduationCap className="h-8 w-8" />}
            value="200+"
            label="Giảng Viên Chuyên Gia"
          />
          <StatItem
            icon={<Award className="h-8 w-8" />}
            value="15K+"
            label="Chứng Chỉ Đã Cấp"
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
