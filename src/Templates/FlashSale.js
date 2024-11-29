import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./flash.css";

import { Link, useNavigate } from "react-router-dom";
const FlashSale = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Ensure the default state is an array
  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/gettingSeconds_templates_uploading"
        );

        console.log("API response:", response.data); // Log the response data

        if (Array.isArray(response.data)) {
          setProducts(response.data); // Set products if data is an array
        } else {
          console.error("Expected an array but got:", response.data);
          setProducts([]); // Set products to an empty array if the data is not in array format
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        // Optionally, handle the error by displaying a message to the user
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h1 className="recomended">Beautify Your Living Spaces</h1>
      <h4 className="texts">Revamp Every Corner with Elegance </h4>

      <div className="flash-sale-grid-unique">
        {products.map((profile) => (
          <div className="flash-grid-item-1">
            <Link to={profile.link}>
            <img
              src={`data:image/png;base64,${profile.image1}`}
              alt={profile.link}
              id="flash-sale-img-1"
            />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlashSale;
