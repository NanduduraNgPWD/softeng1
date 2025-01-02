import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ position, top, color }) {
  // Initialize isLoggedIn state to false initially
  const isLoggedIn = () => !!localStorage.getItem('authToken');

  // Sync state with localStorage when the component mounts
  useEffect(() => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    if (savedLoginStatus === 'true') {
      isLoggedIn(true); // User is logged in
    } else {
      isLoggedIn(false); // User is not logged in
    }

    // Scroll effect for navbar
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to handle login
  const handleLogin = () => {
    // Simulating a successful login
    isLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
  };

  const navStyle = {
    position: position,
    top: top,
    background: color,
  };

  return (
    <nav style={navStyle}>
      <div className="navbar">
        <ul className="nav-links left-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Motorcycles">Motorcycles</Link></li>
          <li><Link to="/Booking">Booking</Link></li>
        </ul>

        <div className="logo">
          <img src={'/images/logo.svg'} alt="Logo" />
        </div>

        <ul className="nav-links right-nav">
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
          {isLoggedIn ? (
            <li><Link to="/Profile">Profile</Link></li>
          ) : (
            <li><Link to="/Login">Login</Link></li>
            
          )}
          {/* {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>} */}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
