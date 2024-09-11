import React from 'react';
import './Home6.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
const Home6 = () => {
  return (
    <div className="home6-container">
      <div className="home6-left">
        <div className="image-wrapper">
          <img src="https://poetprabhu.in/wp-content/uploads/2020/05/professional.jpg" alt="Professional Profile Building" className="main-image" />
        </div>
      </div>
      <div className="home6-right">
        <h1>Professional Profile Building</h1>
        <p>Create a standout profile showcasing your skills, experience, and portfolio. Impress potential clients with a professional profile.</p>
        <div className="features">
          <div className="feature">
            <span className="icon"></span>
            <span>Project Showcase</span>
          </div>
          <div className="feature">
            <span className="icon"></span>
            <span>Skill Endorsements</span>
          </div>
          <div className="feature">
            <span className="icon"></span>
            <span>Client Reviews</span>
          </div>
          <div className="feature">
            <span className="icon"></span>
            <span>Portfolio Management</span>
          </div>
        </div>
        <Link to="/user/sign-up" className="sign-up-btn">Sign Up Now</Link>
      </div>
    </div>
  );
};

export default Home6;
