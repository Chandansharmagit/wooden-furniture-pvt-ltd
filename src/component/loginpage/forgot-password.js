import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import Footer from "../footers/footer";
import { useNavigate } from "react-router-dom";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Use the environment variable

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [method, setMethod] = useState("email"); // default to email
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true); // Set loading to true when sending OTP
    try {
      const url =
        method === "email"
          ? `${apiBaseUrl}/api/send-otp-email?email=${encodeURIComponent(email)}`
          : `${apiBaseUrl}/api/send-otp-contact?contact=${encodeURIComponent(contact)}`;

      const response = await axios.get(url);

      if (response.status === 200) {
        // Store email or contact in localStorage
        localStorage.setItem("resetMethod", method);
        localStorage.setItem("resetEmail", method === "email" ? email : "");
        localStorage.setItem("resetContact", method === "contact" ? contact : "");
        setError("Otp Sent Successfully..!");
        setTimeout(() => {
          setLoading(false); // Stop loading
          navigate("/verify-otp");
        }, 1000); // Adding a delay to show success message
      } else {
        setLoading(false); // Stop loading on failure
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message || "Provided email/contact not found in the database");
      } else {
        setError("An error occurred. Please try with email.");
      }
    }
  };

  const register = () => {
    navigate("/register-here");
  };

  return (
    <div className="main-login">
      <div className="login-container">
        <div className="login-box">
          <div className="login-inner-container">
            <h1>Recover Account</h1>
            <input
              type="email"
              placeholder="Email"
              className="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={method !== "email"}
            />
            <br />
            <hr />
            <p>Or</p>
            <hr />
            <br />
            <input
              type="text"
              placeholder="Enter Contact"
              className="login-password"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              disabled={method !== "contact"}
            />
            <br />
            <label>
              <input
                type="radio"
                name="method"
                value="email"
                checked={method === "email"}
                onChange={() => setMethod("email")}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                name="method"
                value="contact"
                checked={method === "contact"}
                onChange={() => setMethod("contact")}
              />
              Contact
            </label>
            <br />
            <button className="login-button" onClick={sendOtp} disabled={loading}>
              {loading ? "Sending OTP..." : "Submit"}
            </button>
            {error && <p className="error-message">{error}</p>}
            <br />
            <br />
            <br />
            <br />
            <p>
              Please enter the correct email or contact for verification. We
              will send you an OTP (One Time Password) through your selected
              method. You can create a new password and successfully continue
              to your account.
            </p>
          </div>
        </div>
        <div className="register-box">
          <div className="register-inner-container">
            <i className="fas fa-user-plus fa-5x"></i>
            <h2 className="hello-friends">Hello, friend!</h2>
            <p className="hello-friends1">
              Enter your personal details and start your journey with us.
            </p>
            <button className="register-button" onClick={register}>
              Register <i className="fas fa-arrow-circle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
