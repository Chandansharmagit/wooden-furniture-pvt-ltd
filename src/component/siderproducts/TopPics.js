import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./topics.css"; // Assuming you have appropriate styles defined
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ImageGrid = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Default state is an empty array

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/top-pics`);

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

  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`); // Navigate to the product detail page
  };

  return (
    <div>
      <h1 className="recomended">Top Picks For You</h1>
      <h4 className="texts">Impressive Collection For Your Dream Home</h4>

      <div className="profile-grid">
        {products.map((product) => {
          const imagePath = product.image1.startsWith("/")
            ? product.image1.slice(1)
            : product.image1;

          return (
            <div className="profile-block" key={product.id}>
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${apiBaseUrl}/${imagePath}`} // Use a single slash here
                  alt={product.name}
                  className="circular-img"
                />
                <span className="circular-img-overlay"></span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGrid;
