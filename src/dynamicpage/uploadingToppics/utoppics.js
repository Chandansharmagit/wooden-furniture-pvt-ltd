import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "../../Userdashbboard/sidebar";
import Footer from "../../component/footers/footer";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Make sure this is defined in your .env

const Utoppics = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    details: "",
    link: "", // New field for the link
  });

  const [isEditing, setIsEditing] = useState(false);
  const [image1, setImage1] = useState(null);

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/top-pics`);
        setProducts(response.data);
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleImageChange1 = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("details", productDetails.details);
    formData.append("link", productDetails.link); // Append the new link field

    if (image1) formData.append("image1", image1);

    try {
      if (isEditing) {
        const response = await axios.put(
          `${apiBaseUrl}/top-pics/${productDetails._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProducts(products.map((product) =>
          product._id === response.data._id ? response.data : product
        ));
        setIsEditing(false);
      } else {
        const response = await axios.post(`${apiBaseUrl}/top-pics`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProducts([...products, response.data]);
      }

      setProductDetails({
        name: "",
        details: "",
        link: "", // Reset the link field
      });
      setImage1(null);
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setProductDetails(productToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${apiBaseUrl}/top-pics/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <div className="product-upload-page">
        <h2>{isEditing ? "Edit Product" : "Upload New Product"}</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Dimensions:
            <input
              type="text"
              name="details"
              value={productDetails.details}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Link:
            <input
              type="url"
              name="link"
              value={productDetails.link}
              onChange={handleChange}
              placeholder="Enter product link"
            />
          </label>
          <label>
            Product Image 1:
            <input
              type="file"
              name="image1"
              onChange={handleImageChange1}
              accept="image/*"
            />
          </label>

          <button type="submit">
            {isEditing ? "Update Product" : "Upload Product"}
          </button>
        </form>
        <h2>Uploaded Products</h2>
        <div className="uploaded-products">
          {products.map((product) => {
            const imagePath1 = product.image1.startsWith("/")
              ? product.image1.slice(1)
              : product.image1;

            return (
              <div key={product._id} className="product-item">
                <img
                  src={`${apiBaseUrl}/${imagePath1}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.details}</p>
                <p>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.link}
                  </a>
                </p>
                <button onClick={() => handleEdit(product._id)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
      <SidebarMenu />
      <Footer />
    </div>
  );
};

export default Utoppics;
