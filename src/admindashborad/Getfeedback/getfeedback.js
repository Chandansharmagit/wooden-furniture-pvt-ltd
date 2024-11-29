import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackPage.css"; // Import CSS for styling
import SidebarMenu from "../../Userdashbboard/sidebar";
import Footer from "../../component/footers/footer";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Dynamic API URL

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackAlert, setFeedbackAlert] = useState("");

  // Fetch feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/feedback`);
        setFeedbacks(response.data.reverse());
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setFeedbackAlert("Error fetching feedbacks.");
      }
    };
    fetchFeedbacks();
  }, []);

  // Handle delete feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/feedback/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      setFeedbackAlert("Feedback deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the feedback!", error);
      setFeedbackAlert("There was an error deleting the feedback!");
    }
  };

  return (
    <div>
      <div className="feedback-page-container">
        <h1>Manage Feedback</h1>
        {feedbackAlert && <h4 className="feedback-alert">{feedbackAlert}</h4>}
        <div className="feedback-grid">
          {feedbacks.map((feedback) => (
            <div key={feedback._id} className="feedback-item">
              <p>
                <strong>First Name:</strong> {feedback.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {feedback.lastname}
              </p>
              <p>
                <strong>Email:</strong> {feedback.email}
              </p>
              <p>
                <strong>Contact:</strong> {feedback.contact}
              </p>
              <p>
                <strong>Feedback:</strong> {feedback.text}
              </p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(feedback._id)}
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

export default FeedbackPage;
