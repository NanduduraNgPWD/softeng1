import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // No token, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (!allowedRoles.includes(decodedToken.user_type)) {
      // User type not allowed, redirect to a 403 page or login
      return <Navigate to="/unauthorized" />;
    }

    return children; // Render the protected component
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
