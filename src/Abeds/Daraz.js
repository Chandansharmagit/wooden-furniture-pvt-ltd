import React, { useEffect, useState } from "react";

import "./bedesection.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../component/footers/footer";
import Policy from "../Apolicy/policy";
import Newproducts_page from "../component/newproducts/newproducts_page";
import ImageGrid from "../component/siderproducts/TopPics";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Renamed variable

const Darazssection = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // To track selected product for meta tags
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/darazproducts`);
        setProducts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products. Please try again later."); // User feedback
      }
    };
    fetchProducts();
  }, []);

  const handleViewProduct = (id) => {
    const product = products.find((product) => product._id === id);
    setSelectedProduct(product); // Set the selected product for meta tags
    navigate(`/cart/${id}`);
  };

  return (
    <div>
      {/* Dynamic Meta Tags for SEO using Helmet */}
      

      <div className="carts-pregination">
        <div className="carts-items">
          <h3>Wardrobes</h3>
        </div>
        <div className="carts-items">
          <div className="image-beds"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">Wardrobes</h2>
      <h5 className="texts">155 Products</h5>
      <h5 className="texts">
        Wardrobe is the storage wizard that keeps all your clothing essentials
        and other items intact in its chest. With our extensive wooden
        wardrobe....
        <span className="span showdetails" tabIndex="0">
          +
        </span>
        <span className="hiding-other-texts">
          {/* Additional text here */}
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">Explore Different Wardrobes For Your Bedrooms</h1>
      <h4 className="texts">Make your Bedroom Utile in Style</h4>
      <div className="new-producting">
        {products.map((product) => {
          // Remove the leading slash from product.image1 if it exists
          const imagePath = product.image1.startsWith('/')
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
                      src={`${apiBaseUrl}${imagePath}`} // Use a single slash here
                      alt={product.name}
                      className="pro-img-new"
                    />
                  </div>
                </div>
              </div>

              <div className="badge">Get 15% On Every Bed Products</div>

              <h3>{product.name}</h3>
              <span className="item-old-price">Rs {product.oldprice}</span>
              <span className="item-new-price">Rs {product.price}</span>
              <span className="item-new-price"> (15% off)</span>
              <p>{product.discountDuration} Pieces Left in Our Stock</p>
            </div>
          );
        })}
      </div>

      <Newproducts_page />
      <Policy />
      <Footer />
    </div>
  );
};

export default Darazssection;
