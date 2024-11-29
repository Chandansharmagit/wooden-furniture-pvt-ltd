import React, { useState, useEffect } from "react";
import axios from "axios";
import "./feedback.css";

function Feedback_user() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState({
    name: "",
    text: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch feedbacks from the server
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getall");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFeedback({ ...currentFeedback, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentFeedback({ ...currentFeedback, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleAddFeedback = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", currentFeedback.name);
    formData.append("text", currentFeedback.text);
    if (currentFeedback.image) {
      formData.append("img", currentFeedback.image);
    }

    try {
      await axios.post("http://localhost:8080/postCategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCurrentFeedback({ name: "", text: "", image: null });
      setImagePreview(null);
      fetchFeedbacks(); // Refresh feedback list after adding
    } catch (error) {
      console.error("Failed to add feedback:", error);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleting_Feedback/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Customer Feedback</h2>

      <form onSubmit={handleAddFeedback}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={currentFeedback.name}
          onChange={handleInputChange}
          className="feedback-input"
        />
        <textarea
          name="text"
          placeholder="Your Feedback"
          value={currentFeedback.text}
          onChange={handleInputChange}
          className="feedback-textarea"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="feedback-file-input"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="feedback-image-preview"
          />
        )}
        <button type="submit" className="feedback-submit-button">
          Add Feedback
        </button>
      </form>

      <ul className="feedback-list">
        {feedbacks.map((feedback) => (
          <li key={feedback.id} className="feedback-item">
            <p>
              <strong>{feedback.name}</strong>: {feedback.text}
            </p>
            {feedback.returnedImg && (
              <img
                src={`data:image/jpeg;base64,${feedback.returnedImg}`}
                alt="Feedback"
                className="feedback-image"
              />
            )}
            <button
              onClick={() => handleDeleteFeedback(feedback.id)}
              className="feedback-delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feedback_user;
