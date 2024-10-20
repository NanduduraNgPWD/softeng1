import './Signup.css';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="container">
            <div className="left-panel">
                <div className="form-container">
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
                        <div className="form-group">
                            <label className="label">EMAIL ADDRESS</label>
                            <input type="email" className="input" />
                        </div>
                        <div className="form-group">
                            <label className="label">PASSWORD</label>
                            <div className="password-container">
                                <input type="password" className="input" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">CONFIRM PASSWORD</label>
                            <div className="confirm-password-container">
                                <input type="password" className="input" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="button">LOGIN</button>
                        </div>
                    </form>
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

export default Signup;
