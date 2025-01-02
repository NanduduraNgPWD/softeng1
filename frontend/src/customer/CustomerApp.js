import { Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Motorcycles from './pages/Motorcycles/Motorcycles';
import About from './pages/About/About';
import Booking from './pages/Booking/Booking';
import Partner from './pages/Partner/Partner';
import Contact from './pages/Contact/Contact';
import Login from '../auth/Login/Login';
import Signup from '../auth/Signup/Signup';
import SignupBusiness from '../auth/SignupBusiness/SignupBusiness';
import VehicleDetail from './pages/VehicleDetail/VehicleDetail';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import Registration from './pages/Registration/Registration';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import BookingInformation from './pages/BookingInformation/BookingInformation';
import Profile from './pages/Profile/Profile';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import RedirectToHome from './components/RedirectToHome';  // Import the new component

const CustomerApp = () => {
  const isLoggedIn = () => !!localStorage.getItem('authToken');

  const PrivateRoute = ({ children }) => {
    return isLoggedIn() ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <ScrollToTop />
      <NotificationContainer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="motorcycles" element={<Motorcycles />} />

          {/* Protected Routes */}
          <Route path="booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
          <Route path="motorcycles/:id" element={<PrivateRoute><VehicleDetail /></PrivateRoute>} />
          <Route path="bookings/:bookingId" element={<PrivateRoute><BookingInformation /></PrivateRoute>} />
          <Route path="payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* Public Routes */}
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="partner" element={<Partner />} />
          
          {/* Redirect logged-in users away from login */}
          <Route path="login" element={
            <RedirectToHome>
              <Login />
            </RedirectToHome>
          } />

          <Route path="signup" element={<Signup />} />
          <Route path="registration" element={<Registration />} />
          <Route path="signupbusiness" element={<SignupBusiness />} />
        </Routes>
      </main>
    </>
  );
};

export default CustomerApp;
