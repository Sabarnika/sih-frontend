import React from 'react';
import './Home4.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
const Home4 = () => {
  return (
    <div className="home4-container">
      <div className="home4-left">
        <div className="home4-image">
          <img src="https://cdn.elearningindustry.com/wp-content/uploads/2018/05/tips-select-user-friendly-lms-learning-management-system-aligns-skills-expertise-team-1024x574.jpg" alt="User-Friendly Platform" />
        </div>
        <div className="home4-steps">
          <div className="step">1</div>
          <div className="step">2</div>
          <div className="step">3</div>
        </div>
      </div>
      <div className="home4-right">
        <h1>User-Friendly Platform</h1>
        <p>Our platform is designed for easy navigation and setup. No complicated processes or technical skills required.</p>
        <p>Explore the benefits of our platform and how it can enhance your freelance experience.</p>
        <Link to="/user/sign-up" className="sign-up-btn">Sign Up Now</Link>
      </div>
    </div>
  );
};

export default Home4;
