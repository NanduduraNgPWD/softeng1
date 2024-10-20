
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../auth/Login/Login'
import Signup from '../auth/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import React from 'react';
// import ScrollToTop from './components/ScrollToTop/ScrollToTop';
function BusinessApp() {
  return (
    
    <BrowserRouter>
    {/* <ScrollToTop /> */}
      <main>
        <Routes>
          <Route path="/" element={ <Dashboard />} />
          {/* CRUD */}
          {/* <Route path="AddVehicle" element={ <AddVehicle />} /> */}
        </Routes>
      </main>

   </BrowserRouter>
  );
}

export default BusinessApp;
