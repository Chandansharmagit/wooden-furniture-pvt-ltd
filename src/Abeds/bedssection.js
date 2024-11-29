import React, { useEffect, useState } from "react";
import "./bedesection.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../component/footers/footer";
import Policy from "../Apolicy/policy";
import Newproducts_page from "../component/newproducts/newproducts_page";
import ImageGrid from "../component/siderproducts/TopPics";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Renamed variable

const Bedssection = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/bedsproducts`)
      .then((response) => {
        setProducts(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  return (
    <div>
      <div className="carts-pregination">
        <div className="carts-items">
          <h3>Beds Section/420 different Models of Beds Available Now</h3>
        </div>

        <div className="carts-items">
          <div className="image-beds"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">Beds</h2>
      <h5 className="texts">420 Products</h5>
      <h5 className="texts">
        Your bed is more than just furniture; it's your haven for rest,
        relaxation, and sweet dreams.
        <span className="span showdetails" tabIndex="0">+</span>
        <span className="hiding-other-texts">
          We understand the importance of good sleep after a tiring day, so we
          offer a wide collection of wooden beds designed to elevate your sleep
          experience. Here, you will find a variety of bed sizes, from cozy
          twins to luxurious king-size beds...
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">Explore Different Beds For Your Bedrooms</h1>
      <h4 className="texts">Make your Bedroom Utile in Style</h4>
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

export default Bedssection;
