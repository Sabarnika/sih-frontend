import React from 'react';
import './Home5.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
const Home5 = () => {
  return (
    <div className="home5-container">
      <div className="home5-left">
        <h1>Secure Payment System</h1>
        <p>Rest assured with our secure escrow account system that protects your earnings and ensures fair payment for your work.</p>
        <div className="features">
          <div className="feature">
            <span className="icon"></span>
            <span>Enhanced Job Matching</span>
          </div>
          <div className="feature">
            <span className="icon"></span>
            <span>Performance-Based Profiles</span>
          </div>
        </div>
        <Link to="/user/sign-up" className="sign-up-btn">Sign Up Now</Link>
      </div>
      <div className="home5-right">
        <div className="home5-images">
          <img src="https://static.vecteezy.com/system/resources/previews/002/061/431/original/people-hold-security-key-to-open-padlock-and-get-access-to-hack-privacy-activities-and-history-of-user-data-can-be-used-for-landing-page-template-ui-ux-web-mobile-app-poster-banner-website-flyer-ads-free-vector.jpg" alt="Secure Payment System" className="main-image" />
          <div className="overlay-image">
            <img src="https://i.pinimg.com/564x/25/45/c4/2545c40213ca778da88adf3ceb181be1.jpg" alt="Payment Graphic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home5;
