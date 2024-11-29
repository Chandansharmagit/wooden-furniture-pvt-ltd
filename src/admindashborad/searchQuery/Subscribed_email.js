import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "../../Userdashbboard/sidebar";
import Footer from "../../component/footers/footer";

const Subscribed_email = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackAlert, setFeedbackAlert] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchSubscribedEmails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/Subscribed_emailGett"
        );
        setFeedbacks(response.data.reverse());
      } catch (error) {
        console.error("Error fetching subscribed emails:", error);
        setFeedbackAlert("Error fetching subscribed emails!");
      }
    };
    fetchSubscribedEmails();
  }, []);

  const handleDeleteSubscribedEmail = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/subscribed-emails/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
      setFeedbackAlert("Subscribed email deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the subscribed email!", error);
      setFeedbackAlert("There was an error deleting the subscribed email!");
    }
  };
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Email here"
        value={searchInput}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="feedback-page-container">
        
        <h1>Subscribed Emails</h1>
       
        {feedbackAlert && <h4 className="feedback-alert">{feedbackAlert}</h4>}
        <div className="feedback-grid">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-item">
              <p>User ID: {feedback.id}</p>
              <p>
                <strong>Email:</strong> {feedback.email}
              </p>
              <p>
                <strong>Date and Time:</strong> {feedback.createdAt}
              </p>
              <button
                className="delete-btn"
                onClick={() => handleDeleteSubscribedEmail(feedback.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <SidebarMenu />
      <Footer />
    </div>
  );
};

export default Subscribed_email;
