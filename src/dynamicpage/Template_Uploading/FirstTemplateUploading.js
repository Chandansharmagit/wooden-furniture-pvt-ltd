import React, { useState, useEffect } from "react";
import axios from "axios";
import './templatef.css';
import Footer from "../../component/footers/footer";
import SidebarMenu from "../../Userdashbboard/sidebar";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Renamed variable
function FirstTemplateUploading() {
  const [images, setImages] = useState([]); // Initialize as an array
  const [newImage1, setNewImage1] = useState(null);
  const [newImage2, setNewImage2] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editImageId, setEditImageId] = useState(null);
  const [recommendedText, setRecommendedText] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getting_templates_uploading");
      console.log("Fetched images:", response.data);
      if (Array.isArray(response.data)) {
        setImages(response.data);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images", error);
      setError("Failed to fetch images.");
    }
  };

  const handleImageChange1 = (e) => {
    setNewImage1(e.target.files[0]);
  };

  const handleImageChange2 = (e) => {
    setNewImage2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("recommendedText", recommendedText);
    formData.append("text", text);
    formData.append("image1", newImage1);
    formData.append("image2", newImage2);

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/first-template-uploading/${editImageId}`, formData);
        setIsEditing(false);
        setEditImageId(null);
      } else {
        await axios.post("http://localhost:8080/first-template-uploading", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      setNewImage1(null);
      setNewImage2(null);
      setRecommendedText("");
      setText("");
      fetchImages();
    } catch (error) {
      console.error("Error uploading image", error);
      setError("Failed to upload image.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/first-template-uploading/${id}`);
      fetchImages();
    } catch (error) {
      console.error("Error deleting image", error);
      setError("Failed to delete image.");
    }
  };

  const handleEdit = (image) => {
    setIsEditing(true);
    setEditImageId(image.id);
    setRecommendedText(image.recommendedText);
    setText(image.text);
  };

  return (
    <>
      <div className="product-upload-page">
        <h2>Upload First Two <span>Template Images here</span></h2>
        <h4 className="texts">
          Take a look at the newest additions to our modern furniture collection
        </h4>
        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleImageChange1}
            accept="image/*"
          />
          <input
            type="file"
            onChange={handleImageChange2}
            accept="image/*"
          />
          <input
            type="text"
            placeholder="Recommended Text"
            value={recommendedText}
            onChange={(e) => setRecommendedText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">
            {isEditing ? "Update Images" : "Upload Images"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="uploaded-products">
          {Array.isArray(images) && images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="product-item">
                <img
                  src={`data:image/png;base64,${image.returnimage1}`}
                  alt={image.text}
                  className="product-image"
                />
                <img
                  src={`data:image/png;base64,${image.returnimage2}`}
                  alt={image.text}
                  className="product-image"
                />
                <h3>{image.recommended}</h3>
                <p>{image.text1}</p>
                <button onClick={() => handleEdit(image)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(image.id)} className="delete-button">Delete</button>
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
      <SidebarMenu/>
      <Footer/>
    </>
  );
}

export default FirstTemplateUploading;
