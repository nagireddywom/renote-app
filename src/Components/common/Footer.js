import React from 'react';
import { BookOpen, Github, Twitter, Linkedin,Instagram, MapPin, Phone, Mail, Facebook } from 'lucide-react';
import TermsPage from '../../Pages/TermsPage';
import { Link } from 'react-router-dom'; 
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <div className="brand-section">
            <div className="brand-logo">
              <BookOpen className="icon-book" />
              <span className="logo-text">ReNoteAI</span>
            </div>
            <p className="brand-description">
              Merging sustainability with smart technology for better note-taking.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/people/ReNote-AI/61568234070306/ " target="_blank" rel="noopener noreferrer" className="social-icon">
                <Facebook />
              </a>
              <a href="https://x.com/ReNote_AI?t=65Ubm8s6UJ5NUM2dsBmEcg&s=09&mx=2 " target="_blank" rel="noopener noreferrer" className="social-icon">
                <Twitter />
              </a>
              <a href="https://www.linkedin.com/company/renoteai/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Linkedin />
              </a>
              <a href="https://www.instagram.com/renote.ai/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <Instagram />
              </a>
            </div>
          </div>

          <div className="contact-info">
            <div className="address-block">
              <MapPin className="contact-icon" />
              <p>ReNote AI Pvt Ltd, T-Hub Phase 2.0, Madhapur, Hyderabad, Telangana, India - 500081</p>
            </div>
            <div className="phone-block">
              <Phone className="contact-icon" />
              <p>+91 9666363363, +91 8886663326</p>
            </div>
            <div className="email-block">
              <Mail className="contact-icon" />
              <a href="mailto:sales@renote.ai">sales@renote.ai</a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <div className="quick-links">
            {['Product', 'Company', 'Resources'].map((title) => (
              <div key={title} className="links-column">
                <h3 className="column-title">{title}</h3>
                <ul>
                  {['Features', 'Pricing', 'About', 'Contact'].map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="legal-links">
        <Link to="/terms" className="legal-link">Terms and Conditions</Link>
          <span className="separator">|</span>
          <Link to="/privacy" className="legal-link">Privacy Policy</Link>
        </div>
        <p className="copyright">&copy; 2025 ReNoteAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;