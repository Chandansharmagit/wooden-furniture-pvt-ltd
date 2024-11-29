import React, { useState, useEffect } from "react";
import axios from "axios";
import "./amazon2.css";
import Footer from "../footers/footer";
import Loader from "../loaders/loader";

const Amazon2 = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace the URL with your API endpoint
    axios
      .get("http://localhost:8080/getall")
      .then((response) => {
        setCardsData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p><Loader/></p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div>
      <div className="mainContainer">
        <h1 className="customer-feedback-widget-recommended-title-title">
        Happy Customers: A Testament to Our Craftsmanship
        </h1>
        <h4 className="customer-feedback-widget-subtitle-subtitle">
        At Wooden Nepal, we believe that happy customers are the cornerstone of a strong brand. Our greatest reward is seeing homes beautifully furnished with our exquisite furniture. We take immense pride in the positive feedback we receive from our customers, as it reflects the love and dedication we pour into every piece
        </h4>

        <div className="card-slider">
          {cardsData.map((card, index) => (
            <div key={index} className="card">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="main-link"
              >
                <h2 className="title">{card.name}</h2>
                <div className="image">
                  <img
                    src={`data:image/jpeg;base64,${card.returnedImg}`}
                    alt={card.title}
                  />
                </div>
              </a>

              <p className="description">{card.text}</p>

              <div className="badge">Sold</div>

              <div className="price">
                {card.originalPrice && (
                  <span className="original-price">
                    <span className="sr-only">Originally:</span>$
                    {card.originalPrice}
                  </span>
                )}
              </div>

              <div className="rating">
                <span className="sr-only">
                  Rating: {card.rating} out of 5 stars
                </span>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < card.rating ? "fas fa-star" : "far fa-star"}
                    aria-hidden="true"
                  ></span>
                ))}
                <a
                  href="https://accessible360.com/#reviews"
                  className="reviews-link"
                >
                  {card.reviews} reviews
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Amazon2;
