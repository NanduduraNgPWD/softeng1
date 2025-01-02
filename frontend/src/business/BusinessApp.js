import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory/Inventory';
import AddVehicle from './pages/AddVehicle/AddVehicle';
import Bookings from './pages/Bookings/Bookings';
import ViewBooking from './pages/ViewBooking/ViewBooking';
import Profile from './pages/Profile/Profile';
import Overview from './pages/Overview/Overview';
import Subscription from './pages/Subscription/Subscription';
import Payment from './pages/Payment/Payment'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
const BusinessApp = () => {
  return (
    
    <main className="flex w-full">
      <NotificationContainer />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/AddVehicle" element={<AddVehicle />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/Bookings/:bookingId" element={<ViewBooking />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Subscription" element={<Subscription />} />
        <Route path="/SubscriptionPage" element={<SubscriptionPage />} />

        <Route path="/Payment" element={<Payment />} />
      </Routes>
    </main>
  );
};

export default BusinessApp;
