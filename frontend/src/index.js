import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomerApp from './customer/CustomerApp';
import BusinessApp from './business/BusinessApp';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        {/* Customer side: Default route */}
        <Route path="/*" element={<CustomerApp />} />

        {/* Business side */}
        <Route path="/business/*" element={<BusinessApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
