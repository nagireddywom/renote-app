// src/components/ProtectedRoute.js
import React from 'react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('Protected Route Debug:', {
      user,
      loading,
      userId: user?._id || user?.id
    });
  }, [user, loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user exists but hasn't completed profile, redirect to profile completion
  if (!user.name || !user.isEmailVerified) {
    console.log('Incomplete profile, redirecting to complete profile');
    return <Navigate to="/complete-profile" state={{ from: location }} replace />;
  }

  return children;
};
  
  export default ProtectedRoute;