import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./newproducts.css";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function Newproducts_page() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(86000 * 2); // 2 hours countdown in seconds
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/products`);
        setProducts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(product.price);
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    return productPrice >= min && productPrice <= max;
  });

  return (
    <div className="prod">
      <h1 className="recommended-proucts">New Launched Collections</h1>
      <h4 className="texts">
        Impressive Collection For Your Dream Home. Shop us Now
      </h4>
      {/* Uncomment if price filters are needed */}
      <div className="price-filters">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="price-input"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="price-input"
        />
        <span className="pr">Filter products according to your budget!</span>
      </div>
      <div className="new-products">
        {filteredProducts.map((product, index) => {
          const imagePath = product.image1.startsWith("/")
            ? product.image1.slice(1)
            : product.image1;

          return (
            <React.Fragment key={product._id}>
              <div
                className="products-item"
                onClick={() => handleViewProduct(product._id)}
              >
                <div className="slider">
                  <div className="slides">
                    <div className="slide first">
                      <img
                        src={`${apiBaseUrl}/${imagePath}`} // Use a single slash here
                        alt={product.name}
                        className="pro-img-new"
                      />
                    </div>
                  </div>
                  <div className="badge">20% off</div>
                </div>

                <h3>{product.name}</h3>
                <span className="item-old-price">Rs 25000</span>
                <span className="item-new-price">Rs {product.price}</span>
                {/* Uncomment for limited offer countdown */}
                {/* <span className="item-new-prices">
                  Limited Offer: {formatCountdown(countdown)}
                </span> */}
              </div>

              {/* Render template after every 4 products */}
              {(index + 1) % 4 === 0 && index !== filteredProducts.length - 1 && (
                <div className="discount-template">
                  <h1 className="recommended-proucts">
                    New Launched Collections
                  </h1>
                  <h4 className="texts">
                    Impressive Collection For Your Dream Home. Shop us Now
                  </h4>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Newproducts_page;
