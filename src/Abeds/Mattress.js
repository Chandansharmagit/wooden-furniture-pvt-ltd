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

const Mattresssection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
    axios
      .get(`${apiBaseUrl}/mattressproducts`)
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
            Premium Mattresses: Enhance Your Sleep Quality at Wood Land Nepal
          </h3>
        </div>

        <div className="carts-items">
          <div className="image-mattresses"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">Mattresses</h2>
      <h5 className="texts">
        Explore Our Collection of High-Quality Mattresses
      </h5>
      <h5 className="texts">
        Your mattress is essential for a restful night's sleep and overall
        well-being.
        <span className="span showdetails" tabIndex="0">
          +
        </span>
        <span className="hiding-other-texts">
          At Wood Land Nepal, we offer a diverse range of mattresses designed to
          provide ultimate comfort and support. Our collection includes various
          types of mattresses, from memory foam to innerspring, catering to
          different sleep preferences and needs. Whether you prefer a soft,
          plush feel or a firm, supportive surface, our mattresses are crafted
          with high-quality materials to ensure durability and comfort. Explore
          our selection to find the perfect mattress for your bedroom. Enjoy
          special discounts and offers on selected mattresses. Discover the best
          mattress for your needs and enhance your sleep quality with Wood Land
          Nepal!
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">
        Discover the Perfect Mattress for Your Sleep Needs
      </h1>
      <h4 className="texts">
        Upgrade Your Sleeping Experience with Our Top-Quality Mattresses
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

export default Mattresssection;
