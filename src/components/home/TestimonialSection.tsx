
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
    name: "Emma Watson",
    role: "Software Developer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "The web development course completely transformed my career. The structured curriculum and hands-on projects gave me the skills and confidence to land my dream job. I can't recommend EduHub enough!",
    course: "Advanced Web Development with React",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Data Scientist",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "As someone transitioning to data science, I found the course materials incredibly comprehensive yet accessible. The instructor support was outstanding, and I was able to apply what I learned immediately in my work.",
    course: "Data Science Fundamentals: Machine Learning",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The UI/UX course helped me transform my design thinking. The practical examples and feedback from instructors elevated my skills. I've received multiple job offers after showcasing my portfolio projects from this course.",
    course: "UI/UX Design Principles and Best Practices",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "Marketing Director",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    quote:
      "The business leadership course provided valuable insights that I could implement immediately in my organization. The case studies were relevant, and the networking opportunities were invaluable for my professional growth.",
    course: "Business Leadership and Management",
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
          title="What Our Students Say"
          subtitle="Hear from our community of learners"
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
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
