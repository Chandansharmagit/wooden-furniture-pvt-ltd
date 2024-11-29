import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarMenu from '../../Userdashbboard/sidebar';
import Footer from '../../component/footers/footer';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Dynamic API URL

const Search = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [feedbackAlert, setFeedbackAlert] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Fetch feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/save-search-get`);
        const feedbackData = response.data.reverse();
        setFeedbacks(feedbackData);
        setFilteredFeedbacks(feedbackData); // Initialize filtered feedbacks
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setFeedbackAlert("Failed to fetch feedbacks.");
      }
    };
    fetchFeedbacks();
  }, []);

  // Handle delete feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/feedback/${id}`);
      const updatedFeedbacks = feedbacks.filter((feedback) => feedback._id !== id);
      setFeedbacks(updatedFeedbacks);
      setFilteredFeedbacks(updatedFeedbacks); // Update filtered results as well
      setFeedbackAlert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setFeedbackAlert("Error deleting feedback.");
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    // Filter feedbacks based on search input
    const filtered = feedbacks.filter((feedback) =>
      feedback.query.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  };

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search keywords here"
        value={searchInput}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="feedback-page-container">
        <h1>Keywords used by users to search products</h1>
        {feedbackAlert && <h4 className="feedback-alert">{feedbackAlert}</h4>}
        <div className="feedback-grid">
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <div key={feedback._id} className="feedback-item">
                <p>
                  <strong>User ID:</strong> {feedback._id}
                </p>
                <p>
                  <strong>Search Keywords:</strong> {feedback.query}
                </p>
                <p>
                  <strong>Date and Time:</strong> {formatDate(feedback.createdAt)}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No feedbacks found.</p>
          )}
        </div>
      </div>
      <SidebarMenu />
      <Footer />
    </div>
  );
}

export default Search;
