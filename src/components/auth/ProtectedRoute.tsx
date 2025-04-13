
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/api';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const verifyAuth = async () => {
      try {
        const response = await authService.verifyToken();
        setIsAuthenticated(true);
        setUserRole(response.data.user.role);
        
        // Update stored user data with fresh data from server
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      } catch (error) {
        console.error('Authentication verification failed:', error);
        // Clear invalid credentials
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        
        toast.error('Phiên đăng nhập đã hết hạn', {
          description: 'Vui lòng đăng nhập lại để tiếp tục'
        });
      }
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-r-transparent"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    // User doesn't have required role
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
