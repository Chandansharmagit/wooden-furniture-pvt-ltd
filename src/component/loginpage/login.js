// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import Footer from "../footers/footer";
import { useNavigate } from "react-router-dom";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleAuth = () => {
    window.open('https://backendwoodennepal.nepalmodelsecondaryschool.com/auth/google/callback', '_self');
  };

  const register = () => {
    navigate("/register-here");
  };

  const forgot = () => {
    navigate("/forget-password");
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/api/login`, {
        email,
        password,
      });
      const { token } = response.data;
      console.log("token data", token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("usertoken", token);
      navigate("/");
      window.location.reload(); // Refresh the page after successful login
    } catch (error) {
      setError("Invalid email or password");
    }
  };
  

  return (
    <div className="main-login">
      <div>
        <div className="login-container">
          <div className="login-box">
            <div className="login-inner-container">
              <h1>Log in</h1>
              <input
                type="email"
                placeholder="Email"
                className="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              {error && <p className="error">{error}</p>}
              <br />
              <a className="forgot-password" onClick={forgot}>
                Are you forgot your Password ?
              </a>
              <button className="login-button" onClick={handleSubmit}>
                Log in
              </button>
              <br />
              <hr />
              <p>Or Connect With</p>
              <hr />
              <br />
              <button
                type="button"
                className="login-button"
                onClick={googleAuth}
              >
                Sign in with Google
              </button>
              <br />
              <br />
              <p className="hello-friends1">
                Feel Secured! Your data is End-to-End Encrypted.
              </p>
            </div>
          </div>
          <div className="register-box">
            <div className="register-inner-container">
              <i className="fas fa-user-plus fa-5x"></i>
              <h2 className="hello-friends">Hello, friend!</h2>
              <p className="hello-friends1">
                Enter your personal details and start your journey with us
              </p>
              <button className="register-button" onClick={register}>
                Register <i className="fas fa-arrow-circle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
