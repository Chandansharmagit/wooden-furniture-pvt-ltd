// src/components/Register.js
import React, { useState } from "react";
import "./login.css";
import Footer from "../footers/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const passwordValidation = (password) => {
  // Regex for strong password: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

const Register = () => {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const googleAuth = () => {
    window.open(`${apiBaseUrl}/auth/google/callback`, `_self`);
  };

  const account = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });

    if (name === "password") {
      const isStrongPassword = passwordValidation(value);
      if (!isStrongPassword) {
        setPasswordStrength(
          "Your password is too weak. Please follow the guidelines."
        );
      } else {
        setPasswordStrength(
          "Strong Password Detected. Now you can safely Sign in."
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordValidation(formdata.password)) {
      setErrorMessage("Password does not meet the required strength.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/register`,
        formdata
      );
      console.log(response.data);
      alert("Data saved");
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("There was an error registering!");
      }
      console.error("There was an error registering!", error);
    }
  };

  return (
    <div className="main-login">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="register-box">
            <div className="register-inner-container">
              <i className="fas fa-user-plus fa-5x"></i>
              <h2 className="hello-friends">Hello, friend!</h2>
              <p className="hello-friends1">
                Enter your personal details and start your journey with us
              </p>
              <button className="register-button" onClick={account}>
                Already have an account!{" "}
                <i className="fas fa-arrow-circle-right"></i>
              </button>
            </div>
          </div>
          <div className="login-box">
            <div className="login-inner-container">
              <h1>Register</h1>
              <input
                type="text"
                placeholder="Enter Username"
                className="login-email"
                name="name"
                value={formdata.name}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Enter Contact"
                className="login-password"
                name="contact"
                value={formdata.contact}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                className="login-email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="login-password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
              />
              {passwordStrength && (
                <p className="password-strength">{passwordStrength}</p>
              )}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <a href="#" className="forgot-password" onClick={account}>
                Already have an Account?
              </a>
              <button className="login-button" type="submit">
                Sign up
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
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
