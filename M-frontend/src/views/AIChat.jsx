import React, { useEffect } from 'react';
import Chatbot from '../components/Chatbot';

const AIChat = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Career Guidance</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Using flex-grow to fill available space */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-6 flex-grow flex flex-col w-full overflow-hidden">
          {/* Title and Description - Simplified as per user preference */}
          <div className="text-center mb-6 flex-shrink-0">
            <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Career Guidance Assistant
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Ask me about career paths, job trends, skill development, education options, and more. 
              I'm here to help you make informed decisions about your future.
            </p>
          </div>

          {/* Chat Container - Streamlined interface as per user preference */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden flex-grow flex flex-col mx-auto w-full max-w-6xl">
            <Chatbot disableAutoScroll={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;