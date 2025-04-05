
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Categories from "@/components/home/Categories";
import CustomFeatures from "@/components/home/CustomFeatures";
import Stats from "@/components/home/Stats";
import TestimonialSection from "@/components/home/TestimonialSection";
import CallToAction from "@/components/home/CallToAction";

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCourses />
      <Categories />
      <CustomFeatures />
      <Stats />
      <TestimonialSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
