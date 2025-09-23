import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../config/api';

const Chatbot = ({ disableAutoScroll = false }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const hasInitialized = useRef(false);
  const inputRef = useRef(null);
  
  // Check if query is within allowed topics - enhanced with comprehensive career fields
  const isAllowedTopic = (query) => {
    // Define comprehensive career-related keywords and topics across all categories
    const careerKeywords = [
      // General career terms
      'career', 'job', 'employment', 'profession', 'occupation', 'work', 'industry',
      'skill', 'education', 'degree', 'course', 'training', 'certification',
      'resume', 'cv', 'interview', 'salary', 'promotion', 'growth',
      'university', 'college', 'graduation', 'major', 'field of study',
      'job search', 'networking', 'application', 'cover letter',
      'work-life balance', 'remote work', 'freelance', 'entrepreneur',
      'leadership', 'management', 'team', 'colleague', 'boss',
      'technology', 'software', 'programming', 'design', 'marketing',
      'finance', 'healthcare', 'education sector', 'engineering', 'business',
      'creative', 'arts', 'media', 'law', 'government', 'non-profit',
      'startup', 'corporate', 'small business', 'consulting',
      'career change', 'transition', 'switch', 'pivot',
      'goal', 'objective', 'plan', 'strategy', 'development',
      'trend', 'market', 'demand', 'opportunity', 'prospect',
      'internship', 'volunteer', 'portfolio', 'personal brand',
      'negotiation', 'benefits', 'workplace', 'culture', 'diversity',
      'productivity', 'time management', 'communication', 'problem solving',
      
      // Science category
      'science', 'physics', 'chemistry', 'biology', 'mathematics', 'computer science',
      'ai', 'ml', 'artificial intelligence', 'machine learning', 'data science',
      'data scientist', 'data analysis', 'data analyst', 'big data',
      'neural network', 'deep learning', 'algorithm', 'python', 'tensorflow',
      'pytorch', 'nlp', 'computer vision', 'predictive analytics',
      'automation', 'robotics', 'scientific research', 'lab work', 'experiment',
      'astronomy', 'geology', 'environmental science', 'biotechnology',
      'genetics', 'microbiology', 'biochemistry', 'organic chemistry',
      'quantum physics', 'astrophysics', 'mathematician', 'statistician',
      'software developer', 'web developer', 'mobile app developer',
      'cybersecurity', 'information technology', 'networking', 'database',
      'cloud computing', 'devops', 'blockchain', 'cryptocurrency',
      
      // Commerce category
      'commerce', 'accounting', 'finance', 'business', 'economics', 'marketing',
      'sales', 'investment', 'banking', 'insurance', 'tax', 'audit',
      'financial planning', 'stock market', 'corporate finance', 'business management',
      'entrepreneurship', 'startup', 'small business', 'retail', 'e-commerce',
      'digital marketing', 'social media marketing', 'content marketing',
      'brand management', 'public relations', 'advertising', 'market research',
      'human resources', 'hr', 'recruitment', 'talent management',
      'supply chain', 'logistics', 'operations', 'project management',
      'business analyst', 'financial analyst', 'investment banker',
      'management consultant', 'real estate', 'hospitality', 'tourism',
      
      // Arts category
      'arts', 'history', 'literature', 'philosophy', 'psychology', 'political science',
      'sociology', 'anthropology', 'archaeology', 'languages', 'linguistics',
      'fine arts', 'painting', 'sculpture', 'drawing', 'photography',
      'music', 'theater', 'dance', 'film', 'cinema', 'media studies',
      'journalism', 'writing', 'creative writing', 'poetry', 'fiction',
      'graphic design', 'ux design', 'ui design', 'interior design',
      'fashion design', 'animation', 'game design', 'digital media',
      'communications', 'public speaking', 'debate', 'education', 'teaching',
      'museum studies', 'curator', 'art history', 'cultural studies',
      
      // Entertainment and Sports
      'actor', 'actress', 'acting', 'singer', 'musician', 'dance', 'dancer',
      'athlete', 'sports career', 'cricket career', 'football career', 'basketball career', 'tennis career',
      'olympics', 'professional sports', 'sports management', 'coach',
      'youtuber', 'content creator', 'influencer', 'streamer', 'social media career',
      'performing arts', 'entertainment career', 'celebrity', 'fame',
      
      // Military and Government Services
      'army', 'navy', 'air force', 'military', 'defense', 'soldier',
      'police', 'law enforcement', 'firefighter', 'emergency services',
      'government job', 'civil service', 'public administration',
      'indian army', 'navy', 'air force', 'paramilitary',
      
      // Culinary and Hospitality
      'chef', 'cooking career', 'culinary', 'baking', 'pastry', 'restaurant',
      'hotel management', 'catering', 'food service', 'nutrition',
      
      // Skilled Trades and Vocational
      'vocational', 'diploma', 'mechanic', 'fashion design', 'hotel management', 'skilled trade',
      'plumbing', 'electrical work', 'carpentry', 'welding', 'construction',
      'automotive repair', 'aircraft maintenance', ' hvac', 'refrigeration',
      'cosmetology', 'hairdressing', 'makeup artistry', 'nail technology',
      'healthcare assistant', 'nursing', 'medical technician', 'pharmacy assistant',
      'fitness trainer', 'personal trainer', 'physical therapy assistant',
      'emergency medical technician', 'paramedic', 'dental assistant',
      'veterinary assistant', 'agriculture', 'horticulture', 'landscaping',
      'aviation', 'pilot', 'flight attendant', 'air traffic control',
      'maritime', 'shipping', 'logistics', 'warehouse management'
    ];
    
    // Define off-topic keywords that should be rejected
    const offTopicKeywords = [
      'weather', 'news', 'sports results', 'entertainment', 'celebrity gossip',
      'recipe', 'cooking instructions', 'food recipe', 'restaurant review', 'travel', 'vacation',
      'movie plot', 'music album', 'book summary', 'game score', 'politics', 'election results',
      'crypto price', 'bitcoin value', 'stock price', 'investment return', 'gambling',
      'dating', 'relationship advice', 'love life', 'marriage', 'family drama',
      'health symptom', 'medical diagnosis', 'doctor appointment', 'medicine dosage', 'disease treatment',
      'religion', 'god', 'bible', 'quran', 'church', 'mosque',
      'joke', 'funny', 'meme', 'humor', 'comedy',
      'who won', 'match result', 'game result', 'score'
    ];
    
    // Convert query to lowercase for case-insensitive matching
    const lowerCaseQuery = query.toLowerCase();
    
    // Check if query contains off-topic keywords (reject if found)
    const isOffTopic = offTopicKeywords.some(keyword => 
      lowerCaseQuery.includes(keyword)
    );
    
    if (isOffTopic) {
      console.log('Off-topic query detected:', query);
      return false;
    }
    
    // Check if query contains any career-related keywords
    const isCareerRelated = careerKeywords.some(keyword => 
      lowerCaseQuery.includes(keyword)
    );
    
    // Additional check for queries that express career aspirations
    // These are phrases that indicate someone is thinking about a career path
    const careerAspirationPhrases = [
      'how do i become', 'how to become', 'want to be', 'want to work as',
      'interested in becoming', 'dream of being', 'aspire to be',
      'make a living as', 'earn money as', 'build a career as',
      'study to become', 'course for', 'education for', 'what should i study'
    ];
    
    const hasCareerAspiration = careerAspirationPhrases.some(phrase => 
      lowerCaseQuery.includes(phrase)
    );
    
    console.log('Topic check:', { query, isCareerRelated, isOffTopic, hasCareerAspiration });
    return isCareerRelated || hasCareerAspiration;
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
        new RegExp(`\\b${word}\\b`, 'i').test(query)
      );
      console.log('Strict filter check:', { query, hasProfanity });
      return !hasProfanity;
    } else if (API_CONFIG.CONTENT_FILTER_LEVEL === 'medium') {
      // Check for repeated profanity
      const profanityCount = profanityList.filter(word => 
        new RegExp(`\\b${word}\\b`, 'i').test(query)
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
        text: "Hello! I'm your AI Career Guidance Assistant. I can help you explore various career paths across Science, Commerce, Arts, and Vocational fields. Whether you're interested in technology, business, creative arts, or skilled trades, I can provide guidance on career opportunities, required skills, education options, resume writing, interview preparation, and industry insights.\n\nWhat would you like to know about your career today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    
    // Mark that we've initialized
    hasInitialized.current = true;
  }, []);

  useEffect(() => {
    // Only scroll to bottom when conversation changes AND we're not disabling auto scroll
    // AND we've already initialized (to prevent scrolling on initial load)
    if (!disableAutoScroll && hasInitialized.current) {
      // Scroll within the messages container only
      if (messagesContainerRef.current) {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          // Store current page scroll position
          const pageScrollPosition = window.scrollY;
          
          // Scroll the messages container to bottom
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          
          // Restore page scroll position to prevent page scrolling
          window.scrollTo(0, pageScrollPosition);
        });
      }
    }
  }, [conversation, disableAutoScroll]);
  
  const handleSendMessage = async () => {
    // Store current page scroll position
    const pageScrollPosition = window.scrollY;
    
    // Check if user is authenticated
    const userData = localStorage.getItem('user');
    if (!userData) {
      // Show authentication modal instead of redirecting
      setShowAuthModal(true);
      // Restore page scroll position
      window.scrollTo(0, pageScrollPosition);
      return;
    }
    
    if (!message.trim()) {
      // Restore page scroll position
      window.scrollTo(0, pageScrollPosition);
      return;
    }
    
    console.log('Processing message:', message);
    
    if (!isValidQueryLength(message)) {
      const errorMsg = "Please keep your query under " + API_CONFIG.MAX_QUERY_LENGTH + " characters.";
      console.log('Query too long:', errorMsg);
      addToConversation(errorMsg, 'ai');
      // Restore page scroll position
      window.scrollTo(0, pageScrollPosition);
      return;
    }
    
    // Check if the query is related to allowed topics
    if (!isAllowedTopic(message)) {
      const errorMsg = 'I specialize in career guidance and can help you with:\n' +
        '• Science & Technology careers (AI, Data Science, Engineering, etc.)\n' +
        '• Commerce & Business careers (Finance, Marketing, Entrepreneurship, etc.)\n' +
        '• Arts & Creative careers (Design, Media, Literature, etc.)\n' +
        '• Vocational & Skilled Trade careers (Mechanics, Healthcare, Culinary, etc.)\n\n' +
        'Please ask a career-related question, and I\'ll be happy to assist you!';
      console.log('Topic not allowed:', errorMsg);
      addToConversation(errorMsg, 'ai');
      // Restore page scroll position
      window.scrollTo(0, pageScrollPosition);
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
      console.log('Sending request to AI API with key:', API_CONFIG.GOOGLE_AI_KEY.substring(0, 10) + '...');
      
      // Updated to use gemini-1.5-flash which is available in v1beta
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_CONFIG.GOOGLE_AI_KEY}`,
        {
          contents: [{
            parts: [{
              text: `As an AI career guidance assistant, please provide a helpful and concise response to this career-related question: "${message}".\n\n` +
                `Focus on topics like career paths across Science (Technology, Engineering, Research), Commerce (Business, Finance, Marketing), ` +
                `Arts (Creative, Media, Humanities), and Vocational (Skilled Trades, Healthcare, Service) fields. ` +
                `Include information on job opportunities, skill development, education options, resume writing, ` +
                `interview preparation, industry trends, professional growth, and workplace insights.\n` +
                `If the question is not career-related, politely redirect the user to ask career-related questions.\n` +
                `Keep your response professional, informative, and focused on career guidance.`
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 second timeout
        }
      );
      
      console.log('AI API response:', response.data);
      
      // Check if the response has the expected structure
      if (!response.data.candidates || response.data.candidates.length === 0) {
        throw new Error('No candidates in AI response');
      }
      
      const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 
        'Sorry, I could not process that request.';
      
      console.log('AI response text:', aiResponse);
      
      // Add AI response to conversation
      addToConversation(aiResponse, 'ai');
    } catch (error) {
      console.error('AI API Error:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMsg = "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
      
      // More detailed error handling
      if (error.code === 'ECONNABORTED') {
        errorMsg = "The request timed out. Please try again.";
      } else if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          errorMsg = "Invalid API key. Please contact the administrator.";
        } else if (error.response.status === 429) {
          errorMsg = "Too many requests. Please wait a moment and try again.";
        } else if (error.response.status === 400) {
          errorMsg = "Invalid request. Please rephrase your question.";
        } else if (error.response.status >= 500) {
          errorMsg = "AI service is temporarily unavailable. Please try again later.";
        } else if (error.response.data?.error?.message) {
          errorMsg = `AI Service Error: ${error.response.data.error.message}`;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMsg = "Network error. Please check your internet connection and try again.";
      }
      
      addToConversation(errorMsg, 'ai');
    } finally {
      setIsLoading(false);
      setMessage('');
      
      // Keep focus on the input field without scrolling
      if (inputRef.current) {
        // Store current page scroll position
        const pageScrollPosition = window.scrollY;
        
        // Focus on input without scrolling
        inputRef.current.focus({ preventScroll: true });
        
        // Restore page scroll position
        window.scrollTo(0, pageScrollPosition);
      }
    }
  };

  const handleKeyPress = (e) => {
    // Allow sending message with Enter key (but not Shift+Enter for new lines)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
      {/* Messages Container - Flex layout to fill available space */}
      <div className="flex-grow overflow-y-auto space-y-4 p-4 custom-scrollbar" ref={messagesContainerRef} style={{ scrollBehavior: 'smooth' }}>
        {conversation.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 mr-3 mt-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
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
            {msg.sender === 'user' && (
              <div className="flex-shrink-0 ml-3 mt-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex-shrink-0 mr-3 mt-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
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
      
      {/* Input Form - Fixed at the bottom */}
      <div className="p-4 border-t border-white/10">
        <div className="flex">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about career paths, job trends, or skill development..."
            className="flex-grow p-3 bg-white/10 border border-white/20 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSendMessage();
            }}
            disabled={isLoading || !message.trim()}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 rounded-r-2xl font-medium transition-all duration-200 disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <div className="text-right mt-1 text-sm text-slate-400">
          {message.length}/{API_CONFIG.MAX_QUERY_LENGTH}
        </div>
      </div>
      
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
                onClick={() => window.location.href = '/signin'}
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