import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAILED":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function Signup() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [yearStarted, setYearStarted] = useState("");
  const [step, setStep] = useState(1);

  const validatePassword = (pass) => {
    return pass.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (pass === cpass) {
      if (validatePassword(pass)) {
        try {
          dispatch({ type: "FETCH_REQUEST" });
  
          // Determine user type and prepare data accordingly
          const userType = isFreelancer ? "customer" : "company";
          const requestData = {
            name,
            email,
            password: pass,
            userType,
            areaOfInterest: isFreelancer ? areaOfInterest : undefined,
            yearsOfExperience: isFreelancer ? yearsOfExperience : undefined,
            companyName: !isFreelancer ? companyName : undefined,
            companyCode: !isFreelancer ? companyCode : undefined,
            yearStarted: !isFreelancer ? yearStarted : undefined,
          };
  
          // Send data to the backend
          const { data } = await Axios.post("http://localhost:5000/user/sign-up", requestData);
  
          // Store areaOfInterest in localStorage if user is a freelancer
          if (isFreelancer && areaOfInterest) {
            localStorage.setItem("areaOfInterest", areaOfInterest);
          }
  
          localStorage.setItem("userDetails", JSON.stringify(data));
          toast.success(data.user.name + " signed up successfully");
          dispatch({ type: "FETCH_SUCCESS" });
          navigate("/personality-checker");
        } catch (err) {
          dispatch({ type: "FETCH_FAILED" });
          toast.error("Failed to sign up. Please try again.");
        }
      } else {
        toast.error(
          "Password should contain at least 1 special character, 1 digit, and 1 uppercase letter of 8-15 characters."
        );
      }
    } else {
      toast.error("Password Mismatch");
    }
  };

  const renderStep1 = () => (
    <div className="signup-step">
      <h2>Step 1: Basic Information</h2>
      <div className="form-group">
        <label htmlFor="name">
          Name<span>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          placeholder="Enter here"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">
          Email<span>*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="email"
          placeholder="Enter here"
        />
      </div>
      <div className="form-group">
        <label htmlFor="pass">
          Password<span>*</span>
        </label>
        <div className="password-container">
          <input
            type={showpass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="form-control"
            id="pass"
            placeholder="Enter Password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowpass(!showpass)}
          >
            {showpass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <p>
          Password should contain at least 1 special character, 1 digit, and 1
          uppercase letter of 8-15 characters.
        </p>
      </div>
      <div className="form-group">
        <label htmlFor="cpass">
          Re-enter Password<span>*</span>
        </label>
        <div className="password-container">
          <input
            type={showpass ? "text" : "password"}
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
            className="form-control"
            id="cpass"
            placeholder="Re-enter Password"
          />
        </div>
      </div>
      <div className="button-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep(2)}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="signup-step">
      <h2>Step 2: Additional Information</h2>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={() => setIsFreelancer(!isFreelancer)}
          id="freelancerCheck"
        />
        <label className="form-check-label" htmlFor="freelancerCheck">
          Are you a freelancer?
        </label>
      </div>

      {isFreelancer ? (
        <>
          <div className="form-group">
            <label htmlFor="areaOfInterest">
              Area of Interest<span>*</span>
            </label>
            <select
              className="form-control"
              id="areaOfInterest"
              value={areaOfInterest}
              onChange={(e) => setAreaOfInterest(e.target.value)}
            >
              <option value="" disabled>
                Select your area of interest
              </option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="full-stack">Full-Stack</option>
              <option value="devops">DevOps</option>
              <option value="iot">IoT</option>
              <option value="cloud">Cloud</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="yearsOfExperience">
              Years of Experience<span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="yearsOfExperience"
              value={yearsOfExperience}
              placeholder="Enter years of experience"
              onChange={(e) => setYearsOfExperience(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="companyName">
              Company Name<span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              value={companyName}
              placeholder="Enter company name"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyCode">
              Company Code<span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="companyCode"
              value={companyCode}
              placeholder="Enter company code"
              onChange={(e) => setCompanyCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearStarted">
              Year Started<span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="yearStarted"
              value={yearStarted}
              placeholder="Enter year started"
              onChange={(e) => setYearStarted(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="button-group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setStep(1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep(3)}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="signup-summary">
      <h2>Summary</h2>
      <div className="summary-item">
        <strong>Name:</strong> {name}
      </div>
      <div className="summary-item">
        <strong>Email:</strong> {email}
      </div>
      <div className="summary-item">
        <strong>Password:</strong> ***
      </div>
      {isFreelancer ? (
        <>
          <div className="summary-item">
            <strong>Area of Interest:</strong> {areaOfInterest}
          </div>
          <div className="summary-item">
            <strong>Years of Experience:</strong> {yearsOfExperience}
          </div>
        </>
      ) : (
        <>
          <div className="summary-item">
            <strong>Company Name:</strong> {companyName}
          </div>
          <div className="summary-item">
            <strong>Company Code:</strong> {companyCode}
          </div>
          <div className="summary-item">
            <strong>Year Started:</strong> {yearStarted}
          </div>
        </>
      )}
      <div className="button-group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setStep(2)}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSignup}
        >
          Register
        </button>
      </div>
    </div>
  );

  return (
    <div className="signup-form">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}

export default Signup;
