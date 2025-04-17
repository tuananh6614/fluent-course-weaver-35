
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    // You can display a loading spinner here
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user || !isAdmin()) {
    // Redirect to home if user is not an admin
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
