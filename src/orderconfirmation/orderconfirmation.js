import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutTwo.css";
import Footer from "../component/footers/footer";
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Make sure this is defined in your .env
export function CheckoutTwo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], total, discount } = location.state || {};
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNum: "", // Added cardNum to the state
    expirationDate: "",
    cvc: "",
    address: "",
    city: "",
    region: "",
    contact: "",
    postalCode: "",
    paymentMethod: "card",
    cartItems: cartItems,
    totalprice: total,
    discount: discount,
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setemail(email);
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: email,
      }));
    }
    getUserLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdatatoappend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formdatatoappend.append(`${key}[${index}][${subKey}]`, subValue);
          });
        });
      } else {
        formdatatoappend.append(key, value);
      }
    });

    try {
      if (
        formData.fullName === "" ||
        formData.address === "" ||
        formData.email === "" ||
        formData.postalCode === ""
      ) {
        setName("Please enter your full details.");
        return;
      }
      // Initially show "Order is processing" while waiting for the response
      setName("Please wait, order is processing...");

      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Renamed variable
      const response = await axios.post(`${apiBaseUrl}/api/order`, formData);

      // Check response status
      if (response.status !== 200) {
        setName("Please wait, order is processing...");
      }

      if (response.status === 200) {
        setName("Order Placed Successfully!");
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      } else {
        setName("Failed to Place Order.");
        console.log("Response data:", response.data);
      }
    } catch (error) {
      // In case of an error, handle it and show a failure message
      setName("Failed to Place Order.");
      console.error("Error sending order:", error);
    }
  };

  const handleEsewaPayment = () => {
    // Implement eSewa payment handling
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = async (position) => {
    const { latitude, longitude } = position.coords;

    // Log the latitude and longitude to the console
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      const address = data.address;

      // Determine the appropriate district field, avoiding highway numbers
      const isHighway = (road) =>
        road &&
        (road.startsWith("NH") ||
          road.startsWith("SH") ||
          road.includes("HWY"));

      const district = isHighway(address.road)
        ? address.county || address.suburb || address.city
        : address.road || "";

      setFormData({
        ...formData,
        address: district || "", // Set the preferred address field
        city: address.city || "",
        region: address.state || "",
        postalCode: address.postcode || "",
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountPerItem = 2000; // Adjust if needed
  const totalDiscount = cartItems.reduce(
    (total, item) => total + discountPerItem * item.quantity,
    0
  );

  const calculatedTotal = total - discount;
  const savings = totalDiscount;

  return (
    <div className="cart-order">
      <div className="container-pregination">
        <h4 className="new-p-text">Please fill up the forms and place order</h4>
        <br />
        <br />
        <br />
        <br />
        <div className="checkout-wrapper">
          <div className="checkout-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-info-wrapper">
                <div className="contact-info-content">
                  <form onSubmit={handleSubmit}>
                    <div className="form-wrapper">
                      <div>
                        <h3 id="contact-info-heading" className="form-heading">
                          Contact Information
                        </h3>
                        <div className="form-group">
                          <label className="form-label" htmlFor="fullName">
                            Full Name
                          </label>
                          <input
                            className="form-input"
                            type="text"
                            name="fullName"
                            placeholder="Enter your name"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            className="form-input"
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            id="email"
                            value={formData.email} // Bind to formData.email
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <hr className="divider" />
                      <div>
                        <h3 className="form-heading">Payment Details</h3>
                        <div className="form-group">
                          <label htmlFor="paymentMethod" className="form-label">
                            Payment Method
                          </label>
                          <select
                            name="paymentMethod"
                            id="paymentMethod"
                            className="form-input"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                          >
                            <option value="card">Card</option>
                            <option value="esewa">Pay Via Phone</option>
                            <option value="cod">Cash On Delivery</option>
                          </select>
                        </div>
                        {formData.paymentMethod === "card" && (
                          <div className="form-grid">
                            <div className="form-group full-span">
                              <label htmlFor="cardNum" className="form-label">
                                Card Number
                              </label>
                              <input
                                className="form-input"
                                type="text"
                                name="cardNum"
                                placeholder="4242 4242 4242 4242"
                                id="cardNum"
                                value={formData.cardNum}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="expirationDate"
                                className="form-label"
                              >
                                Expiration Date (DD/MM/YYYY)
                              </label>
                              <input
                                type="date"
                                className="form-input"
                                name="expirationDate"
                                id="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="cvc" className="form-label">
                                CVC
                              </label>
                              <input
                                type="number"
                                className="form-input"
                                name="cvc"
                                placeholder="Enter your CVC"
                                id="cvc"
                                value={formData.cvc}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        )}
                        {formData.paymentMethod === "cod" && (
                          <p>
                            Cash on Delivery selected. Please prepare the cash
                            to pay upon delivery.
                          </p>
                        )}
                      </div>
                      <hr className="divider" />
                      <div>
                        <h3 className="form-heading">Shipping Address</h3>
                        <div className="form-grid">
                          <div className="form-group full-span">
                            <label htmlFor="address" className="form-label">
                              District
                            </label>
                            <input
                              type="text"
                              id="address"
                              name="address"
                              className="form-input"
                              value={formData.address}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="city" className="form-label">
                              City and Local Street Address
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              className="form-input"
                              value={formData.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="region" className="form-label">
                              State / Province
                            </label>
                            <input
                              type="text"
                              id="region"
                              name="region"
                              className="form-input"
                              value={formData.region}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="contact" className="form-label">
                              Contact Number
                            </label>
                            <input
                              type="text"
                              id="contact"
                              name="contact"
                              className="form-input"
                              value={formData.contact}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="postalCode" className="form-label">
                              Postal Code
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              className="form-input"
                              value={formData.postalCode}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="divider" />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="product-list">
              <div className="product-list-wrapper">
                <ul className="product-list-items">
                  {cartItems.map((product) => {
                    const imagePath = product.image1.startsWith("/")
                      ? product.image1.slice(1)
                      : product.image1;

                    return (
                      <li key={product.uniqueId} className="product-iteming">
                        <div className="product-info">
                          <div className="product-image">
                            <img
                              src={`${apiBaseUrl}/${imagePath}`} // Use a single slash here to form a valid URL
                              alt={product.name}
                              className="hello"
                            />
                          </div>
                          <div className="product-details">
                            <p className="product-name">{product.name}</p>
                            <p className="product-color">{product.color}</p>
                            <p className="product-quantity">
                              x {product.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="product-price-remove">
                          <p className="product-price">
                            ₹{product.price * product.quantity}
                          </p>
                          <button type="button" className="remove-button">
                            <span className="sr-only">Remove</span>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <hr className="divider" />
              <form action="#" className="coupon-form">
                <div className="coupon-wrapper">
                  <div className="coupon-input-wrapper">
                    <input
                      className="coupon-input"
                      type="text"
                      placeholder="Enter coupon code"
                    />
                  </div>
                  <div className="apply-coupon-button-wrapper">
                    <button type="button" className="apply-coupon-button">
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </form>
              <ul className="summary-list">
                <li className="summary-item">
                  <p className="summary-label">Price Without Discount</p>
                  <p className="summary-value">₹ {subtotal}</p>
                </li>
                <li className="summary-item">
                  <p className="summary-label">Discount</p>
                  <p className="summary-value">₹ {discount}</p>
                </li>
                <li className="summary-item total">
                  <p className="summary-label">Total</p>
                  <p className="summary-value">₹ {subtotal - discount}</p>
                </li>
                <li className="summary-item total">
                  <p className="summary-label">Confirm Order</p>
                  <p className="summary-value">
                    <button
                      type="submit"
                      className="btn-carts"
                      onClick={handleSubmit}
                    >
                      Place Order
                    </button>
                  </p>
                </li>
                <div className="button-wrapper">
                  {formData.paymentMethod === "pay_Via_phone" && (
                    <button
                      className="form-button"
                      type="button"
                      onClick={handleEsewaPayment}
                    >
                      Pay Via Phone
                    </button>
                  )}
                </div>
                <div className="savings">
                  You will save ₹ {discount} on this order
                </div>
                <h3>{name}</h3>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutTwo;
