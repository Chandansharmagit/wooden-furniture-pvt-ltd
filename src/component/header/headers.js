import React, { useState, useEffect } from "react";
import axios from "axios";
import "./header.css";
import logo from "./logo-no-background.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextpage/context";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Headers = () => {
  const navigate = useNavigate();
  const { count, wishlistCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch search suggestions based on the search query
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/search-suggestions`, {
          params: { q: searchQuery },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      await axios.post(`${apiBaseUrl}/save-search-query`, {
        query: searchQuery,
      });
      navigate(`/search-results?q=${searchQuery}`);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Failed to save search query:", error);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search-results?q=${suggestion}`);
  };

  // Fetch user data

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("usertoken");
      const email = localStorage.getItem("userEmail");
  
      if (token) {
        try {
          const response = await axios.get(`${apiBaseUrl}/userprofile_id/${email}`);
          setUserData(response.data);
          setIsUserLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsUserLoggedIn(false);
        }
      } else {
        setIsUserLoggedIn(false);
      }
  
      setLoading(false); // Stop loading after attempting to fetch user data
    };
  
    fetchUserData(); // Call the async function
  }, []); // Empty dependency array ensures it runs once on mount
  


  // Example login function
  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/login`, credentials);
      const { token, userData } = response.data; // Assuming userData contains image and other info
      localStorage.setItem("usertoken", token);
      localStorage.setItem("userEmail", userData.email);

      // Set user data directly in state
      setUserData(userData);
      setIsUserLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Navigate to home
  const home = () => {
    navigate("/");
  };

  // Navigate to cart
  const carts = () => {
    navigate("/selling-page");
  };

  return (
    <div className="header-container-unique">
      <div className="header-item-first-unique" onClick={home}>
        <h3 className="smart-logo-unique">
          <img src={logo} alt="Logo" className="logo-image-unique" />
        </h3>
      </div>
      <div className="header-item-second-unique">
        <div className="input-container-unique">
          <div className="input-item-unique">
            <input
              type="text"
              placeholder="Search Products, Colors & more..."
              className="search-input-unique"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestion-list-unique">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item-unique"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="input-item-unique">
            <button className="search-button-unique" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="header-item-third-unique">
        <div className="icon-container-unique">
          <div className="icon-item-unique">
            {isUserLoggedIn ? (
              <div className="profile-unique">
                <img
                  src={userData?.image}
                  className="profile-image-unique"
                  alt={userData?.name || userData?.displayName}
                />
              </div>
            ) : (
              <div className="profile-unique">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                <p>Profile</p>
              </div>
            )}
          </div>
          <div className="icon-item-unique" onClick={carts}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-bag-dash"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"
              />
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
            <p>Cart ({count})</p>
          </div>
          <div className="icon-item-unique">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 3.134.8 1.4 2.857 0 4.429 0 6.301 0 7.848c0 1.663 1.07 3.513 2.436 4.549C3.976 13.45 5.105 14 6.5 14c1.212 0 2.339-.501 3.063-1.285a5.29 5.29 0 0 0 3.062 1.285c1.396 0 2.525-.55 3.064-1.603C15 10.362 16 8.512 16 7.848c0-1.547 0-3.419-1.4-5.057C12.866.8 10.4.281 8.717 2.011L8 2.748z" />
            </svg>
            <p>Wishlist ({wishlistCount})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
