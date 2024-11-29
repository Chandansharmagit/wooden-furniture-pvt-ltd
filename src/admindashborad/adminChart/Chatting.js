import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './admin.css'; // Ensure this path points to your CSS file with the updated class names
import Footer from '../../component/footers/footer';

const AdminChatKafka = () => {
  const [users, setUsers] = useState([]); // List of unique users
  const [messages, setMessages] = useState([]); // List of messages
  const [reply, setReply] = useState(''); // Text for reply
  const messagesEndRef = useRef(null);
  const client = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // WebSocket setup
    const socket = new SockJS('http://localhost:8080/live-tracking');
    client.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to WebSocket');

        // Subscribe to the chat topic to receive messages from clients
        client.current.subscribe('/topic/chat', (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          const { sender, content } = receivedMessage;

          // Update users list and messages
          setUsers((prevUsers) => {
            if (!prevUsers.includes(sender)) {
              return [...prevUsers, sender];
            }
            return prevUsers;
          });

          setMessages((prevMessages) => [
            ...prevMessages,
            { text: content, type: 'received', user: sender }
          ]);
        });

        // Subscribe to the admin replies topic to receive replies from the server
        client.current.subscribe('/topic/admin-replies', (msg) => {
          const replyMessage = JSON.parse(msg.body);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: replyMessage.content, type: 'received', user: 'admin' }
          ]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      onWebSocketClose: (event) => {
        console.error('WebSocket connection closed: ', event);
      },
    });

    client.current.activate();

    return () => {
      client.current.deactivate();
    };
  }, []);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      const replyObj = { content: reply.trim() };

      console.log('Publishing reply:', replyObj); // Debugging log

      // Publish reply to Kafka topic via WebSocket endpoint
      client.current.publish({
        destination: '/app/sendAdminReply',
        body: JSON.stringify(replyObj),
      });

      // Clear the input field
      setReply('');
    } else {
      console.log('Reply is empty'); // Debugging log
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      console.log('Enter key pressed'); // Debugging log
      handleReplySubmit(e);
    }
  };

  return (
    <>

    <div className="adminChatContainer">
      <div className="adminSidebar">
        <div className="adminSidebarHeader">Users</div>
        <div className="adminSidebarUserList">
          {users.map((user, index) => (
            <div key={index} className="adminSidebarUser">
              {user}
            </div>
          ))}
        </div>
      </div>
      <div className="adminChatMain">
        <div className="adminChatHeader">Chat</div>
        <div className="adminChatMessageBox">
          {messages.map((msg, index) => (
            <div key={index} className={`adminChatMessage ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </div>
        <form onSubmit={handleReplySubmit} className="adminChatMessageForm">
          <textarea
            className="adminChatMessageInput"
            placeholder="Type your reply here..."
            value={reply}
            onChange={handleReplyChange}
            onKeyDown={handleKeyDown}
          />
          {/* <button type="submit" className="adminChatSendBtn">
            Send
          </button> */}
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminChatKafka;
