import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./searchResults.css";
import Footer from "../footers/footer";

const SearchResults = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);

  const searchQuery = new URLSearchParams(location.search).get("q");
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(86000 * 2); // 2 hours countdown in seconds
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Set the base URL for the API

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/search?q=${searchQuery}`);
        const data = response.data;
        const productsData = [
          ...(data.products || []),
          ...(data.homeproducts || []),
          ...(data.bedproduct || []),
          ...(data.tvProducts || []),
          ...(data.mirrorProducts || []),
          ...(data.lampsProducts || []),
          ...(data.wallmirrorProducts || []),
          ...(data.mattressProducts || []),
          ...(data.bedsideTablesProducts || []),
          ...(data.officetablesProducts || []),
          ...(data.photoframesProducts || [])
        ];
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
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
    <div>
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
        <span className="pr">Find products according to your budget!</span>
      </div>

      <div className="search-results-container">
        <div className="search-results">
          {filteredProducts.map((product) => {
            const imagePath = product.image1.startsWith("/") ? product.image1.slice(1) : product.image1;
            
            return (
              <div key={product._id} className="search-result-item" onClick={() => handleViewProduct(product._id)}>
                <img
                  src={`${apiBaseUrl}/${imagePath}`} // Updated image URL
                  alt={product.name}
                  className="product-details-image"
                />
                <h3>{product.name}</h3>
                <span className="item-old-price">Rs 23000</span>
                <span className="item-new-price">Rs {product.price}</span>
                <span className="item-new-price"> (20% off)</span>
                <p>{product.discountDuration} Pieces Left in our stock</p>
                <span className="item-new-prices">
                  Limited Offer: {formatCountdown(countdown)}
                </span>
              </div>
            );
          })}
          {filteredProducts.length === 0 ? <p>No results found.</p> : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
