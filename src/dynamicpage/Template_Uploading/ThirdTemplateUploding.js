import React, { useState, useEffect } from "react";
import axios from "axios";
import './templatef.css';
import Footer from "../../component/footers/footer";
import SidebarMenu from "../../Userdashbboard/sidebar";

function ThirdTemplateUploding() {
  const [images, setImages] = useState([]); // Initialize as an array
  const [image, setImage] = useState(null); // Updated the naming to camelCase for consistency
  const [isEditing, setIsEditing] = useState(false);
  const [editImageId, setEditImageId] = useState(null);
  const [link, setLink] = useState("");
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getting_updating_data");
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
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form data is valid
    if (!link || !image) {
      setError("Please provide both a link and an image.");
      return;
    }

    const formData = new FormData();
    formData.append("link", link);
    formData.append("image", image);

    try {
      if (isEditing) {
        // Update existing image
        await axios.put(`http://localhost:8080/update/${editImageId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setIsEditing(false);
        setEditImageId(null);
      } else {
        // Upload new image
        await axios.post("http://localhost:8080/uploading_two", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setImage(null);
      setLink("");
      setError(null); // Clear errors after successful upload
      fetchImages(); // Refresh images after upload or update
    } catch (error) {
      console.error("Error uploading image", error);
      setError("Failed to upload image.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${id}`);
      fetchImages(); // Refresh images after delete
    } catch (error) {
      console.error("Error deleting image", error);
      setError("Failed to delete image.");
    }
  };

  const handleEdit = (image) => {
    setIsEditing(true);
    setEditImageId(image.id);
    setLink(image.link);
    setImage(null); // Clear the image selection on edit
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
            type="text"
            placeholder="Text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
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
                  src={`data:image/png;base64,${image.imageByte}`}
                  alt={image.link}
                  className="product-image"
                />
                <p>{image.link}</p>
                <button onClick={() => handleEdit(image)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(image.id)} className="delete-button">Delete</button>
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
      <SidebarMenu />
      <Footer />
    </>
  );
}

export default ThirdTemplateUploding;
