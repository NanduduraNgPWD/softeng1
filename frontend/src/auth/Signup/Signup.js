import './Signup.css';
import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';




const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
      });
  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Check if password and confirm password match
        if (formData.password !== formData.confirm_password) {
            NotificationManager.error('Password do not match!', 'Error');
          return;
        }
      
        // Prepare the data to send to the backend
        const userData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password, // Plain password to be hashed on backend
          confirm_password: formData.confirm_password,
        };
      
        try {
          const response = await axios.post("http://localhost:3000/users", userData, {
            headers: { "Content-Type": "application/json" },
          });
          console.log("User added:", response.data);
          NotificationManager.success('Registration success!', 'Success');
          navigate('/login');
        } catch (error) {
          console.error("Error adding user:", error);
          NotificationManager.error('Failed to add user', 'Error');
        }
      };
      
    return (
        <div className="container">
             <div className="right-panel-signup1"></div>
            <div className="left-panel">
                <div className="form-container1">
                    <div className="header-container">
                        <h1 className="header">Create an account</h1>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                                <path d="M18 6 6 18" />
                                <path d="M6 6 18 18" />
                            </svg>
                        </Link>
                    </div>
                    <form className="form" id="registrationForm" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Row 1: First Name and Last Name */}
        <div className="form-group">
          <label className="label">FIRST NAME</label>
          <input
            type="text"
            className="input"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">LAST NAME</label>
          <input
            type="text"
            className="input"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Row 2: Email Address and Phone */}
        <div className="form-group">
          <label className="label">EMAIL ADDRESS</label>
          <input
            type="email"
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">PHONE NUMBER</label>
          <input
            type="text"
            className="input"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        {/* Row 3: Password and Confirm Password */}
        <div className="form-group">
          <label className="label">PASSWORD</label>
          <input
            type="password"
            className="input"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">CONFIRM PASSWORD</label>
          <input
            type="password"
            className="input"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-button">
        <button type="submit" className="button">
          REGISTER
        </button>
      </div>
    </form>
                    <div className="footer">
                        <p className="footer-text">
                            Have an account already? <Link to="/Login" className="footer-link">Login</Link> instead
                        </p>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default Signup;
