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

const Framesection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
    axios
      .get(`${apiBaseUrl}/photoproducts`)
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
          <h3>
            Wooden Photo Frames: Elegant and Durable Options at Wood Land Nepal
          </h3>
        </div>

        <div className="carts-items">
          <div className="image-beds"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">Wooden Photo Frames</h2>
      <h5 className="texts">
        Premium Quality Frames for Your Cherished Memories
      </h5>
      <h5 className="texts">
        Enhance your home decor with our exquisite collection of wooden photo
        frames.
        <span className="span showdetails" tabIndex="0">
          +
        </span>
        <span className="hiding-other-texts">
          At Wood Land Nepal, we offer a wide range of wooden photo frames that
          add a touch of elegance and warmth to your space. Our frames are
          crafted from high-quality wood, ensuring durability and a timeless
          aesthetic. From classic designs to modern styles, our collection
          caters to every taste and home decor theme. Each frame is meticulously
          designed to highlight your cherished memories, whether it’s family
          photos, artworks, or special moments. Explore our selection to find
          the perfect frame that complements your interior and showcases your
          pictures beautifully. Discover our competitive prices and enjoy
          special discounts on select wooden photo frames. Elevate your decor
          with Wood Land Nepal’s premium wooden photo frames today!
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">
        Explore Our Premium Wooden Photo Frames Collection
      </h1>
      <h4 className="texts">
        Find the Perfect Frame to Display Your Precious Moments
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

export default Framesection;
