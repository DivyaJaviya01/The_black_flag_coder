import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../config/api';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('career-assessment');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // Check if query is within allowed topics
  const isAllowedTopic = (query) => {
    const normalizedQuery = query.toLowerCase();
    const isAllowed = API_CONFIG.ALLOWED_TOPICS.some(topic => 
      normalizedQuery.includes(topic.toLowerCase())
    );
    console.log('Topic check:', { query, isAllowed });
    return isAllowed;
  };
  
  // Validate query length
  const isValidQueryLength = (query) => {
    const isValid = query.length <= API_CONFIG.MAX_QUERY_LENGTH;
    console.log('Length check:', { queryLength: query.length, maxLength: API_CONFIG.MAX_QUERY_LENGTH, isValid });
    return isValid;
  };
  
  // Content filtering based on sensitivity level
  const filterContent = (query) => {
    // Basic profanity filter
    const profanityList = ['fuck', 'shit', 'bitch', 'damn', 'asshole'];
    
    if (API_CONFIG.CONTENT_FILTER_LEVEL === 'strict') {
      // Check for any profanity
      const hasProfanity = profanityList.some(word => 
        new RegExp(`\b${word}\b`, 'i').test(query)
      );
      console.log('Strict filter check:', { query, hasProfanity });
      return !hasProfanity;
    } else if (API_CONFIG.CONTENT_FILTER_LEVEL === 'medium') {
      // Check for repeated profanity
      const profanityCount = profanityList.filter(word => 
        new RegExp(`\b${word}\b`, 'i').test(query)
      ).length;
      
      const passesFilter = profanityCount < 2;
      console.log('Medium filter check:', { query, profanityCount, passesFilter });
      return passesFilter;
    }
    
    console.log('No filter applied');
    return true;
  };
  
  useEffect(() => {
    // Check authentication status when component mounts
    const userData = localStorage.getItem('user');
    setIsAuthenticated(!!userData);
    
    // Add initial AI message
    setConversation([
      {
        id: 1,
        text: "Hello! I'm your AI Career Guidance Assistant. How can I help you with your career today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, []);
  
  useEffect(() => {
    // Scroll to bottom when conversation changes
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    const userData = localStorage.getItem('user');
    if (!userData) {
      // Show authentication modal instead of redirecting
      setShowAuthModal(true);
      return;
    }
    
    if (!message.trim()) return;
    
    console.log('Processing message:', message);
    
    if (!isValidQueryLength(message)) {
      const errorMsg = "Please keep your query under " + API_CONFIG.MAX_QUERY_LENGTH + " characters.";
      console.log('Query too long:', errorMsg);
      addToConversation(errorMsg, 'ai');
      return;
    }
    
    if (!isAllowedTopic(message)) {
      const errorMsg = 'I can only help with career-related topics. Please ask about career paths, job trends, skill development, education options, or industry insights.';
      console.log('Topic not allowed:', errorMsg);
      addToConversation(errorMsg, 'ai');
      return;
    }
    
    if (!filterContent(message)) {
      const errorMsg = 'I can only help with appropriate content. Please rephrase your question.';
      console.log('Content filtered:', errorMsg);
      addToConversation(errorMsg, 'ai');
      return;
    }
    
    // Add user message to conversation
    const userMessage = {
      id: conversation.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      console.log('Sending request to AI API');
      // Updated to use gemini-1.5-flash which is available in v1beta
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_CONFIG.GOOGLE_AI_KEY}`,
        {
          contents: [{
            parts: [{
              text: `As an AI assistant specialized in ${selectedOption.replace('-', ' ')}, ${message}`
            }]
          }]
        }
      );
      
      console.log('AI API response:', response.data);
      
      const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 
        'Sorry, I could not process that request.';
      
      console.log('AI response text:', aiResponse);
      
      // Add AI response to conversation
      addToConversation(aiResponse, 'ai');
    } catch (error) {
      console.error('AI API Error:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMsg = "Sorry, I'm having trouble connecting to the AI service right now.";
      
      if (error.response?.status === 401) {
        errorMsg = "Invalid API key. Please contact the administrator.";
      } else if (error.response?.status === 429) {
        errorMsg = "Too many requests. Please wait a moment and try again.";
      } else if (error.response?.data?.error?.message) {
        errorMsg = `AI Service Error: ${error.response.data.error.message}`;
      }
      
      addToConversation(errorMsg, 'ai');
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };
  
  const addToConversation = (text, sender) => {
    const newMessage = {
      id: conversation.length + 1,
      text: text,
      sender: sender,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, newMessage]);
  };
  
  // Show loading state while determining authentication status
  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col h-full">
        <div className="text-center py-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading chatbot...</p>
        </div>
      </div>
    );
  }
  
  // Show chat interface
  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-4">
        {conversation.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-br-none' 
                  : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/20'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-slate-100 rounded-bl-none border border-white/20 rounded-2xl px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-auto p-4 border-t border-white/10">
        {/* AI Assistance Options Dropdown */}
        <div className="mb-3">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
          >
            <option value="career-assessment" className="bg-slate-800">Career Assessment</option>
            <option value="job-market-trends" className="bg-slate-800">Job Market Trends</option>
            <option value="skill-development" className="bg-slate-800">Skill Development</option>
            <option value="interview-preparation" className="bg-slate-800">Interview Preparation</option>
            <option value="industry-insights" className="bg-slate-800">Industry Insights</option>
          </select>
        </div>
        
        <div className="flex">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about career paths, job trends, or skill development..."
            className="flex-grow p-3 bg-white/10 border border-white/20 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 rounded-r-2xl font-medium transition-all duration-200 disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <div className="text-right mt-1 text-sm text-slate-400">
          {message.length}/{API_CONFIG.MAX_QUERY_LENGTH}
        </div>
      </form>
      
      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Sign In Required</h3>
            <p className="text-slate-300 mb-6">
              Please sign in to use the AI chat functionality. This helps us provide personalized career guidance and save your conversation history.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 text-slate-300 hover:bg-white/10 rounded-md transition-colors border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/signin')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-md hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;