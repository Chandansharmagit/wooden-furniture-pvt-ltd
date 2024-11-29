import React, { useState } from "react";
import "./Login.css"; // Create a CSS file for styling the popup
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Renamed variable
const PLogin = ({ setShowLoginPopup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(`${apiBaseUrl}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setShowLoginPopup(false); // Close the popup after login
        const { token } = response.data;
        console.log("Token data:", token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("usertoken", token);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const googleAuth = () => {
    window.open(`${apiBaseUrl}/auth/google/callback`, `_self`);
  };

  const closePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div>
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="popup-image">
            <img
              src="https://t4.ftcdn.net/jpg/04/54/05/57/360_F_454055775_7QBsHbb6Jo4TrGLkFDoMqGwNiF55ydqr.jpg"
              alt="Login Illustration"
              className="login-image"
            />
          </div>
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Add validation
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Add validation
              />
              <button type="submit">Login</button>

              {/* Google Login Icon */}
              <button type="button" className="google-login" onClick={googleAuth}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  id="google"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
                Login with Google 
              </button>

              {error && <p className="error">{error}</p>}

              <button type="button" onClick={closePopup}>Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PLogin;
