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

const OfficeTablessection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
    axios
      .get(`${apiBaseUrl}/Officeproducts`)
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
          <h3>Office Furniture and Decorations</h3>
        </div>
        <div className="carts-items">
          <div className="image-office"></div>
        </div>
        <div className="carts-items"></div>
      </div>

      <h2 className="recomended">Office Tables and Decorations</h2>
      <h5 className="texts">
        Transform Your Workspace with Our Office Products
      </h5>
      <h5 className="texts">
        Elevate your office environment with our premium range of office tables
        and decorations. Our collection features stylish and functional office
        furniture designed to enhance productivity and create a professional
        workspace.
        <span className="span showdetails" tabIndex="0">
          +
        </span>
        <span className="hiding-other-texts">
          From sleek and modern office desks to classic wooden tables, our
          selection caters to various tastes and office needs. Explore options
          like ergonomic chairs, space-saving desks, and elegant office
          accessories to create a workspace that is both comfortable and
          inspiring. Our office furniture is crafted from high-quality
          materials, ensuring durability and a sophisticated look. Take
          advantage of our special offers, including discounts on select items
          and free shipping on orders over a certain amount. Upgrade your office
          today with our carefully curated range of office tables and
          decorations. Enjoy enhanced functionality and style that matches your
          professional needs and aesthetic preferences.
        </span>
      </h5>

      <ImageGrid />

      <h1 className="recomended">
        Discover Our Collection of Office Furniture and Decorations
      </h1>
      <h4 className="texts">Create a Productive and Stylish Workspace</h4>
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

export default OfficeTablessection;
