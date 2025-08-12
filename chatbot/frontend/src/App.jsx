import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { io } from "socket.io-client";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket,setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(()=>{
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on('message-response',(res)=>{
      setMessages(prevMessages => [...prevMessages, {
      text: res,
      time: new Date().toLocaleTimeString(),
      isUser: false
    }]);
    })

  },[])
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { 
        text: newMessage, 
        time: new Date().toLocaleTimeString(),
        isUser: true
      }]);
      socket.emit('message',newMessage)
      setNewMessage('');
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.isUser ? 'user-message' : 'other-message'}`}
          >
            <div className="message-content">{message.text}</div>
            <div className="message-time">{message.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Add this empty div as reference */}
      </div>
      <form onSubmit={handleSend} className="chat-input">
        <input
          type="text"
          value={newMessage}
          autoComplete='none'
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;