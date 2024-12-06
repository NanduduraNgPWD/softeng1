import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory/Inventory';
import AddVehicle from './pages/AddVehicle/AddVehicle';
import Bookings from './pages/Bookings/Bookings';
import ViewBooking from './pages/ViewBooking/ViewBooking';
const BusinessApp = () => {
  return (
    <main className="flex w-full">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/AddVehicle" element={<AddVehicle />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/Bookings/:bookingId" element={<ViewBooking />} />
      </Routes>
    </main>
  );
};

export default BusinessApp;
