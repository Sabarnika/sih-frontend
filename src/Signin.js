import React, { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Store } from "./Store";
import { toast } from "react-toastify";
import { getError } from "./Util";
import Axios from "axios";
import Loading from "./Loading";
import './Signin.css';

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

function Signin() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showpass, setShowpass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await Axios.post("http://localhost:5000/user/sign-in", {
        email,
        password: pass,
      });

      localStorage.setItem("userDetails", JSON.stringify(data));
      localStorage.setItem("areaOfInterest", data.user.areaOfInterest);

      ctxDispatch({ type: "SIGN_IN", payload: data });
      toast.success(data.user.name + " signed in successfully");
      dispatch({ type: "FETCH_SUCCESS" });
      navigate("/");
    } catch (err) {
      dispatch({ type: "FETCH_FAILED" });
      toast.error(getError(err));
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await Axios.post("http://localhost:5000/auth/google", {
        token: response.credential,
      });

      localStorage.setItem("userDetails", JSON.stringify(data));
      localStorage.setItem("areaOfInterest", data.user.areaOfInterest);

      ctxDispatch({ type: "SIGN_IN", payload: data });
      toast.success(data.user.name + " signed in successfully with Google");
      dispatch({ type: "FETCH_SUCCESS" });
      navigate("/");
    } catch (err) {
      dispatch({ type: "FETCH_FAILED" });
      toast.error(getError(err));
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
            <input
              type={showpass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="form-control"
              id="pass"
              placeholder="Enter here"
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setShowpass(!showpass)}
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show Password
            </label>
          </div>
          <div className="signup-container">
            <span>Create Account?</span>
            <button
              type="button"
              onClick={() => navigate("/user/sign-up")}
              className="primary"
            >
              SignUp
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="google-login-container">
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onFailure={(error) => toast.error('Google login failed: ' + error)}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

export default Signin;
