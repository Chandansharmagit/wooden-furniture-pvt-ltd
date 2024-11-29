
import React, { useState } from "react";
import "./footer.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
  });
  const [messages, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handlepolicy = () => {
    navigate("/policy");
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/subscribed_email_saving",
        formdata
      );
      if (response.status === 200) {
        setMessage("Thanks for Subscribing to us..!");
        setIsSubscribed(true);
        setTimeout(() => {
          setIsSubscribed(false);
          setFormdata("");
        },2000)
      } else {
        setMessage("Failed to Subscribing us..!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <footer>
        <form onSubmit={handlesubmit}>
          <div className="content">
            <div className="top">
              <div className="logo-details">
                <i className="fab fa-slack"></i>
                <span className="logo_name">Wooden Furniture Pvt. Ltd.</span>
              </div>
              <div className="media-icons">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="link-boxes">
              <ul className="box">
                <li className="link_name">Company</li>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Get started</a>
                </li>
              </ul>
              <ul className="box">
                <li className="link_name">Services</li>
                <li>
                  <a href="#">App design</a>
                </li>
                <li>
                  <a href="#">Web design</a>
                </li>
                <li>
                  <a href="#">Logo design</a>
                </li>
                <li>
                  <a href="#">Banner design</a>
                </li>
              </ul>
              <ul className="box">
                <li className="link_name">Account</li>
                <li>
                  <a href="#">Profile</a>
                </li>
                <li>
                  <a href="#">My account</a>
                </li>
                <li>
                  <a href="#">Preferences</a>
                </li>
                <li>
                  <a href="#">Purchase</a>
                </li>
              </ul>
              <ul className="box">
                <li className="link_name">Courses</li>
                <li>
                  <a href="#">HTML & CSS</a>
                </li>
                <li>
                  <a href="#">JavaScript</a>
                </li>
                <li>
                  <a href="#">Photography</a>
                </li>
                <li>
                  <a href="#">Photoshop</a>
                </li>
              </ul>
              <ul className="box input-box">
                <li className="link_name">Subscribe</li>
                <li>
                  {/* {isSubscribed ? ( // Show message if subscribed
                    <span>{messages}</span>
                  ) : ( */}
                  <input
                    type="text"
                    name="email"
                    value={formdata.email}
                    onChange={handlechange}
                    placeholder="Enter your email"
                  />
                  {/* )} */}
                </li>

                {isSubscribed ? (
                  <span>{messages}</span>
                ) : (
                  <li>
                    <input type="submit" value="Subscribe" />
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="bottom-details">
            <div className="bottom_text">
              <span className="copyright_text">
                Copyright © 2024 <a href="#">Wooden Furniture Pvt. Ltd.</a> All rights
                reserved
              </span>
              <span className="policy_terms">
                <a href="" onClick={handlepolicy}>Privacy policy</a>
                <a href="">Terms & conditions</a>
              </span>
            </div>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
