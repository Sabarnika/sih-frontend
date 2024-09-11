import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Profile.css'; // Import the CSS file

function Profile() {
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [selectedAreaOfInterest, setSelectedAreaOfInterest] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (userDetails) {
        const { areaOfInterest, yearsOfExperience } = userDetails.user;

        // Set area of interest and determine user level
        setAreaOfInterest(areaOfInterest || 'Not provided');

        if (yearsOfExperience < 2) {
          setUserLevel('Beginner');
        } else if (yearsOfExperience < 5) {
          setUserLevel('Experienced');
        } else {
          setUserLevel('Professional');
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdateAreaOfInterest = () => {
    navigate('/personality-checker', { state: { areaOfInterest: selectedAreaOfInterest } });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-details">
        <h2 className="profile-greeting">Hi</h2>
        <p className="profile-info">
          <strong>Area of Interest:</strong> {areaOfInterest}
        </p>
        <p className="profile-info">
          <strong>Level:</strong> {userLevel}
        </p>
        
        <div className="update-section">
          <label htmlFor="areaOfInterest" className="update-label">
            Select Area of Interest:
          </label>
          <select
            id="areaOfInterest"
            value={selectedAreaOfInterest}
            onChange={(e) => setSelectedAreaOfInterest(e.target.value)}
            className="update-select"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="data-science">Data Science</option>
            <option value="devops">DevOps</option>
          </select>
          <button onClick={handleUpdateAreaOfInterest} className="update-button">
            Update Area of Interest
          </button>
        </div>
        
        <button onClick={() => navigate('/personality-checker')} className="update-profile-button">
          Update Profile
        </button>
        <button onClick={handleBack} className="back-button">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Profile;
