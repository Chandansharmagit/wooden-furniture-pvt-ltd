import React, { useState, useEffect } from 'react';
import { Client as StompClient } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new SockJS('http://localhost:8089/ws'); // Ensure backend endpoint is correct
    const client = new StompClient({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000, // Automatically reconnect every 5 seconds if connection is lost
    });

    client.onConnect = () => {
      console.log('Connected to WebSocket');

      // Subscribe to notifications
      client.subscribe('/topic/notifications', (message) => {
        const notificationMessage = JSON.parse(message.body);
        setNotifications((prev) => [...prev, notificationMessage]);
      });
    };

    client.onStompError = (error) => {
      console.error('Error with STOMP:', error);
    };

    client.activate(); // Initiate connection
    setStompClient(client);

    return () => {
      // Cleanup on component unmount
      if (client.connected) {
        client.deactivate();
        console.log('Disconnected from WebSocket');
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && stompClient.connected && message) {
      // Send a message to the backend
      stompClient.publish({
        destination: '/app/send',
        body: JSON.stringify({ message }),
      });
      setMessage(''); // Clear input field after sending
    } else {
      console.error('STOMP client is not connected');
    }
  };

  return (
    <div>
      <h2>WebSocket Notifications</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send Message</button>

      <h3>Notifications:</h3>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
