
import React from "react";
import { 
  AwardIcon, BookOpenCheck, GraduationCap, 
  BarChart3, Clock, Certificate 
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl border bg-card animate-fade-in">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const features = [
  {
    icon: <BookOpenCheck className="h-6 w-6" />,
    title: "Interactive Lessons",
    description:
      "Engage with our interactive content designed to enhance understanding and retention.",
  },
  {
    icon: <AwardIcon className="h-6 w-6" />,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of practical experience.",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Comprehensive Assessments",
    description:
      "Test your knowledge with our detailed quizzes and practical assignments.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Learn at Your Own Pace",
    description:
      "Access course materials anytime, anywhere and learn at a speed that suits you.",
  },
  {
    icon: <Certificate className="h-6 w-6" />,
    title: "Earn Certificates",
    description:
      "Receive recognized certificates upon course completion to boost your credentials.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed analytics and progress reports.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="page-container">
        <SectionHeading
          title="Why Choose EduHub"
          subtitle="Discover what makes our learning platform unique"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} style={{ animationDelay: `${index * 100}ms` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
