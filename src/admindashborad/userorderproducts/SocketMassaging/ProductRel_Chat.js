import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import './ProductRel.css';
import Footer from "../../../component/footers/footer";
import SidebarMenu from "../../../Userdashbboard/sidebar";

const ProductRel_Chat = () => {
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const userId = "chandan@12"; // Replace with actual user ID

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws'); // WebSocket URL
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        client.subscribe('/topic/admin', (message) => {
          console.log('Received message:', message.body);
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [
            ...prevMessages,
            receivedMessage
          ]);
        });
        setStompClient(client);
      },
      onStompError: (frame) => {
        setConnectionError('Failed to connect to WebSocket.');
        console.error('STOMP Error:', frame);
      },
      onWebSocketError: (event) => {
        setConnectionError('WebSocket error.');
        console.error('WebSocket Error:', event);
      }
    });

    client.activate();

    return () => {
      if (client) {
        client.deactivate();
        console.log('Disconnected');
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (currentMessage.trim() || messages.some(msg => msg.image)) {
      const message = {
        userId,
        text: currentMessage,
        image: "",
        productName: isFirstMessage ? "Product Name" : ""
      };
      sendMessage(message);
      setCurrentMessage("");
      setIsFirstMessage(false);
    } else {
      console.log('No message to send');
    }
  };

  const sendMessage = (message) => {
    if (stompClient) {
      console.log('Sending message:', message);
      stompClient.publish({
        destination: '/app/chat.send',
        body: JSON.stringify(message),
        headers: {}
      });
    } else {
      console.error('STOMP Client not initialized');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const message = {
          userId,
          text: "",
          image: reader.result,
          productName: isFirstMessage ? "Product Name" : ""
        };
        setMessages((prevMessages) => [
          ...prevMessages,
          message
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="product-chat-popup">
        <div className="product-chat-content">
          <h3>Chat with Suppliers of Wooden Nepal</h3>

          {connectionError && <p className="error-message">{connectionError}</p>}

          <div className="product-chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`product-chat-message ${message.userId === userId ? 'sent' : 'received'}`}
              >
                <div className="product-chat-message-content">
                  <p>{message.text}</p>
                  {message.image && (
                    <img src={message.image} alt="User uploaded" className="product-chat-image" />
                  )}
                  {message.productName && (
                    <div>
                      <p>Product: {message.productName}</p>
                      {message.image && <img src={message.image} alt="Product" className="product-chat-image" />}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="product-chat-input-section">
            <input
              type="text"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              className="product-chat-input"
            />

            <div className="product-chat-input-options">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="product-chat-upload"
              />
              <button onClick={handleSendMessage} className="product-chat-send-button">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <SidebarMenu />
      <Footer />
    </div>
  );
};

export default ProductRel_Chat;
