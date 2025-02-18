// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
  
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }
  
    if (!user) {
      // Save the attempted URL for redirecting after login
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    // If user exists but hasn't completed profile, redirect to profile completion
    if (!user.name || !user.isEmailVerified) {
      return <Navigate to="/complete-profile" state={{ from: location }} replace />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;