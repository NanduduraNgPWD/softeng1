import { Routes, Route } from 'react-router-dom';
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
import Profile from './pages/Profile/Profile'

const CustomerApp = () => {
  return (
    <>
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="motorcycles" element={<Motorcycles />} />
          <Route path="booking" element={<Booking />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="partner" element={<Partner />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="registration" element={<Registration />} />
          <Route path="signupbusiness" element={<SignupBusiness />} />
          <Route path="motorcycles/:id" element={<VehicleDetail />} />
          <Route path="/bookings/:bookingId" element={<BookingInformation />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
};

export default CustomerApp;
