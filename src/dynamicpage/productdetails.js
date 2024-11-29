import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../component/loaders/loader';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Ensure this is in your .env file

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details from API
    axios.get(`${apiBaseUrl}/product/${id}`)
      .then((response) => {
        setProduct(response.data); // Set product data
      })
      .catch((error) => {
        console.error("Error fetching product details:", error); // Error handling
      });
  }, [id]);

  if (!product) {
    return <div><Loader/></div>; // Show loader if product data is not loaded yet
  }

  // Handle image path
  const imagePath1 = product.image1.startsWith("/") ? product.image1.slice(1) : product.image1;

  return (
    <div className="product-details">
      <img 
        src={`${apiBaseUrl}/${imagePath1}`} // Ensure correct image path
        alt={product.name} 
        className="product-details-image"
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
      <h3>Stock: {product.stock}</h3>
      <h3>Discount Duration: {product.discountDuration} days</h3>
    </div>
  );
}

export default ProductDetailsPage;
