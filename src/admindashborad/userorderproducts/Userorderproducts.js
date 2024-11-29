import React, { useState, useEffect } from "react";
import axios from "axios";
import './order.css';
import SidebarMenu from "../../Userdashbboard/sidebar";
import Footer from "../../component/footers/footer";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Dynamic API URL
const UserOrderProducts = () => {
  const [orders, setOrders] = useState([]);
  const [feedbackAlert, setFeedbackAlert] = useState("");

  useEffect(() => {
    // Fetch feedbacks on component mount
    const fetchFeedbacks = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        const response = await axios.get(
          `${apiBaseUrl}/user/order/products`,
          {
            params: { email: userEmail },
          }
        );

        setOrders(response.data.reverse());
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/user/order/delete/${id}`);
      setOrders(orders.filter((feedback) => feedback._id !== id));
      setFeedbackAlert("Feedback deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the feedback!", error);
      setFeedbackAlert("There was an error deleting the feedback!");
    }
  };

  return (
    <div>
      <div className="Order-page-container">
        <h1>Manage Orders</h1>
        {feedbackAlert && <h4 className="Order-alert">{feedbackAlert}</h4>}
        <div className="Order-grid">
          {orders.map((order) =>
            order.cartItems.map((product) => (
              <div key={product._id} className="Order-item">
                <img
                  src={`${product.image1}`}
                  alt={product.name}
                  className="product-details-image"
                />
                <p>User Details</p>
                <hr />
                <p>
                  <strong>User Name:</strong> {order.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>product Status :</strong> {order.status}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
                <hr />
                <p>products Details</p>
                <hr />
                <p>
                  <strong>Product Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Price:</strong> {product.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(order._id, product._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserOrderProducts;
