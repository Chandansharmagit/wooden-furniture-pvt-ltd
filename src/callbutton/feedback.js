import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./feed.css"; // Ensure this path points to your CSS file with the updated class names

const Feedback = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const client = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const socket = new SockJS("https://localhost:8080/live-tracking");
    client.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        client.current.subscribe("/topic/admin-replies", (msg) => {
          const adminReply = JSON.parse(msg.body);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: adminReply.content, type: "received", fromAdmin: true },
          ]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketClose: (event) => {
        console.error("WebSocket connection closed: ", event);
      },
    });

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const name = localStorage.getItem("username") || "Anonymous";
      const messageObj = { content: message.trim(), sender: name };

      client.current.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(messageObj),
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message.trim(), type: "sent" },
      ]);

      setMessage("");
    }
  };

  return (
    <div>
      <div className={`main-container ${isVisible ? "blur" : ""}`}>
        <div className="user-feedback-widget-container">
          <div className="user-feedback-widget-btn" onClick={toggleVisibility}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-chat-dots"
              viewBox="0 0 16 16"
              id="chat"
            >
              <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
            </svg>
          </div>
          <div
            className={`user-feedback-widget-message-box ${
              isVisible ? "user-feedback-widget-show" : ""
            }`}
          >
            <div className="user-feedback-widget-message-header">
              <h2>Woodenland Nepal</h2>
              <button
                className="user-feedback-widget-close-btn"
                onClick={toggleVisibility}
              >
                ×
              </button>
            </div>
            <div className="user-feedback-widget-message-content">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`user-feedback-widget-message ${msg.type} ${
                    msg.fromAdmin ? "from-admin" : ""
                  }`}
                >
                  {msg.text}env
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>
            <form
              onSubmit={handleSubmit}
              className="user-feedback-widget-message-form"
            >
              <textarea
                className="user-feedback-widget-message-input"
                placeholder="Type your message here..."
                value={message}
                onChange={handleChange}
              />
              <button type="submit" className="user-feedback-widget-send-btn">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
