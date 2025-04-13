
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to intended path or homepage
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  return (
    <Layout>
      <div className="py-16 md:py-24 min-h-screen flex items-center">
        <div className="page-container max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Đăng nhập</h1>
          <AuthForm type="login" />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
