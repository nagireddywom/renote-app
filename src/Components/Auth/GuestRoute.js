import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useLocation, Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Allow access to both authenticated and non-authenticated users
  return children;
};


export  default GuestRoute;