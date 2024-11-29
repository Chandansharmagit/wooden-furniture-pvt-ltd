import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import Footer from "../footers/footer";
import { useNavigate } from "react-router-dom";

const passwordValidation = (password) => {
  // Regex for strong password: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Use environment variable for API base URL

const New_password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to control button enabled/disabled
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve OTP from localStorage
    const storedOtp = localStorage.getItem("otp");
    if (storedOtp) {
      setOtp(storedOtp);
    } else {
      navigate("/forget-password");
    }
  }, [navigate]);

  useEffect(() => {
    // Update button disabled state based on password strength
    const isStrongPassword = passwordValidation(password);
    setIsButtonDisabled(!isStrongPassword || password !== confirmPassword);

    if (!isStrongPassword) {
      setPasswordStrength("Your password is too weak. Please follow the guidelines.");
    } else {
      setPasswordStrength(
        password !== confirmPassword ? "Strong Password Detected. Now you can change your password." : ""
      );
    }
  }, [password, confirmPassword]);

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordValidation(password)) {
      setError("Password does not meet the required strength.");
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/api/reset-password`, { // Use apiBaseUrl
        otp, // Include the OTP in the request body
        newPassword: password,
      });

      if (response.status === 200) {
        setSuccess("Password reset successfully!");
        localStorage.removeItem("otp"); // Clear the OTP from localStorage
        navigate("/login"); // Redirect to login page
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (passwordValidation(newPassword)) {
      setPasswordStrength("");
    } else if (newPassword.length >= 8) {
      setPasswordStrength("Your password is too weak");
    } else {
      setPasswordStrength("");
    }
  };

  return (
    <>
      <div className="main-login">
        <div className="login-container">
          <div className="login-box">
            <div className="login-inner-container">
              <h1>Change Password</h1>
              <div className="password-field-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="login-email"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="login-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {password && (
                <p className="password-strength">{passwordStrength}</p>
              )}
              <p>You cannot change the password unless you enter a strong password.</p>
              <button
                className="login-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
              <button
                className={`login-button ${!isButtonDisabled ? "enabled" : ""}`}
                onClick={handleChangePassword}
                disabled={isButtonDisabled}
              >
                Change Password
              </button>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <br />
              <br />
              <p>
                Strong passwords protect your sensitive information from
                unauthorized access and potential misuse. They help safeguard
                your accounts from hackers and reduce the risk of identity
                theft, financial loss, and privacy breaches. By following best
                practices for creating strong passwords, you can enhance your
                online security and ensure that your personal data remains
                protected.
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
    </>
  );
};

export default New_password;
