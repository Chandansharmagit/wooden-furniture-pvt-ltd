import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios'; // Import axios
import './chat.css'; // Import the CSS file
import Footer from '../component/footers/footer';

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [privateMessage, setPrivateMessage] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [username, setUsername] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Fetch previous messages
    axios.get('http://localhost:8080/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));

    // WebSocket setup
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe('/group/public', (msg) => {
          const newMessage = JSON.parse(msg.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        if (username) {
          stompClient.subscribe(`/user/${username}/private`, (msg) => {
            const newMessage = JSON.parse(msg.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
        }
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, [username]);

  const sendMessage = () => {
    if (client && message && username) {
      client.publish({
        destination: '/app/message',
        body: JSON.stringify({ senderName: username, content: message }),
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderName: username, content: message },
      ]);
      setMessage('');
    }
  };

  const sendPrivateMessage = () => {
    if (client && privateMessage && receiverName && username) {
      client.publish({
        destination: '/app/private-messages',
        body: JSON.stringify({ senderName: username, receiverName, content: privateMessage }),
      });
      setPrivateMessage('');
    }
  };

  return (
    <>
  
    <div className="container">
      <div className="join-section">
        <h2>Join Chat</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"

        />
      </div>
      <div className="chat-section">
        <h2>Group Chat</h2>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.senderName === username ? 'sent' : 'received'}`}
            >
              <strong>{msg.senderName}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}

          onChange={(e) => setMessage(e.target.value)}
          className="input"
          placeholder='type a message'
        />
        <button onClick={sendMessage} className="button">Send</button>
      </div>
      <div className="private-section">
        <h2>Private Message</h2>
        <input
          type="text"
          placeholder="Receiver Name"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Type your private message"
          value={privateMessage}
          onChange={(e) => setPrivateMessage(e.target.value)}
          className="input"
        />
        <button onClick={sendPrivateMessage} className="button">Send Private Message</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Chatroom;
