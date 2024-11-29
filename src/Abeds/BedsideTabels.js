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

const BedSidesection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
    axios
      .get(`${apiBaseUrl}/BedSideproducts`)
      .then((response) => {
        const reversedProducts = response.data.reverse();
        setProducts(reversedProducts);
        setFilteredProducts(reversedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  // Filter products based on price range
  useEffect(() => {
    const filtered = products.filter((product) => {
      const price = parseFloat(product.price);
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      if (!isNaN(min) && price < min) return false;
      if (!isNaN(max) && price > max) return false;
      return true;
    });

    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, products]);

  return (
    <div>
      <div className="carts-pregination">
        <div className="carts-items">
          <h3>Elegant Bedside Tables for Your Bedroom at Wood Land Nepal</h3>
        </div>

        <div className="carts-items">
          <div className="image-bedside-tables"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">Bedside Tables</h2>
      <h5 className="texts">Discover Our Exclusive Collection</h5>
      <h5 className="texts">
        A bedside table is more than just a piece of furniture; it's an
        essential companion to your bed, providing a convenient platform for
        your nighttime essentials.
        <span className="span showdetails" tabIndex="0">+</span>
        <span className="hiding-other-texts">
          At Wood Land Nepal, we offer a diverse range of wooden bedside tables...
        </span>
      </h5>

      <h1 className="recomended">Explore Our Range of Stylish Bedside Tables</h1>
      <h4 className="texts">Enhance Your Bedroom with Functional Elegance</h4>

      {/* Price Filters */}
      <div className="price-filters">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="price-inputs"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="price-inputs"
        />
        <span className="pr">Filter products according to your budget!</span>
      </div>

      <div className="new-producting">
        {filteredProducts.map((product, index) => (
          <React.Fragment key={product._id}>
            <div
              className="products-item"
              onClick={() => handleViewProduct(product._id)}
            >
              <div className="slider">
                <div className="slides">
                  <div className="slide first">
                    <img
                      src={`${apiBaseUrl}${product.image1}`} // Use apiBaseUrl for image source
                      alt={product.name}
                      className="pro-img-new"
                      data-aos="fade-up" // Add AOS attribute for animation
                    />
                  </div>
                </div>
              </div>

              <div className="badge">Get 15% Off on All Bedside Tables</div>
              <h3>{product.name}</h3>
              <span className="item-old-price">Rs {product.oldprice}</span>
              <span className="item-new-price">Rs {product.price}</span>
              <span className="item-new-price"> (15% off)</span>
              <p>{product.discountDuration} Pieces Left in Stock</p>
            </div>

            {/* Show Discount Template after the 4th product */}
            {index === 3 && (
              <div className="discount-template">
                <h2>Special Discount!</h2>
                <p>Buy 2 bedside tables and get 20% additional discount!</p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <Policy />
      <Footer />
    </div>
  );
};

export default BedSidesection;
