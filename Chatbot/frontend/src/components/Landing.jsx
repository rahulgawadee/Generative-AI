import React, { useState } from 'react';
import { MessageCircle, Zap, Shield, Star, ArrowRight, Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotLandingPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  const onLaunchChatbot = () => {
    navigate("/chatbot");
  };

  const NavBar = () => (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-blue-600">Rahul's Chatbot</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
          <a href="#waitlist" className="text-gray-700 hover:text-blue-600 transition">Waitlist</a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onLaunchChatbot}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Launch Chatbot
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600">Features</a>
              <a href="#waitlist" className="block py-2 text-gray-700 hover:text-blue-600">Waitlist</a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onLaunchChatbot}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Launch Chatbot
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-500">Rahul's Chatbot</h3>
          <p className="text-gray-400">Your AI-powered assistant for intelligent conversations.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            <a href="#features" className="block text-gray-300 hover:text-white transition">Features</a>
            <a href="#waitlist" className="block text-gray-300 hover:text-white transition">Waitlist</a>
            <a href="/privacy" className="block text-gray-300 hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <Github />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <Linkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <Twitter />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 text-center text-gray-500 border-t border-gray-800 pt-4">
        © 2024 Rahul's chatbot. All rights reserved.
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      {/* Hero Section with Chatbot Launch Button */}
      <header id="hero" className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          Rahul's <span className="text-blue-600">ChatBot</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-700 max-w-2xl mx-auto mb-8"
        >
          Your AI-powered assistant that understands context, provides intelligent responses, and learns from every interaction.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onLaunchChatbot}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto space-x-2"
        >
          Launch Chatbot
          <ArrowRight className="ml-2" />
        </motion.button>
      </header>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 grid md:grid-cols-4 gap-8">
        {[
          {
            icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
            title: "Natural Conversation",
            desc: "Engage in human-like dialogues with advanced context understanding.",
          },
          {
            icon: <Zap className="w-12 h-12 text-yellow-500" />,
            title: "Lightning Fast",
            desc: "Instant responses powered by cutting-edge AI technology.",
          },
          {
            icon: <Shield className="w-12 h-12 text-green-500" />,
            title: "Secure & Private",
            desc: "Your data is encrypted and never shared with third parties.",
          },
          {
            icon: <Star className="w-12 h-12 text-purple-500" />,
            title: "Continuous Learning",
            desc: "Improves and adapts with each interaction.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-700">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Email Signup Section */}
      <section id="waitlist" className="container mx-auto px-4 py-16 text-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-md mx-auto p-8 rounded-xl shadow-lg"
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                 Contact Us for more
                </h2>
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Get Touched !
                </button>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Thank You!
                </h2>
                <p className="text-gray-700">
                  You're on the approved. We'll contact you soon!
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
};

export default ChatbotLandingPage;