
import React from "react";
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";

const Login: React.FC = () => {
  return (
    <Layout>
      <section className="py-16 min-h-[calc(100vh-200px)] flex items-center">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
                <p className="text-muted-foreground text-lg mb-6">
                  Log in to access your personalized learning dashboard, resume your courses,
                  and continue your educational journey.
                </p>
                <div className="p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Why join EduHub?</h3>
                  <ul className="space-y-3">
                    {[
                      "Access to 500+ high-quality courses",
                      "Learn from industry experts",
                      "Interactive and engaging learning experience",
                      "Earn certificates to showcase your skills",
                      "Join a community of lifelong learners",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="animate-fade-in">
              <AuthForm type="login" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
