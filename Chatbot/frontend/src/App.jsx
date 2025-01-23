import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
      try {
          const response = await axios.post("http://localhost:5000/chat", {
              message: input,
          });
  
          if (response.data.reply) {
              console.log("Bot reply:", response.data.reply);
              setMessages([...messages, { type: "user", text: input }, { type: "bot", text: response.data.reply }]);
          } else {
              console.error("No response received.");
          }
      } catch (error) {
          // Log the full error details to understand the issue
          if (error.response) {
              // The server responded with a status other than 2xx
              console.error("Backend responded with an error:", error.response.data);
          } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received from the backend:", error.request);
          } else {
              // Something else happened while setting up the request
              console.error("Error in setting up request:", error.message);
          }
      }
  };
  
  
  

    return (
        <div className="app">
            <h1>Chatbot</h1>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === "user" ? "user" : "bot"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default App;
