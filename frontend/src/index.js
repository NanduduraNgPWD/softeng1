import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomerApp from './customer/CustomerApp';
import BusinessApp from './business/BusinessApp';
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <BrowserRouter>
     <Routes>
    {/* Customer Routes */}
    <Route 
      path="/*" 
      element={
        
          <CustomerApp />
       
      } 
    />

    {/* Business Routes */}
    <Route 
      path="/business/*" 
      element={
        <ProtectedRoute allowedRoles={['Business']}>
          <BusinessApp />
        </ProtectedRoute>
      } 
    />

    {/* Unauthorized Access Page */}
    <Route path="/unauthorized" element={<Unauthorized />} />
  </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
