import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { 
  Send, 
  Paperclip, 
  Smile, 
  UserCircle, 
  MoreVertical, 
  ArrowLeft, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState(null);
  const chatWindowRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
        })
      });

      const data = await response.json();

      if (data.reply) {
        const newMessages = [
          ...messages,
          { 
            id: Date.now(), 
            type: "user", 
            text: input, 
            file: selectedFile 
          },
          { 
            id: Date.now() + 1, 
            type: "bot", 
            text: data.reply 
          }
        ];
        setMessages(newMessages);
        setInput("");
        setSelectedFile(null);
      } else {
        showNotification("No response from server", 'error');
      }
    } catch (error) {
      showNotification("Error sending message", 'error');
      console.error("Error:", error.message);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setIsTyping(input.length > 0);
  }, [input]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'error' 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}
        >
          {notification.message}
          <button 
            onClick={() => setNotification(null)}
            className="ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Header */}
      <div className="bg-white shadow-md flex items-center p-4">
        <ArrowLeft 
          className="mr-4 text-gray-600 cursor-pointer" 
          onClick={() => navigate("/")} // Navigate to the landing page
        />
        <UserCircle className="w-10 h-10 mr-3 text-gray-400" />
        <div className="flex-grow">
          <h2 className="font-bold text-lg">AI Assistant</h2>
          <p className="text-xs text-gray-500">
            {isTyping ? "Typing..." : "Online"}
          </p>
        </div>
        <MoreVertical className="text-gray-600 cursor-pointer" />
      </div>

      {/* Chat Window */}
      <div 
        ref={chatWindowRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#F0F2F5]"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.type === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl text-sm ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-black rounded-bl-none shadow-sm"
                }`}
              >
                {msg.text}
                {msg.file && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(msg.file)} 
                      alt="Uploaded file" 
                      className="max-w-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
       
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            
            accept="image/*"
          />
         
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-grow p-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        {selectedFile && (
          <div className="mt-2 flex items-center">
            <img 
              src={URL.createObjectURL(selectedFile)} 
              alt="Selected file" 
              className="w-20 h-20 object-cover rounded-lg mr-2"
            />
            <span className="text-sm text-gray-500">{selectedFile.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
