import React, { useState } from "react";
import "./Chat.css";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Dynamic API URL

const AdminChat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [feedalert, setFeedbackalert] = useState("");
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    text: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/api/feedback`, formdata);
      console.log(response.data);

      setFeedbackalert("Feedback sent successfully!");

      // Reset form fields
      setFormdata({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        text: "",
      });
    } catch (error) {
      console.error("There was an error sending the feedback!", error);
      setFeedbackalert("There was an error sending the feedback!");
    }
  };

  return (
    <>
      {isVisible && (
        <div className="popup-overlay" onClick={toggleVisibility}></div>
      )}
      <div className="admin-chat-container">
        <div className="admin-chat-btn" onClick={toggleVisibility}>
          <p className="admin-chat-txt">Sent_us_Feedback!</p>
        </div>
        <div className={`admin-message-box ${isVisible ? "show" : ""}`}>
          <div className="admin-message-header">
            <h2>Your Feedback helps us to improve us!</h2>
            <button className="admin-close-btn" onClick={toggleVisibility}>
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="admin-message-form">
            <div className="imageside">
              <div className="iamgeitems" id="images_id">
                <img
                  src="https://i.etsystatic.com/23133854/r/il/d6b369/2458229210/il_fullxfull.2458229210_3q61.jpg"
                  alt=""
                  className="images_id"
                />
              </div>
              <div className="iamgeitems" id="feedback">
                <input
                  type="text"
                  className="feed"
                  placeholder="First Name"
                  name="firstname"
                  value={formdata.firstname}
                  onChange={handlechange}
                  required
                />
                <input
                  type="text"
                  className="feed"
                  placeholder="Last Name"
                  name="lastname"
                  value={formdata.lastname}
                  onChange={handlechange}
                  required
                />
                <input
                  type="text"
                  className="feed"
                  placeholder="Email"
                  name="email"
                  value={formdata.email}
                  onChange={handlechange}
                  required
                />
                <input
                  type="text"
                  className="feed"
                  placeholder="Contact"
                  name="contact"
                  value={formdata.contact}
                  onChange={handlechange}
                  required
                />
                <textarea
                  name="text"
                  id="text"
                  className="textarea"
                  value={formdata.text}
                  onChange={handlechange}
                  placeholder="Please enter your feedback here "
                ></textarea>
                {feedalert && <h4 className="feedback-alert">{feedalert}</h4>}
                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminChat;
