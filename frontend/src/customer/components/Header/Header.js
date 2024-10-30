import React, { useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({position,top, color}) {
  useEffect(() => {
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
  }, []); 
  const navStyle = {
   
     position: position,
     top: top,
     background: color
  };

  return (
    <nav style={navStyle}>
      <div className="navbar">
        <ul className="nav-links left-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Listing">Listing</Link></li>
          <li><Link to="/Booking">Booking</Link></li>
        </ul>

        <div className="logo">
          <img src={'/images/logo.svg'} alt="Logo" />
        </div>

        <ul className="nav-links right-nav">
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
          <li><Link to="/Login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
