import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TalkWithAI = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    const userData = localStorage.getItem('user');
    if (!userData) {
      // Redirect to sign-in page
      navigate('/signin');
      return;
    }
    
    // In a real application, you would send the email here
    // For now, we'll just simulate the sending
    console.log('Email sent:', { email, message });
    setIsEmailSent(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsEmailSent(false);
      setEmail('');
      setMessage('');
    }, 3000);
  };

  // FAQ data
  const faqs = [
    {
      question: "How does the AI career guidance work?",
      answer: "Our AI analyzes your interests, skills, and goals to provide personalized career recommendations. It uses advanced algorithms to match your profile with suitable career paths and educational opportunities."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take your privacy seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your consent."
    },
    {
      question: "Can I get human support if needed?",
      answer: "Absolutely! While our AI provides instant guidance, you can always reach out to our human career experts through the 'Live Chat' section for more personalized assistance."
    },
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our AI has been trained on extensive career data and provides highly accurate recommendations. However, we always recommend discussing the results with a career counselor for the best outcomes."
    },
    {
      question: "What if I don't find a career that matches my interests?",
      answer: "Our AI continuously learns and updates its database. If you don't find what you're looking for, you can submit your interests through the Live Chat, and our team will help expand our recommendations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Talk with AI</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get personalized career guidance, connect with our team, or find answers to common questions
          </p>
        </div>

        {/* AI Chat Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-10">
          <div className="flex items-start mb-6">
            <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Career Guidance</h2>
              <p className="text-slate-300 mt-2">
                Get instant, personalized career advice from our AI assistant. Ask questions about career paths, job trends, skill development, and more.
              </p>
            </div>
          </div>
          <div className="text-center py-8">
            <Link to="/ai-chat" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Start AI Chat Session
            </Link>
            <p className="text-slate-300 mt-4">
              Click above to open a dedicated chat interface with our AI career assistant
            </p>
          </div>
        </div>

        {/* Live Chat (Email) Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-10">
          <div className="flex items-start mb-6">
            <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Contact Our Team</h2>
              <p className="text-slate-300 mt-2">
                Need personalized assistance? Send us a message and our career experts will get back to you shortly.
              </p>
            </div>
          </div>
          
          {isEmailSent ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
              <p className="text-green-300 font-medium">Message sent successfully! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
          <div className="flex items-start mb-6">
            <div className="bg-emerald-500/20 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-slate-300 mt-2">
                Find answers to common questions about our AI career guidance platform.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkWithAI;