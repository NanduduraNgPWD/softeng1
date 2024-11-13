
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home'
import Motorcycles from './pages/Motorcycles/Motorcycles'
import About from './pages/About/About'
import Booking from './pages/Booking/Booking'
import Partner from './pages/Partner/Partner'
import Contact from './pages/Contact/Contact'
import Login from '../auth/Login/Login'
import Signup from '../auth/Signup/Signup'
import SignupBusiness from '../auth/SignupBusiness/SignupBusiness'
import VehicleDetail from './pages/VehicleDetail/VehicleDetail'


import Registration from './pages/Registration/Registration'


import React from 'react';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
function CustomerApp() {
  return (
    
    <BrowserRouter>
    <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="motorcycles" element={ <Motorcycles />} />
          <Route path="Booking" element={ <Booking />} />
          <Route path="Contact" element={ <Contact />} />
          <Route path="About" element={ <About />} />
          <Route path="Partner" element={ <Partner />} />
          <Route path="Login" element={ <Login />} />
          <Route path="Signup" element={ <Signup />} />

          <Route path="Registration" element={ <Registration />} />


          <Route path="SignupBusiness" element={ <SignupBusiness />} />
          <Route path="/Motorcycles/:id" element={<VehicleDetail />} />
        </Routes>
      </main>

   </BrowserRouter>
  );
}

export default CustomerApp;
