import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Import LogOut icon

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');

    navigate('/login');  // Redirects to the login page
  };

  return (
    <LogOut onClick={handleLogout} style={{ cursor: 'pointer' }} />
  );
};

export default Logout;