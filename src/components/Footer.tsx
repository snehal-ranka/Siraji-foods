import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Users, Mail } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Siraji udhyog private limited</h3>
            <p>Bringing traditional flavors to your table with authentic ingredients and time-honored recipes.</p>
            <div className="social-links">
              <a href="#" aria-label="Phone">
                <Phone size={20} />
              </a>
              <a href="#" aria-label="Location">
                <MapPin size={20} />
              </a>
              <a href="#" aria-label="About">
                <Users size={20} />
              </a>
              <a href="#" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><a href="#">Spice Mixes</a></li>
              <li><a href="#">Traditional Ingredients</a></li>
              <li><a href="#">Organic Products</a></li>
              <li><a href="#">Gift Sets</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
            <span>•</span>
            <a href="#">Cookie Policy</a>
          </div>
          <p>&copy; 2026 Site name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;