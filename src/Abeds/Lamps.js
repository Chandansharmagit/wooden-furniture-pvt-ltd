import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../component/footers/footer";
import Policy from "../Apolicy/policy";
import Newproducts_page from "../component/newproducts/newproducts_page";
import ImageGrid from "../component/siderproducts/TopPics";
import "./bedesection.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Ensure you have AOS styles imported

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Lampssection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
    axios
      .get(`${apiBaseUrl}/lampsproducts`)
      .then((response) => {
        setProducts(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  }, []);

  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Optional loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  return (
    <div>
      <div className="carts-pregination">
        <div className="carts-items">
          <h3>Lamps and Lighting</h3>
        </div>

        <div className="carts-items">
          <div className="image-lamps"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">Lamps and Lighting</h2>
      <h5 className="texts">420 Products</h5>
      <h5 className="texts">
        At Wood Land Nepal, we offer an extensive range of lamps and lighting solutions designed to illuminate your home with style and elegance.
        <span className="span showdetails" tabIndex="0">Read More</span>
        <span className="hiding-other-texts">
          Our collection features elegant table lamps, striking floor lamps, and versatile pendant lights to suit every decor style. 
          Whether you aim to add sophistication to your living room or create a cozy ambiance in your bedroom, our lighting solutions provide both functionality and aesthetic appeal.
          Crafted from high-quality materials, our lamps are durable and stylish, available in modern, classic, and contemporary designs. 
          Explore our 2024 Price List:
          <ul>
            <li>Stylish Table Lamp with Adjustable Shade: Rs 3,299</li>
            <li>Elegant Floor Lamp with Marble Base: Rs 5,499</li>
            <li>Modern Pendant Light with Crystal Accents: Rs 7,799</li>
            <li>Contemporary LED Wall Sconce: Rs 9,299</li>
            <li>Classic Chandelier with Brass Finish: Rs 12,999</li>
          </ul>
          Discover exceptional quality, beautiful designs, and attractive discounts on our lamps and lighting fixtures.
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">Explore Various Lamps and Lighting Options for Your Home</h1>
      <h4 className="texts">Enhance Your Home's Ambiance with Style</h4>
      <div className="new-producting">
      {products.map((product) => {
          const imagePath = product.image1.startsWith('/') ? product.image1.slice(1) : product.image1;

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

export default Lampssection;
