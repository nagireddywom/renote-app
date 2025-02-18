import React from 'react';
import '../Styles/privacypage.css';

const PrivacyPage = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1 className="privacy-title">Privacy Policy</h1>
        
        <div className="last-updated">
          Last updated: July 15, 2024
        </div>

        <div className="privacy-intro">
          <p>
            This privacy notice for ReNote AI Pvt Ltd (doing business as ReNote AI) ('we', 'us', or 'our'), 
            describes how and why we might collect, store, use, and/or share ('process') your information 
            when you use our services ('Services').
          </p>
        </div>

        <section className="privacy-section">
          <h2>Summary of Key Points</h2>
          <div className="summary-points">
            <div className="summary-item">
              <h3>Personal Information Collection</h3>
              <p>We collect information you provide when using our Services, including:</p>
              <ul className="privacy-list">
                <li>Names and contact information</li>
                <li>Account credentials</li>
                <li>Device and usage information</li>
                <li>Application data</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <div className="info-collection">
            <h3>Personal Information You Disclose</h3>
            <p>We collect personal information that you voluntarily provide when you:</p>
            <ul className="privacy-list">
              <li>Register on our Services</li>
              <li>Express interest in our products</li>
              <li>Contact us for support</li>
              <li>Participate in activities on our Services</li>
            </ul>
          </div>
        </section>

        <section className="privacy-section">
          <h2>How We Process Your Information</h2>
          <p>
            We process your information to provide, improve, and administer our Services, 
            communicate with you, ensure security, and comply with legal obligations.
          </p>
          <ul className="privacy-list">
            <li>To facilitate account creation and management</li>
            <li>To deliver and facilitate delivery of services</li>
            <li>To respond to user inquiries and provide support</li>
            <li>To send administrative information</li>
            <li>To protect our Services</li>
            <li>To improve user experience</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Information Sharing</h2>
          <p>
            We may share information in specific situations and with specific categories of third parties, 
            primarily with Data Analytics Services.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Data Retention</h2>
          <p>
            We keep your information for as long as necessary to fulfill the purposes outlined in this 
            privacy notice unless otherwise required by law.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Your Privacy Rights</h2>
          <p>
            You may review, change, or terminate your account at any time. To exercise your rights, 
            you can:
          </p>
          <ul className="privacy-list">
            <li>Log in to your account settings to update your information</li>
            <li>Contact us to request data deletion</li>
            <li>Withdraw your consent for data processing</li>
          </ul>
        </section>

        <section className="privacy-section contact-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy notice, please email us at{' '}
            <a href="mailto:info@renote.ai" className="contact-link">
              info@renote.ai
            </a>
          </p>
        </section>
      </div>

      <footer className="privacy-footer">
        <p>For the full privacy policy, please contact us or visit our website.</p>
      </footer>
    </div>
  );
};

export default PrivacyPage;