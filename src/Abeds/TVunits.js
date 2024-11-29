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

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Dynamic API URL

const TVsection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
    axios
      .get(`${apiBaseUrl}/tvproducts`)
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
          <h3>TV Units Section/Explore Our Range of Modern TV Units</h3>
        </div>

        <div className="carts-items">
          <div className="image-tv"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">TV Units</h2>
      <h5 className="texts">Explore 420 Products</h5>
      <h5 className="texts">
        At Wood Land Nepal, we offer a diverse collection of TV units designed to elevate your living space. Our range includes sleek modern units and classic wooden stands that not only enhance your entertainment area but also provide practical storage solutions.
        <span className="span showdetails" tabIndex="0">+</span>
        <span className="hiding-other-texts">
          Choose from a variety of styles, including wall-mounted units for a contemporary touch or robust wooden stands for a traditional feel. Each TV unit is crafted from high-quality materials to ensure durability and style.
          Our 2024 TV Unit Price List includes options such as:
          <ul>
            <li>Modern Wall-Mounted TV Unit: Rs 12,499</li>
            <li>Classic Wooden TV Stand with Storage: Rs 16,699</li>
            <li>Modular TV Console with Shelves: Rs 22,989</li>
            <li>Compact Corner TV Unit: Rs 28,849</li>
            <li>Luxury Wooden TV Cabinet with Drawers: Rs 34,999</li>
          </ul>
          Discover the perfect TV unit for your home and enjoy excellent value and stylish solutions with our high-quality furniture.
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">Find the Perfect TV Unit for Your Living Space</h1>
      <h4 className="texts">Enhance Your Entertainment Area with Style</h4>
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

export default TVsection;
