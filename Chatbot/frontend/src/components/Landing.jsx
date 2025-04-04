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
    <nav className="bg-blue backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-blue-600 relative">
            <span className="absolute -inset-1 rounded-lg bg-blue-100 blur-sm -z-10"></span>
            Chatbot
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#features" className="text-white hover:text-blue-600 transition relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#waitlist" className="text-white hover:text-blue-600 transition relative group">
            Waitlist
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onLaunchChatbot}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-blue-300/50"
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
            className="md:hidden bg-white/90 backdrop-blur-sm"
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
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-500 relative inline-block">
            <span className="absolute -inset-1 rounded-lg bg-blue-900/30 blur-sm -z-10"></span>
            Chatbot
          </h3>
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
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transform hover:scale-110 transition">
              <Github />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transform hover:scale-110 transition">
              <Linkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transform hover:scale-110 transition">
              <Twitter />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 text-center text-gray-500 border-t border-gray-800 pt-4 relative z-10">
        © 2025 chatbot. All rights reserved.
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Technical Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.gray.800/60)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.800/60)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"></div>
        
        {/* Code-like Lines */}
        <div className="absolute left-10 top-1/3 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
        <div className="absolute right-20 top-2/3 w-48 h-1 bg-gradient-to-l from-blue-400 to-transparent rounded-full"></div>
        <div className="absolute left-1/4 bottom-1/4 w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
        
        {/* 3D Floating Elements */}
        <div className="absolute top-1/5 right-1/4 w-16 h-16 bg-transparent border border-blue-400/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-transparent border border-purple-400/30 rotate-12 animate-pulse delay-700"></div>
        <div className="absolute top-2/3 right-1/3 w-12 h-12 bg-transparent border border-green-400/30 -rotate-12 animate-bounce"></div>
      </div>

      <NavBar />
      
      {/* Hero Section with Chatbot Launch Button */}
      <header id="hero" className="container mx-auto px-4 py-16 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-4"
        >
          The <span className="text-blue-400 relative">
            <span className="absolute -inset-1 bg-blue-500/20 blur-sm rounded-lg -z-10"></span>
            ChatBot
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
        >
          Your AI-powered assistant that understands context, provides intelligent responses, and learns from every interaction.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onLaunchChatbot}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors flex items-center mx-auto space-x-2 shadow-lg shadow-blue-500/20 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            Launch Chatbot
            <ArrowRight className="ml-2" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </motion.button>
      </header>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 grid md:grid-cols-4 gap-8 relative z-10">
        {[
          {
            icon: <MessageCircle className="w-12 h-12 text-blue-400" />,
            title: "Natural Conversation",
            desc: "Engage in human-like dialogues with advanced context understanding.",
          },
          {
            icon: <Zap className="w-12 h-12 text-yellow-400" />,
            title: "Lightning Fast",
            desc: "Instant responses powered by cutting-edge AI technology.",
          },
          {
            icon: <Shield className="w-12 h-12 text-green-400" />,
            title: "Secure & Private",
            desc: "Your data is encrypted and never shared with third parties.",
          },
          {
            icon: <Star className="w-12 h-12 text-purple-400" />,
            title: "Continuous Learning",
            desc: "Improves and adapts with each interaction.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              rotateX: 5,
              z: 10
            }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-blue-500/20 transition-all text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full mb-4 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
            <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl rounded-full"></div>
          </motion.div>
        ))}
      </section>

      {/* Email Signup Section */}
      <section id="waitlist" className="container mx-auto px-4 py-16 text-center relative z-10">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg max-w-md mx-auto p-8 rounded-xl shadow-lg border border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 blur-sm rounded-full"></div>
            
            <div className="relative z-10">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">
                    Contact Us for more
                  </h2>
                  
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-white/20 border border-white/40 rounded-md focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-md hover:from-blue-500 hover:to-blue-400 transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Get Touched !
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-green-400 mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-200">
                    You're on the approved list. We'll contact you soon!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
};

export default ChatbotLandingPage;