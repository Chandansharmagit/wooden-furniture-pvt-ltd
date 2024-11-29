import React from "react";
import './authloader.css';
import Footer from "../footers/footer";
const AuthLoader = () => {
  return (
    <div>
      <div class="auth-wrapper">
        <div class="auth-container">
          <div class="auth-ball"></div>
          <div class="auth-ball"></div>
          <div class="auth-ball"></div>
          <div class="auth-ball"></div>
          <div class="auth-ball"></div>
        </div>
        <p id="auth-message">Checking authentication, please wait...</p>
      </div>
      <Footer/>
    </div>
  );
};

export default AuthLoader;
