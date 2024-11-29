import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../component/footers/footer";
import Policy from "../Apolicy/policy";
import Newproducts_page from "../component/newproducts/newproducts_page";
import ImageGrid from "../component/siderproducts/TopPics";
import "./bedesection.css";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Environment variable for API base URL

const Wallsection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS animations

    axios
      .get(`${apiBaseUrl}/wallMirrirproducts`)
      .then((response) => {
        setProducts(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the data is fetched
      });
  }, []);

  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div>
      <div className="carts-pregination">
        <div className="carts-items">
          <h3>
            Wall Mirrors Collection: Elevate Your Space with Wood Land Nepal
          </h3>
        </div>

        <div className="carts-items">
          <div className="image-beds"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">Wall Mirrors</h2>
      <h5 className="texts">Premium Quality Mirrors for Every Style</h5>
      <h5 className="texts">
        Discover how our selection of wall mirrors can transform your home into
        a stylish and functional space.
        <span className="span showdetails" tabIndex="0">
          +
        </span>
        <span className="hiding-other-texts">
          At Wood Land Nepal, we offer an exquisite range of wall mirrors
          designed to add elegance and functionality to your home. Our
          collection features various styles, including modern frameless
          mirrors, ornate decorative frames, and large statement pieces. Crafted
          with high-quality materials, these mirrors not only enhance the
          aesthetics of your room but also help in making spaces appear larger
          and brighter. Explore our range to find the perfect mirror that
          complements your interior design. Enjoy exclusive offers and discounts
          on selected items. Transform your living space with our beautiful wall
          mirrors today!
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">Explore Our Exclusive Wall Mirrors</h1>
      <h4 className="texts">Find the Perfect Mirror to Suit Your Style</h4>
      <div className="new-producting">
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

export default Wallsection;
