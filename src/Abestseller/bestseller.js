import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "aos/dist/aos.css";
// import "./newproducts.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Dynamic API URL

function BestSeller() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(86000 * 2); // 1 hour countdown in seconds

  // Fetch products on component mount
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/homeproducts`)
      .then((response) => {
        setProducts(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clear interval on component unmount
  }, []);

  // Handle product click
  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  // Format countdown into days, hours, minutes, seconds
  const formatCountdown = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div>
      <h1 className="recomended">Home Furnishing Items</h1>
      <h4 className="texts">Give Your Home A Touch Of WOW</h4>

      <div className="new-products">
        {products.map((product) => {
          const imagePath = product.image1.startsWith("/")
            ? product.image1.slice(1)
            : product.image1;

          return (
            <div
              className="products-item"
              key={product._id}
              onClick={() => handleViewProduct(product._id)}
            >
              <div className="slider">
                <div className="slides">
                  <div className="slide first">
                    <img
                      src={`${apiBaseUrl}/${imagePath}`}
                      alt={product.name}
                      className="pro-img-new"
                    />
                  </div>
                </div>
                <div className="badge">20% off On Every Product</div>
              </div>

              <h3>{product.name}</h3>
              <span className="item-old-price">Rs {product.oldprice}</span>
              <span className="item-new-price">Rs {product.price}</span>
              <span className="item-new-price"> (20% off)</span>
              <p>{product.discountDuration} Pieces Left</p>
              <span className="item-new-prices">
                Limited Offer: {formatCountdown(countdown)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BestSeller;
