import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RequestOrder.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const RequestOrder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [feedalert, setFeedbackalert] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [formdata, setFormdata] = useState({
    firstname: "",
   
    email: "",
    contact: "",
    productType: "",
    woodType: "",
    color: "",
    material: "",
    expectedPrice: "",
    text: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in formdata) {
      formData.append(key, formdata[key]);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      setMessage("please wait your order request is sending..");
      const response = await axios.post(`${apiBaseUrl}/api/newOrder`, formData, {
       
      });

      console.log(response.data);
      setFeedbackalert("Order request sent successfully!");
      setMessage("Order request sent successfully!")

      setFormdata({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        productType: "",
        woodType: "",
        color: "",
        material: "",
        expectedPrice: "",
        text: "",
      });
      setImage(null);
    } catch (error) {
      console.error("There was an error submitting the order!", error);
      setFeedbackalert("There was an error submitting the order!");
      setMessage("There was an error submitting the order!")
    }
  };

  return (
    <div className="req">
      {/* Overlay for blur effect */}
      {isVisible && (
        <div className="popup-overlay" onClick={toggleVisibility}></div>
      )}

      <div className="requestOrder-btn" onClick={toggleVisibility}>
        <p className="requestOrder-txt">Request Custom Order!</p>
      </div>

      <div className={`requestOrder-messageBox ${isVisible ? "show" : ""}`}>
        <div className="requestOrder-messageHeader">
          <h2>Request Your Custom Furniture!</h2>
          <button className="requestOrder-closeBtn" onClick={toggleVisibility}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="requestOrder-form">
          <div className="requestOrder-imageSide">
            <div className="requestOrder-imageItems" id="imageUploadContainer">
              <label htmlFor="imageUpload" className="requestOrder-imageLabel">
                Upload Product Image:
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="requestOrder-imageInput"
              />
            </div>

            <div className="requestOrder-formFields">
              <input
                type="text"
                className="requestOrder-input"
                placeholder="Full Name"
                name="firstname"
                value={formdata.firstname}
                onChange={handlechange}
                required
              />
              <input
                type="email"
                className="requestOrder-input"
                placeholder="Email"
                name="email"
                value={formdata.email}
                onChange={handlechange}
                required
              />
              <input
                type="text"
                className="requestOrder-input"
                placeholder="Contact"
                name="contact"
                value={formdata.contact}
                onChange={handlechange}
                required
              />
              <input
                type="text"
                className="requestOrder-input"
                placeholder="Product Type"
                name="productType"
                value={formdata.productType}
                onChange={handlechange}
                required
              />
              <input
                type="text"
                className="requestOrder-input"
                placeholder="Wood Type"
                name="woodType"
                value={formdata.woodType}
                onChange={handlechange}
                required
              />
              <input
                type="text"
                className="requestOrder-input"
                placeholder="Color"
                name="color"
                value={formdata.color}
                onChange={handlechange}
                required
              />
              <input
                type="text"
                className="requestOrder-input"
                placeholder="Material"
                name="material"
                value={formdata.material}
                onChange={handlechange}
                required
              />
              <input
                type="number"
                className="requestOrder-input"
                placeholder="Expected Price"
                name="expectedPrice"
                value={formdata.expectedPrice}
                onChange={handlechange}
                required
              />
              <textarea
                name="text"
                id="text"
                className="requestOrder-textarea"
                value={formdata.text}
                onChange={handlechange}
                placeholder="Additional details about your custom request"
              ></textarea>

             
              <button className="requestOrder-submitBtn" type="submit">
                Submit Order
              </button>
              {feedalert && (
                <h4 className="requestOrder-feedbackAlert">{message}</h4>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestOrder;
