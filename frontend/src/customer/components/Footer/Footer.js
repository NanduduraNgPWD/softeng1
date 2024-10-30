import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const test = "Hell";
  return (
    <footer id="footer">
      {test === "Hello" ? (<h2>this is test </h2> ):  

       ( <div className="footer-container">
            <div className="footer-section">
                <h4>Sections</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Listing">Listing</Link></li>
                    <li><Link to="/Booking">Booking</Link></li>
                    <li><Link to="/About">About</Link></li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>Services</h4>
                <ul>
                    <li><Link to="/Listing">Rental</Link></li>
                    <li><Link to="/Partner">Become a partner</Link></li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>Others</h4>
                <ul>
                    <li><a href="">FAQ</a></li>
                    <li><a href="">Newsletter</a></li>
                    <li><a href="">Blog</a></li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>Get in touch</h4>
                <ul>
                    <li>+63 9538 042 766</li>
                    <li><a href="mailto:me@gmail.com">onthego@rental.com</a></li>
                </ul>
            </div>
        </div>
        )}
    </footer>

  );
}

export default Footer;
