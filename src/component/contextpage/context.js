import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxi38T73Gx0J_4hzuz8iEQJJ3VbIXtD1k",
  authDomain: "push-notifications-fe2ff.firebaseapp.com",
  projectId: "push-notifications-fe2ff",
  storageBucket: "push-notifications-fe2ff.firebasestorage.app",
  messagingSenderId: "975429217568",
  appId: "1:975429217568:web:e6fb2d98dfb54417197b45",
  measurementId: "G-DXQRTBMH0X",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(firebaseApp);

// Create CartContext
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component
export const CartProvider = ({ children }) => {
  // Cart and wishlist states
  const [count, setCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Synchronize wishlist with localStorage and update count
  useEffect(() => {
    setWishlistCount(wishlist.length);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Synchronize cartItems with localStorage and update count
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.uniqueId === item.uniqueId
      );
      if (existingItem) {
        // Update quantity if item already exists
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.uniqueId === item.uniqueId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add new item to the cart
        return [
          ...prevCartItems,
          { ...item, uniqueId: uuidv4(), quantity: item.quantity },
        ];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.uniqueId !== itemId)
    );
  };

  // Function to update the quantity of a cart item
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.uniqueId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to add an item to the wishlist
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item._id === product._id)) {
        return prevWishlist; // Product is already in wishlist
      }
      const updatedWishlist = [...prevWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(
        (item) => item._id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const getFCMToken = async () => {
    try {
      // Request notification permission from the user
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // Get the FCM token from Firebase
        const token = await getToken(messaging, {
          vapidKey:
            "BLJhVyzGzUm9XMegZF8bgsj4b83lTwvmTyM7xvrHA5vkSrVDaqAb8A9GloYbvARvLj7Kf4LENLmLINCrW89Iqxc", // Replace with your VAPID key
        });

        if (token) {
          console.log("FCM Token:", token);

          // Assuming you have a way to get the logged-in user's ID (e.g., from localStorage or a global state)
          const userId = localStorage.getItem("userId"); // Replace with your method of obtaining the userId

          if (!userId) {
            console.log("User ID not found.");
            return; // Exit if userId is not available
          }

          // Send the token and userId to the backend to save the token
          const response = await axios.post(
            "http://localhost:5000/save-device-token",
            {
              token,
              userId,
            }
          );

          if (response.data.success) {
            console.log("Device token saved successfully");
          } else {
            console.error("Error saving device token:", response.data.message);
          }
        } else {
          console.log("FCM token not generated");
        }
      } else {
        console.log("Notification permission denied.");
      }
    } catch (err) {
      console.error("Unable to get FCM token:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        count,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount,
        getFCMToken, // Expose the function to get FCM token
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
