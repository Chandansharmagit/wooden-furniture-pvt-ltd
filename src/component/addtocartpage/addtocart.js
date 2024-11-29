import React, { useState, useEffect } from "react";
import "./carts.css";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../footers/footer";
import { useCart } from "../contextpage/context";
import Loader from "../loaders/loader";
import PLogin from "../../poplogin/poplogin";
import ReactImageMagnify from "react-image-magnify";
import RelatedProduct from "../../ARelatedProducts/Relatedproducts";
import Newproducts_page from "../newproducts/newproducts_page";
import Visualize3D from "./visualize";
import Policy from "../../Apolicy/policy";

import AuthLoader from "../loaders/AuthLoader";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
function Addtocart() {
  const navigate = useNavigate();
  const [show3DView, setShow3DView] = useState(false); // New state for 3D view
  const { id } = useParams();
  const { addToCart, addToWishlist } = useCart();
  const [homeProduct, setHomeProduct] = useState(null);
  const [bedsproducts, setbedsproducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [carts, setCarts] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [countdown, setCountdown] = useState(86000 * 2); // 1 hour countdown in seconds
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [cartA, setCartA] = useState("Add to Cart");
  const [added, setadded] = useState("Add To Wishlist");
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  //making massageing sending logic here

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new SockJS("https://localhost:8080/live-tracking-data");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        stompClient.subscribe("/topic/admin-replies-products", (message) => {
          if (message.body) {
            setMessages((prevMessages) => [
              ...prevMessages,
              JSON.parse(message.body),
            ]);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
      },
    });

    stompClient.activate();
    setStompClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  // Handler for sending a message

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      const messageBody = {
        text: currentMessage,
        userId: "chandan@12", // Include user ID
        ...(isFirstMessage && {
          image: product?.image1, // or whichever image you want to send
          productName: product?.name,
        }),
      };

      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(messageBody),
      });

      setMessages([...messages, messageBody]);

      if (isFirstMessage) {
        setIsFirstMessage(false); // Set to false after sending the first message
      }

      setCurrentMessage("");
    }
  };

  // Handler for uploading an image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const messagePayload = {
          text: currentMessage,
          image: reader.result,
          productName: product ? product.name : null,
        };

        stompClient.publish({
          destination: "/app/chat",
          body: JSON.stringify(messagePayload),
        });

        setMessages((prevMessages) => [...prevMessages, messagePayload]);
        setCurrentMessage("");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/productinfo/${id}`)
      .then((response) => {
        // setHomeProduct(response.data.homeProduct);
        console.log(response.data.homeProduct);

        setProduct(
          response.data.product ||
            response.data.homeProduct ||
            response.data.bedsproducts ||
            response.data.tv_units ||
            response.data.daraz ||
            response.data.mirrormain ||
            response.data.lampsandlighting ||
            response.data.Wallmirror_m ||
            response.data.bedsideTables ||
            response.data.officetabls ||
            response.data.mattress ||
            response.data.photoframesProduct
        );
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  //getting teh current data and tmime

  const data = new Date();
  console.log(data);

  if (!homeProduct && !product && !bedsproducts) {
    return (
      <div>
        <AuthLoader />
      </div>
    );
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddToCart = () => {
    const cartItem = { ...product, quantity: carts };
    addToCart(cartItem);
    navigate("", { state: { cartItem } });
    setCartA("Adding Sucess !");
    setTimeout(() => {
      setCartA(" Add to Cart");
    }, 2000);
  };

  const handleAddToFavorites = () => {
    const cartitems = { ...product };
    addToWishlist(cartitems);
    setadded("Addedd Sucess !");
    setTimeout(() => {
      setadded("Add To Wishlist");
    }, 2000);
  };

  const formatCountdown = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="main-add-to-cart">
      <br />
      <br />
    
      <div className="main-cart">
        <div className="carts-pregination">
          <div className="carts-items">
            <h3 className="main-t">{`${product.name}/product.Oldprice=${product.oldprice}/New price.${product.price}`}</h3>
          </div>

          <div className="carts-items"></div>
          <div className="carts-items"></div>
        </div>

        <div className="carts-pregination">
          <div className="carts-items">
            <div className="magnify-wrapper">
              {product && (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth: true,
                      src: `https://backendwoodennepal.nepalmodelsecondaryschool.com/${product.image1}`,
                      width: 1800,
                      height: 8000,
                    },
                    largeImage: {
                      src: `https://backendwoodennepal.nepalmodelsecondaryschool.com/${product.image1}`,
                      width: 2000,
                      height: 2000,
                    },
                  }}
                />
              )}
            </div>
          </div>
          <div className="carts-items">
            <div className="detailing">
              <div className="texts-id">
                {product && (
                  <>
                    <br />
                    <h3 className="carts-text">Name: {product.name}</h3>
                    <hr />

                    <h3 className="carts-text">Desc: {product.description}</h3>
                    <hr />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      id="love"
                      fill="currentColor"
                      className="bi bi-bag-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                    </svg>

                    <span
                      onClick={handleAddToFavorites}
                      className="wishlist_add"
                    >
                      {added}
                    </span>
                    <hr />

                    <h3 className="carts-text">Customized Products</h3>
                    <h3 className="carts-text">
                      Products Should be returned before 1 month from buying
                      date.If any fault Occur.
                    </h3>

                    <h3 className="carts-text">
                      24*7 Customer Support available.
                    </h3>

                    <span className="item-old-price">
                      Rs {product.oldprice}
                    </span>
                    <span className="item-new-price">Rs {product.price}</span>

                    <span className="item-new-price"> (20% off)</span>

                    <h3 className="carts-text">
                      Manufacturer: {product.manufacturer}
                    </h3>
                    <h3 className="carts-text">In Stock: {product.stock}</h3>
                    <h3 className="carts-text">
                      Warrenty: {product.warranty} Year
                    </h3>
                    <h3 className="carts-text">
                      Product Weight: {product.weight} kgs
                    </h3>

                    <span className="item-new-price" id="time">
                      Limited Offer : {formatCountdown(countdown)}
                    </span>

                    <div className="btn-preginations">
                      <div className="btn-items">
                        <h3 className="carts-text">Quantity</h3>
                      </div>
                      <div className="btn-items">
                        <button
                          className="btn-cart"
                          onClick={() => setCarts(carts + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="btn-items">
                        <h3 className="carts-text">{carts}</h3>
                      </div>
                      <div className="btn-items">
                        <button
                          className="btn-cart"
                          onClick={() => {
                            if (carts > 1) {
                              setCarts(carts - 1);
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>

                    <div className="btn-preginations">
                      <div className="btn-items">
                        <button className="btn-carts" onClick={handleAddToCart}>
                          {cartA}
                        </button>
                      </div>
                      <div className="btn-items">
                        <button className="btn-carts">Buy Now</button>
                      </div>
                      <div className="btn-items">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          id="chat_us"
                          fill="currentColor"
                          className="bi bi-chat-square-text"
                          viewBox="0 0 16 16"
                          onClick={() => setShowChatPopup(true)} // Show the chat popup when clicked
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg>
                      </div>
                      <div className="btn-items">
                        <h3
                          id="chat_us_text"
                          onClick={() => setShowChatPopup(true)}
                        >
                          {" "}
                          Chat with suppliers
                        </h3>
                      </div>

                      {showChatPopup && (
                        <div className="chat-popup">
                          <div className="chat-content">
                            <button
                              className="close-button"
                              onClick={() => setShowChatPopup(false)} // Close the chat popup when clicked
                            >
                              X
                            </button>
                            <h3>Chat with suppliers Of Wooden Nepal</h3>

                            <div className="chat-messages">
                              {messages.map((message, index) => (
                                <div key={index} className="chat-message">
                                  <p>
                                    <strong>User ID:</strong> {message.userId}
                                  </p>{" "}
                                  {/* Display user ID */}
                                  <p>{message.text}</p>
                                  {message.image && (
                                    <img
                                      src={message.image}
                                      alt="User uploaded"
                                    />
                                  )}
                                  {message.productName && (
                                    <div>
                                      <p>Product: {message.productName}</p>
                                      {message.image && (
                                        <img
                                          src={message.image}
                                          alt="Product"
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="chat-input-section">
                              <input
                                type="text"
                                placeholder="Type your message..."
                                value={currentMessage}
                                onChange={(e) =>
                                  setCurrentMessage(e.target.value)
                                }
                                className="chat-input"
                              />

                              <div className="chat-input-options">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="chat-upload"
                                />
                                <button
                                  onClick={handleSendMessage}
                                  className="send-button"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="protections">
                <div className="under-p">
                  <br />

                  <h3>Protections for this product</h3>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-cart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  <span className="return_policy">
                    {" "}
                    Get your money back for product or delivery issues
                  </span>
                  <br />
                  <br />
                  <p className="desc-return">
                    Enjoy free returns to a local warehouse near you and
                    guaranteed refunds with dedicated support from WoodLand
                    Nepal if products arrive defective, incorrect, or damaged.
                  </p>
                  <br />
                  <p className="desc-return">
                    If your order hasn't been shipped or is missing, you can
                    also claim a refund. Our standard refund policy applies.
                  </p>

                  <h3 className="return_policy">
                    Note : Apply within 30 days of delivery. Otherwise your
                    refund shouldnot be listened.
                  </h3>

                  <hr />

                  <h3>Protections for this product</h3>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-wallet"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1" />
                  </svg>
                  <span className="return_policy"> Secure payments</span>
                  <br />
                  <br />
                  <p className="desc-return">
                    Every payment you make on WoodLand is secured with strict
                    SSL encryption and PCI DSS data protection protocols
                  </p>

                  <p className="desc-return">
                    To protect your payment, never pay outside of the platform.
                  </p>
                  <br />
                  <br />

                  <hr />

                  <br />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-wallet"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1" />
                  </svg>
                  <span className="return_policy " id="re">
                    {" "}
                    Care & Instructions
                  </span>

                  <br />
                  <br />
                  <ul className="desc-return">
                    <li>Dust the furniture regularly.</li>
                    <li>
                      Wipe the wooden surface with a clean microfiber cloth
                      damped in a wood-friendly cleanser.
                    </li>
                    <li>
                      Immediately wipe the moisture with a dry, soft, and
                      lint-free cloth.
                    </li>
                    <li>
                      In case of a spill, blot the stain with a clean, dry cloth
                      in a gentle manner.
                    </li>
                    <li>Do not use coarse material or rub the spot briskly.</li>
                    <li>
                      Use mats and coasters before keeping any hot or cold items
                      on the wooden surface.
                    </li>
                    <li>
                      Ensure that the furniture does not have any exposure to
                      moisture and water.
                    </li>
                    <li>
                      Protect the material from direct sunlight and heat to
                      maintain its original quality.
                    </li>
                    <li>
                      Keep sharp objects away from your furniture to avoid cuts
                      and scratches.
                    </li>
                    <li>
                      Avoid chemical and alcohol contact with the furniture as
                      it might harm the natural finish and durability of the
                      product.
                    </li>
                  </ul>

                  <p className="desc-return">
                    Please note: Do not drag the furniture to relocate it, as
                    this might weaken the joints. Instead, lift the wooden
                    furniture if you want to move it.
                  </p>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="carts-pregination">
          <div className="carts-items">
            <button
              className={`btn-cartss fav ${
                activeTab === "description" ? "active" : ""
              }`}
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
          </div>

          <div className="carts-items">
            <button
              className={`btn-cartss fav ${
                activeTab === "specifications" ? "active" : ""
              }`}
              onClick={() => handleTabClick("specifications")}
            >
              Product Specs
            </button>
          </div>
          <div className="carts-items">
            <button
              className={`btn-cartss fav ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => handleTabClick("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className="carts-items">
            <button
              className={`btn-cartss fav ${
                activeTab === "looks" ? "active" : ""
              }`}
              onClick={() => handleTabClick("looks")}
            >
              Looks
            </button>
          </div>

          <div className="carts-items">
            <button
              className={`btn-cartss fav ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => handleTabClick("reviews")}
            >
              Experience Stores
            </button>
          </div>

          <div className="carts-items">
            <button
              className={`btn-cartss fav ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => handleTabClick("reviews")}
            >
              Customer Feedback
            </button>
          </div>
          <div className="carts-items">
            <button
              className={`btn-cartss fav ${
                activeTab === "visualize" ? "active" : ""
              }`}
              onClick={() => {
                handleTabClick("visualize");
                setShow3DView(!show3DView); // Toggle 3D view
              }}
            >
              Visualize in Your Space
            </button>
          </div>
        </div>

        <div className="carts-pregination">
          <div className="carts-items">
            {activeTab === "description" && product && (
              <div className="tab-content">
                <img
                  src={`https://backendwoodennepal.nepalmodelsecondaryschool.com/${product.image1}`}
                  alt=""
                  className="carts-imgs"
                />
                <img
                  src={`https://backendwoodennepal.nepalmodelsecondaryschool.com/${product.image2}`}
                  alt=""
                  className="carts-imgs"
                />
                <img
                  src={`https://backendwoodennepal.nepalmodelsecondaryschool.com/${product.image3}`}
                  alt=""
                  className="carts-imgs"
                />
              </div>
            )}
            {activeTab === "specifications" && product && (
              <div className="table-container">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Dimensions</th>
                      <th>Material</th>
                      <th>Color</th>
                      <th>Price</th>
                      <th>Weight</th>
                      <th>Manufacturer</th>
                      <th>Warranty</th>
                      <th>Stock</th>
                      <th>Discount Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.dimensions}</td>
                      <td>{product.material}</td>
                      <td>{product.color}</td>
                      <td>₹{product.price}</td>
                      <td>{product.weight} kg</td>
                      <td>{product.manufacturer}</td>
                      <td>{product.warranty}</td>
                      <td>In Stock: {product.stock}</td>
                      <td>Discounts: {product.discountDuration} days Remaining</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="tab-content">
                <h2>Reviews</h2>
                <form class="container">
                  <header>
                    <h1 class="title">Edit your profile</h1>
                  </header>

                  <div class="form">
                    <div class="field">
                      <label for="firstname">First name</label>
                      <input class="input" type="text" name="firstname" />
                    </div>

                    <div class="field">
                      <label for="email">Email</label>
                      <input
                        class="input"
                        type="text"
                        name="email"
                        placeholder="name@website.com"
                      />
                    </div>

                    <div class="field">
                      <label for="phone">Phone number</label>
                      <input class="input" type="text" name="phone" />
                    </div>

                    <div class="field">
                      <label for="address">Address</label>
                      <input class="input" type="text" name="address" />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "looks" && (
              <div className="tab-content">
                <h2>Looks</h2>

                <h4>hey the looks funtion is in updating mode </h4>
              </div>
            )}

            {activeTab === "visualize" && show3DView && (
              <div className="visualize">
                {product.modelUrl ? (
                  <Visualize3D
                    modelUrl={`http://localhost:3000/v/${product.modelUrl}`}
                  />
                ) : (
                  <p>3D model not available.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* <div className="carts-pregination">
        <div className="carts-items">
          <h3></h3>
          <Newproducts_page />
        </div>
      </div> */}

        {showLoginPopup && <PLogin setShowLoginPopup={setShowLoginPopup} />}
       
      </div>
      <br />
      <br />

      <Footer />
    </div>
  );
}

export default Addtocart;
