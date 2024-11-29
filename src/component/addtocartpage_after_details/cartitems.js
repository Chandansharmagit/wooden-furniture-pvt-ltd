import React, { useEffect, useState } from "react";
import { useCart } from "../contextpage/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cartitems.css"; // Ensure to update the CSS file accordingly
import Footer from "../footers/footer";
// import Newproducts_page from "../newproducts/newproducts_page";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Ensure this is set in your environment variables

function Checkout() {
  const [tokens, settokens] = useState("");
  const [islogin, setislogin] = useState(false);
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    user,
    isLogin,
    userLogin,
    loginAuth,
  } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      const itemDiscount = (item.oldprice - item.price) * item.quantity;
      return total + (itemDiscount > 0 ? itemDiscount : 0);
    }, 0);
  };

  const handleQuantityChange = (uniqueId, change) => {
    const item = cartItems.find((item) => item.uniqueId === uniqueId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(uniqueId, newQuantity);
  };

  const getuser = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/googlelogin`, {
        withCredentials: true,
      });
      console.log("response user", response.data);
      if (response.status === 200) {
        setislogin(true);
      } else {
        setislogin(false);
      }
    } catch (error) {
      console.log("Error getting user:", error);
      setislogin(false);
    }
  };

  useEffect(() => {
    usertokens();
    getuser();
  }, []);

  const usertokens = () => {
    const tokens = localStorage.getItem("usertoken");
    if (tokens) {
      settokens(tokens);
    }
  };

  const handleBuyNow = () => {
    if (islogin || tokens) {
      navigate("/orderconfirmation", {
        state: {
          cartItems,
          total: calculateTotal() - calculateDiscount(),
          discount: calculateDiscount(),
        },
      });
    } else {
      navigate("/login");
    }
  };

  const handleViewProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  return (
    <div className="chk-main-container">
      <div className="chk-container">
        <h4 className="new-p-text">Your cart Items..</h4>
        <form className="chk-cart-form">
          <section className="chk-cart-items">
            <ul className="chk-item-list">
              {cartItems.length === 0 ? (
                <li>No items in cart.</li>
              ) : (
                cartItems.map((item) => {
                  const imagePath = item.image1.startsWith("/")
                    ? item.image1.slice(1)
                    : item.image1;

                  return (
                    <li key={item.uniqueId} className="chk-cart-item">
                      <div
                        className="chk-item-image"
                        onClick={() => handleViewProduct(item._id)}
                      >
                        <img
                          src={`${apiBaseUrl}/${imagePath}`} // Use a single slash here for proper path
                          alt={item.name}
                        />
                      </div>
                      <div className="chk-item-details">
                        <h3 className="chk-item-name">{item.name}</h3>
                        <p className="chk-item-color">{item.color}</p>
                        <p className="chk-item-size">{item.size}</p>
                        <div className="chk-item-price">
                          <span className="chk-item-old-price">
                            ₹{item.oldprice}
                          </span>
                          <span className="chk-item-new-price">
                            ₹{item.price * item.quantity}
                          </span>
                          <span className="chk-item-discount">
                            You Saved ₹{item.oldprice - item.price} on this
                            order
                          </span>
                        </div>
                      </div>
                      <div className="chk-item-quantity">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.uniqueId, -1)}
                        >
                          -
                        </button>
                        <input type="text" value={item.quantity} readOnly />
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.uniqueId, 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="chk-btn-remove">
                        <button
                          className="chk-btn-cart"
                          onClick={() => removeFromCart(item.uniqueId)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </section>

          {/* Price Summary Section */}
          <section className="chk-price-summary">
            <h2 className="chk-summary-heading">Price Details</h2>
            <div className="chk-summary-details">
              <div className="chk-summary-item">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{calculateTotal()}</span>
              </div>

              <div className="chk-summary-item">
                <span>Discount</span>
                <span>₹{calculateDiscount()}</span>
              </div>

              <div className="chk-summary-item">
                <span>Delivery Charges</span>
                <span>Free</span>
              </div>

              <div className="chk-summary-total">
                <span>Total Amount</span>
                <span>₹{calculateTotal() - calculateDiscount()}</span>
              </div>
              <hr />
            </div>
            <div className="chk-savings">
              You will save ₹{calculateDiscount()} on this order
            </div>
            <div className="chk-btn-items">
              <button className="chk-btn-cart" onClick={handleBuyNow}>
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
      {/* <Newproducts_page /> */}
      <Footer />
    </div>
  );
}

export default Checkout;
