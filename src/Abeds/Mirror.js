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

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const MirrorSections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
    axios
      .get(`${apiBaseUrl}/mirrorproducts`)
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
          <h3>Dressing Table / 420 Different Models of Beds Available Now</h3>
        </div>
        <div className="carts-items">
          <div className="image-beds"></div>
        </div>
      </div>

      <h2 className="recomended">Dressing Table</h2>
      <h5 className="texts">420 Products</h5>
      <h5 className="texts">
        At Wood Land Nepal, we offer an exquisite selection of dressing tables
        designed to enhance your bedroom's elegance and functionality...
        <span className="span showdetails" tabIndex="0">
          +
        </span>
        <span className="hiding-other-texts">
          Our collection features a variety of styles, from classic wooden
          designs to modern, sleek finishes, ensuring you find the perfect
          dressing table to complement your decor. Crafted from high-quality
          materials, our dressing tables provide ample storage with drawers and
          shelves for all your beauty essentials. Whether you prefer a simple
          design or a more elaborate setup with a large mirror, our dressing
          tables combine style with practicality. Explore our range of dressing
          tables online at Wood Land Nepal and discover the perfect addition to
          your bedroom.
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">Explore Different Dressing Tables</h1>
      <h4 className="texts">
        Make your home Utile in Style with Dressing Table
      </h4>
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

export default MirrorSections;
