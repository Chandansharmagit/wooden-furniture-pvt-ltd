import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import Footer from "../footers/footer";
import { useNavigate } from "react-router-dom";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/verify-otp`, { otp });
      if (response.status === 200) {
        // Store OTP in localStorage
        localStorage.setItem("otp", otp);

        setSuccess("OTP verified successfully!");
        navigate("/new-password"); // Redirect to new password page
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      setError("Please enter valid otp.that sent to your email.");
    }
  };

  return (
    <div className="main-login">
      <div className="login-container">
        <div className="login-box">
          <div className="login-inner-container">
            <h1>Verify OTP</h1>
            <input
              type="text"
              placeholder="Enter OTP"
              className="login-email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="login-button" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <br />
            <br />
            <br />
            <br />
          
            <p>
              To ensure the security of your account, a One-Time Password (OTP)
              has been sent to your registered email or phone number. Please
              enter the correct OTP within 15 minutes to proceed with the
              password reset process. The OTP is a unique code that is valid for
              only one use and is set to expire after 15 minutes. If you do not
              use the OTP within this time frame, you will need to request a new
              one. This time limit is in place to protect your account from
              unauthorized access and ensure the integrity of your personal
              information. If your OTP has expired, please initiate the process
              again to receive a new code. Thank you for understanding the
              importance of this security measure.
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
            <button className="register-button">
              Register <i className="fas fa-arrow-circle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyOtp;
