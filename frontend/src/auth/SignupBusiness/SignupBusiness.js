import './Signup.css';
import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Modal from '../../components/Modal/Modal';

function SignupBusiness() {
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        user_type: 'Business',
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
      // Prevent default form submission behavior
      e.preventDefault();
    
      // Check if the user agreed to the terms
      if (!agreed) {
        NotificationManager.error('You must agree to the Terms and Conditions.');
        return; 
      }
    
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
          user_type: formData.user_type,
          password: formData.password, // Plain password to be hashed on backend
          confirm_password: formData.confirm_password,
        };
      
        try {
          const response = await axios.post("http://localhost:3000/users", userData, {
            headers: { "Content-Type": "application/json" },
          });
          console.log("Business account added:", response.data);
          NotificationManager.success('Registration success!', 'Success');
          navigate('/login');
        } catch (error) {
          console.error("Error adding user:", error);
          NotificationManager.error('Failed to add user', 'Error');
        }
      };
      
    return (
        <div className="container">
            <div className="left-panel">
                <div className="form-container">
                    <div className="header-container">
                        <h1 className="header">Business Signup</h1>
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

        <div className="form-group-last">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms">
            I agree to the{" "}
            <button className='termsbtn'
              type="button"
              onClick={() => setShowModal(true)}
              style={{

                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Terms and Conditions
            </button>
            .
          </label>
        </div>


      </div>
      <div className="form-button">
        <button type="submit" className="button">
          REGISTER
        </button>
      </div>
    </form>
    <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Terms and Conditions"
      >
        <p>
        Welcome to On The Go! By registering and using our platform as a business owner, you agree to comply with the terms and conditions outlined below. Please read these terms carefully before listing your motorcycles or engaging in transactions on our platform.
        </p>
        <br></br>
        <p className='termsbold'>General Requirements</p>
        <p>1.1. <span className='highlight'>Eligibility</span> : By using this platform, you affirm that you are legally authorized to operate as a business and offer motorcycle rentals.</p>
        <p>1.2. <span className='highlight'>Truthful Information</span> : All information provided, including motorcycle details, documents, and business credentials, must be accurate and up-to-date.</p>      
        <p>1.3. <span className='highlight'>Compliance</span> :You agree to comply with the following requirements: Business Permit, Tax Identification Number (TIN), and Certificate of Registration (COR). </p>      
      
        <p className='termsbold'>Motorcycle Listings</p>
        <p>2.1. <span className='highlight'>Ownership</span> : You must own the motorcycles you list.</p>
        <p>2.2. <span className='highlight'>Safety and Maintenance</span> : All motorcycles must be in good working condition and meet safety standards. You are responsible for regular maintenance.</p>      
        <p>2.3. <span className='highlight'>Accurate Descriptions</span> : Listings must provide accurate details, including the motorcycle’s condition, specifications, availability, and rental terms. </p>      
     
        <p className='termsbold'>Document Verification</p>
        <p>3.1. <span className='highlight'>Mandatory Documents</span> : You are required to upload the following documents for verification: Tax Identification Number (TIN), Certificate of Registration (COR), and Business Permit.</p>
        <p>3.2. <span className='highlight'>Validity</span> : Ensure that all uploaded documents are current. Expired or invalid documents must be updated immediately.</p>      
        <p>3.3. <span className='highlight'>Data Security</span> : All uploaded documents will be securely stored and used solely for verification purposes. </p>      
     

        <p className='termsbold'>Insurance and Liability</p>
        <p>4.1. <span className='highlight'>Insurance Requirement</span> : Each motorcycle listed on the platform must have valid insurance coverage that includes theft, damage, and third-party liability.</p>
        <p>4.2. <span className='highlight'>Liability</span> : You are solely responsible for any accidents, damages, or legal disputes arising from the rental of your motorcycles.</p>      
        <p>4.3. <span className='highlight'>Platform Disclaimer</span> : On the go is not liable for disputes or damages related to transactions between business owners and customers. </p>      
     
        <p className='termsbold'>Subscription Terms</p>
        <p>5.1. <span className='highlight'>Eligibility</span> : By subscribing to our platform, you confirm that you are authorized to make financial commitments on behalf of your business and agree to the subscription terms outlined herein.</p>
        <p>5.2. <span className='highlight'>Subscription Plans</span> : All subscription plans, including their features, prices, and durations, are detailed on the platform. It is your responsibility to select a plan that meets your business needs.</p>      
        <p>5.3. <span className='highlight'>Changes to Subscription Terms</span> : We may update subscription pricing or features at our discretion. Any changes will be communicated at least [X days] in advance. Continued use of the platform after such changes constitutes acceptance of the new terms.</p>      
     

      </Modal>
      
                    <div className="footer">
                        <p className="footer-text">
                            Have an account already? <Link to="/Login" className="footer-link">Login</Link> instead
                        </p>
                    </div>
                </div>
            </div>
            <div className="right-panel-signup"></div>
        </div>
    );
}

export default SignupBusiness;
