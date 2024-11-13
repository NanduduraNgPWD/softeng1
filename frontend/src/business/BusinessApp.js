
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../auth/Login/Login'
import Signup from '../auth/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Inventory from './pages/Inventory/Inventory'
import AddVehicle from './pages/AddVehicle/AddVehicle'
import Bookings from './pages/Bookings/Bookings'
import React from 'react';
// import ScrollToTop from './components/ScrollToTop/ScrollToTop';
function BusinessApp() {
  return (
    
    <BrowserRouter>
    {/* <ScrollToTop /> */}
      <main className="flex w-full">
        <Routes>
          <Route path="/" element={ <Dashboard />} />
          <Route path="/Inventory" element={ <Inventory />} />
          {/* CRUD */}
          <Route path="/AddVehicle" element={ <AddVehicle />} /> 
          <Route path="/Bookings" element={ <Bookings />} />
        </Routes>
      </main>

   </BrowserRouter>
  );
}

export default BusinessApp;
