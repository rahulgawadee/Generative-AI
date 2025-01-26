import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatbotLandingPage from "./components/landing";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatbotLandingPage />} />
        <Route path="/chatbot" element={< Chatbot/>} />
      </Routes>
    </Router>
  );
}

export default App;
