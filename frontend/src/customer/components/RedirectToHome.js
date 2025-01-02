import { Navigate } from 'react-router-dom';

// Component to prevent logged-in users from accessing certain pages
const RedirectToHome = ({ children }) => {
  const isLoggedIn = () => !!localStorage.getItem('authToken');  // Check if the user is logged in

  // If logged in, redirect to home page (or another page)
  return isLoggedIn() ? <Navigate to="/" /> : children;
};

export default RedirectToHome;
