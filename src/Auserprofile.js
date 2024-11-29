import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // Ensure this file exists for styling
import Login from "./component/loginpage/login";
import Footer from "./component/footers/footer";
import UserOrderProducts from "./admindashborad/userorderproducts/Userorderproducts";
import Policy from "./Apolicy/policy";
import TrackingOrder from "./component/header/trackingOrder";
import Wishlist from "./component/addtocartpage/Wishlist";
import Feedback_user from "./ProductFeedback/ProductsFeedback";
import { Navigate, useNavigate } from "react-router";
import AuthLoader from "./component/loaders/AuthLoader";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const Profile = () => {
  const [user, setUser] = useState({}); // Initialize user as null
  const [activeSection, setActiveSection] = useState(""); // State to track active section
  const [orders, setOrders] = useState([]);
  const [userlogin, setuserlogin] = useState("");
  const [loginauth, setuserAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/googlelogin`);
        const token = localStorage.getItem("usertoken");
        const userData = response.data.user;
        setUser(userData);
        if (token || response.status == 200) {
        } else {
          setTimeout(() => {
            <AuthLoader />;
          }, 2000);
          navigate("/login");
        }

        // Save user email to localStorage
        if (userData && userData.email) {
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("username", userData.displayName);
          console.log("The fetched name is ", userData.displayName);
          console.log("The fetched email is ", userData.email);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const loginwith_user = async () => {
    const token = localStorage.getItem("usertoken");
    const email = localStorage.getItem("userEmail");
    console.log("Token:", token);
    console.log("Email:", email);

    if (token) {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/userprofile_id/${email}` // Updated URL
        );
        console.log("API Response:", response);

        setuserlogin(response.data);
        if (response.status === 200) {
          setuserAuth(true);
        } else {
          setuserAuth(false);
        }
      } catch (error) {
        console.error(
          "Error occurred:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.log("Token not found yet");
    }
  };

  useEffect(() => {
    loginwith_user();
  }, []);

  const handleLogoutID = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem("usertoken");

      if (token) {
        // Make a request to the server to blacklist the token
        await axios.post(`${apiBaseUrl}/api/logout`, { token });

        // Remove the token from local storage+
        localStorage.removeItem("usertoken");

        // Optionally, redirect the user or update the UI
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("No token found in local storage");
      }
    } catch (error) {
      console.error("Logout failed", error);
      // Handle error (show an error message, etc.)
    }
  };

  const handleLogout = () => {
    window.open(`${apiBaseUrl}/logout`, `_self`);
  };

  //getting the user orders

  useEffect(() => {
    // Fetch feedbacks on component mount
    const fetchFeedbacks = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        const response = await axios.get(`${apiBaseUrl}/user/order/products`, {
          params: { email: userEmail },
        });

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
    } catch (error) {
      console.error("There was an error deleting the feedback!", error);
    }
  };

  return (
    <>
      <div className="chandan-profile-preg-preg">
        <div className="chandan-profile-preg">
          <div className="chandan-profile-preg-items firstdiv">
            {user || loginauth ? (
              <div className="det">
                <img
                  src={`${user.image}`}
                  alt="Profile"
                  className="profile-chandan"
                  id="p-chandan"
                />

                <h3>
                  {user.displayName} {userlogin.name}
                </h3>

                <h3>
                  {user.email}
                  {userlogin.email}
                </h3>
                <h3 onClick={() => setActiveSection("orders")}>My Orders</h3>
                <h3 onClick={() => setActiveSection("wishlist")}>
                  My WishList
                </h3>
                <h3 onClick={() => setActiveSection("trackOrder")}>
                  Track Order
                </h3>
                <h3 onClick={() => setActiveSection("address_book")}>
                  Sent Feedback us
                </h3>
                <h3 onClick={() => setActiveSection("helpDesk")}>Help Desk</h3>
                <button onClick={handleLogout} className="log-out">
                  Logout
                </button>
                <button onClick={handleLogoutID} className="log-out">
                  Logout 2
                </button>
              </div>
            ) : (
              <>
                <p>Please login</p>
              </>
            )}
          </div>
          <div className="chandan-profile-preg another-main-div">
            <div className="products-order">
              {activeSection === "orders" && (
                <div className="Order-grid">
                  {orders.map((order) =>
                    order.cartItems.map((product) => {
                      const imagePath = product.image1.startsWith("/")
                        ? product.image1.slice(1)
                        : product.image1;

                      return (
                        <div key={product._id} className="Order-item">
                          <img
                            src={`${apiBaseUrl}/${imagePath}`} // Use a single slash here
                            alt={product.name}
                            className="product-details-image"
                          />
                          <p>User Details</p>
                          <hr />
                          <p>
                            <strong className="strong">Product Status:</strong>{" "}
                            {order.status}
                          </p>
                          <hr />
                          <p>Product Details</p>
                          <h3>Product order ID: {order._id}</h3>
                          <hr />
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
                      );
                    })
                  )}
                </div>
              )}
              {activeSection === "wishlist" && (
                <h2>
                  <Wishlist />
                </h2>
              )}
              {activeSection === "trackOrder" && (
                <h2>
                  <TrackingOrder />
                </h2>
              )}
              {activeSection === "helpDesk" && <h2>Help Desk Information</h2>}
              {activeSection === "address_book" && (
                <h2>
                  <Feedback_user />
                </h2>
              )}
              {!activeSection && <h2>Welcome to Your Profile</h2>}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
