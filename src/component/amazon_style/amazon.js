import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./amazon.css";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/css"; // Import Swiper core styles
import "swiper/css/navigation"; // Import Navigation module styles
import "swiper/css/pagination"; // Import Pagination module styles
import { Navigate, useNavigate } from "react-router";

function Amazon() {
  const [feedbacks, setFeedbacks] = useState([]);
  const swiperRef = useRef(null); // Create a ref for Swiper instance

  const navigate = useNavigate();
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getall");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleclick = () => {
    navigate("/user_feedback");
  };

  return (
    <div>
      <div className="customer-feedback-widget-slider-body">
        <div className="customer-feedback-widget-slide-container">
          <h1 className="customer-feedback-widget-recommended-title">
            Their Words, Our Pride
          </h1>
          <h4 className="customer-feedback-widget-subtitle">
            Happy Words of our Happy Customers
          </h4>
          <br />
          <br />
          <Swiper
            ref={swiperRef} // Attach ref to Swiper
            modules={[Navigation, Pagination, Autoplay]}
            className="customer-feedback-widget-slide-content"
            slidesPerView={4} // Display four slides at a time
            spaceBetween={25}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1, // 1 slide on small screens
              },
              520: {
                slidesPerView: 2, // 2 slides on medium screens
              },
              950: {
                slidesPerView: 3, // 3 slides on larger screens
              },
              1200: {
                slidesPerView: 4, // 4 slides on extra-large screens
              },
            }}
          >
            {feedbacks.map((feedback) => (
              <SwiperSlide
                className="customer-feedback-widget-card"
                key={feedback.id}
              >
                <div className="customer-feedback-widget-image-content">
                  <span className="customer-feedback-widget-overlay"></span>
                  <div className="customer-feedback-widget-card-image">
                    <img
                      src={`data:image/jpeg;base64,${feedback.returnedImg}`}
                      alt={feedback.name}
                      className="customer-feedback-widget-card-img"
                    />
                  </div>
                </div>
                <div className="customer-feedback-widget-card-content">
                  <h2 className="customer-feedback-widget-customer-name">
                    {feedback.name}
                  </h2>
                  <p className="customer-feedback-widget-feedback-description">
                    {feedback.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination customer-feedback-widget-swiper-pagination"></div>
          <button className="customer-feedback-widget-view-all-button" onClick={handleclick}>
            View All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Amazon;
