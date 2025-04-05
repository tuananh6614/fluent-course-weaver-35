
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, BookOpen, Users, Award } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-gradient opacity-20 absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="hero-gradient opacity-10 absolute top-1/3 -left-24 w-64 h-64 rounded-full blur-2xl animate-float"></div>
        <div className="bg-accent/5 absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-2xl animate-float animation-delay-300"></div>
      </div>

      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <div className="inline-block mb-4">
                <div className="flex items-center gap-2 rounded-full bg-primary/5 border border-primary/20 px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium text-primary">
                    Learn at your own pace
                  </span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight mb-6">
                Discover Your <br />
                <span className="text-gradient">Learning Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Access high-quality courses, interactive lessons, and comprehensive
                assessments to reach your educational and professional goals.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/courses">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Courses
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">500+ Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">10k+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-medium">Expert Instructors</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative z-10 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="Students learning together"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-lg card-shadow animate-float">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Interactive Learning</div>
                  <div className="text-sm text-muted-foreground">Engage with materials</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-xl shadow-lg card-shadow animate-float animation-delay-500">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="font-medium">Earn Certificates</div>
                  <div className="text-sm text-muted-foreground">Show your skills</div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/50 to-secondary/30 blur-2xl opacity-30 translate-y-8 translate-x-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
