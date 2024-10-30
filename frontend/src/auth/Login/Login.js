import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
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
                    <form className="form">
                        <div className="form-group">
                            <label className="label">EMAIL ADDRESS</label>
                            <input type="email" className="input" />
                        </div>
                        <div className="form-group">
                            <label className="label">PASSWORD</label>
                            <a href="#" className="forgot-password">Forgot password?</a>
                            <div className="password-container">
                                <input type="password" className="input" />
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
