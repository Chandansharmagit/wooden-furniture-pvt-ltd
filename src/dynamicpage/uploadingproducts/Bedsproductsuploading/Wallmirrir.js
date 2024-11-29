import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import SidebarMenu from "../../../Userdashbboard/sidebar";
import Footer from "../../../component/footers/footer";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Make sure this is defined in your .env
function Wallmirriruploading() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    dimensions: "",
    material: "",
    color: "",
    oldprice: "",
    price: "",
    weight: "",
    manufacturer: "",
    warranty: "",
    description: "",
    stock: "",
    discountDuration: "",
    rating:"",

  });
  const [isEditing, setIsEditing] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/wallMirrirproducts`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleImageChange1 = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImageChange2 = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleImageChange3 = (e) => {
    setImage3(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("dimensions", productDetails.dimensions);
    formData.append("material", productDetails.material);
    formData.append("color", productDetails.color);
    formData.append("oldprice",productDetails.oldprice);
    formData.append("price", productDetails.price);
    formData.append("weight", productDetails.weight);
    formData.append("manufacturer", productDetails.manufacturer);
    formData.append("warranty", productDetails.warranty);
    formData.append("description", productDetails.description);
    formData.append("stock", productDetails.stock);
    formData.append("discountDuration", productDetails.discountDuration);
    formData.append("rating", productDetails.rating);

    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (video) formData.append("video", video);

    try {
      if (isEditing) {
        const response = await axios.put(
          `${apiBaseUrl}/wallMirrirproducts/${productDetails._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProducts(
          products.map((product) =>
            product._id === response.data._id ? response.data : product
          )
        );
        setIsEditing(false);
      } else {
        const response = await axios.post(
          `${apiBaseUrl}/wallMirrirproducts`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProducts([...products, response.data]);
      }
      setProductDetails({
        name: "",
        dimensions: "",
        material: "",
        color: "",
        oldprice: "",
        price: "",
        weight: "",
        manufacturer: "",
        warranty: "",
        description: "",
        stock: "",
        discountDuration: "",
        rating:" ",
      });
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setVideo(null);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setProductDetails(productToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${apiBaseUrl}/wallMirrirproducts/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
   
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
            name="dimensions"
            value={productDetails.dimensions}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Material:
          <input
            type="text"
            name="material"
            value={productDetails.material}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={productDetails.color}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Oldprice:
          <input
            type="Number"
            name="oldprice"
            value={productDetails.oldprice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={productDetails.weight}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Manufacturer:
          <input
            type="text"
            name="manufacturer"
            value={productDetails.manufacturer}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Warranty:
          <input
            type="text"
            name="warranty"
            value={productDetails.warranty}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={productDetails.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stock Availability:
          <input
            type="number"
            name="stock"
            value={productDetails.stock}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Discount Duration (in days):
          <input
            type="number"
            name="discountDuration"
            value={productDetails.discountDuration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          rating stars:
          <input
            type="number"
            name="rating"
            value={productDetails.rating}
            onChange={handleChange}
            required
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
        <label>
          Product Image 2:
          <input
            type="file"
            name="image2"
            onChange={handleImageChange2}
            accept="image/*"
          />
        </label>
        <label>
          Product Image 3:
          <input
            type="file"
            name="image3"
            onChange={handleImageChange3}
            accept="image/*"
          />
        </label>
        <label>
          Product Video:
          <input
            type="file"
            name="video"
            onChange={handleVideoChange}
            accept="video/*"
          />
        </label>
        <button type="submit">
          {isEditing ? "Update Product" : "Upload Product"}
        </button>
      </form>

      <h2>Uploaded Products</h2>
      <div className="uploaded-products">
          {products.map((product) => {
            // Format the image paths
            const imagePath1 = product.image1.startsWith("/")
              ? product.image1.slice(1)
              : product.image1;
            const imagePath2 = product.image2.startsWith("/")
              ? product.image2.slice(1)
              : product.image2;
            const imagePath3 = product.image3.startsWith("/")
              ? product.image3.slice(1)
              : product.image3;

            return (
              <div key={product._id} className="product-item">
                <img
                  src={`${apiBaseUrl}/${imagePath1}`}
                  alt={product.name}
                  className="product-image"
                />
                <img
                  src={`${apiBaseUrl}/${imagePath2}`}
                  alt={product.name}
                  className="product-image"
                />
                <img
                  src={`${apiBaseUrl}/${imagePath3}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.dimensions}</p>
                <p>{product.material}</p>
                <p>{product.color}</p>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Weight: {product.weight} kg</p>
                <p>Manufacturer: {product.manufacturer}</p>
                <p>Warranty: {product.warranty}</p>
                <p>Stock: {product.stock}</p>
                <p>Discount Duration: {product.discountDuration} days</p>
                <button onClick={() => handleEdit(product._id)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
    </div>
    <SidebarMenu/>
    <Footer/>
    </>
  );
}

export default  Wallmirriruploading;
