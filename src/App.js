import React from "react";
import Expense from "./Expense";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from './Home';
import { useContext } from "react";
import { Store } from "./Store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checker from "./Checker";
import Profile from "./Profile";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails } = state;
  return (
    <Router>
      <Routes>
        {!userDetails && <Route path="/" element={<Home/>}/>}
        {!userDetails && <Route path="/user/sign-up" element={<Signup/>}/>}
        {userDetails &&  <Route path="/" element={<Home/>}/>}
        {!userDetails && <Route path="/user/sign-in" element={<Signin/>}/>}
        {!userDetails && <Route path="/personality-checker" element={<Signup/>}/>}
        {userDetails && <Route path="/personality-checker" element={<Checker/>}/>}
        {userDetails &&  <Route path="/profile" element={<Profile/>}/>}
        {!userDetails &&  <Route path="/profile" element={<Home/>}/>}
      </Routes>
    </Router>
  );
}
export default App;
