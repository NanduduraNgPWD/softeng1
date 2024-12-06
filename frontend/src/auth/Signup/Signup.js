import './Signup.css';
import { Link } from 'react-router-dom';

function Signup() {
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
                    <form className="form">
    <div className="form-grid">
        {/* Row 1: First Name and Last Name */}
        <div className="form-group">
            <label className="label">FIRST NAME</label>
            <input type="text" className="input" />
        </div>
        <div className="form-group">
            <label className="label">LAST NAME</label>
            <input type="text" className="input" />
        </div>

        {/* Row 2: Email Address and phone */}
        <div className="form-group">
            <label className="label">EMAIL ADDRESS</label>
            <input type="email" className="input" />
        </div>
        <div className="form-group">
            <label className="label">PHONE NUMBER</label>
            <input type="text" className="input" />
        </div>

        {/* Row 3: Password and Confirm Password */}
        <div className="form-group">
            <label className="label">PASSWORD</label>
            <input type="password" className="input" />
        </div>
        <div className="form-group">
            <label className="label">CONFIRM PASSWORD</label>
            <input type="password" className="input" />
        </div>
    </div>
    <div className="form-button">
        <button type="submit" className="button">REGISTER</button>
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
