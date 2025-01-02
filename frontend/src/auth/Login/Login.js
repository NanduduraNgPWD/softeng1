import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:3000/api/login', formData, {
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.data.token) {
            // Store the token
            localStorage.setItem('authToken', response.data.token);
      
            // Decode the token to get user_type
            const decodedToken = jwtDecode(response.data.token);
            console.log('Decoded Token:', decodedToken); // Verify user_type is present
      
            // Redirect based on user_type
            if (decodedToken.user_type === 'Business') {
              navigate('/business'); // Navigate to BusinessApp
            } else if (decodedToken.user_type === 'Customer') {
              navigate('/'); // Navigate to CustomerApp (default)
            } else {
              console.error('Unknown user_type:', decodedToken.user_type);
            }
          } else {
            alert('Invalid credentials.');
          }
        } catch (error) {
          console.error('Error logging in:', error);
          alert('Failed to log in. Please check your credentials.');
        }
      };
      
      
      
    

    return (
        <div className="container">
            <div className="left-panel">
                <div className="form-container">
                    <div className="header-container">
                        <img src={'/images/logo.svg'} alt="Logo" />
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                                <path d="M18 6 6 18" />
                                <path d="M6 6 18 18" />
                            </svg>
                        </Link>
                    </div>
                    <h1 className="headerLogin">Welcome back</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="label">EMAIL ADDRESS</label>
                            <input
                             className='input'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
                        </div>
                        <div className="form-group">
                            <label className="label">PASSWORD</label>
                            <a href="#" className="forgot-password">Forgot password?</a>
                            <div className="password-container">
                            <input
                            className='input'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
                            </div>
                        </div>
                        <div className="checkbox-container">
                            <input type="checkbox" className="checkbox" />
                            <label className="checkbox-label">Remember me</label>
                        </div>
                        <div>
                            <button type="submit" className="button">LOGIN</button>
                        </div>
                    </form>
                    <div className="footer">
                        <p className="footer-text">
                            Don’t have an account? <Link to="/Signup" className="footer-link">Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="right-panel"></div>
        </div>
    );
}

export default Login;
