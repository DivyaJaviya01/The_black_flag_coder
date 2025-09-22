import React, { useState, useEffect } from 'react';

function MotivationalQuotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const careerQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Your career is a marathon, not a sprint. Pace yourself and keep moving forward.",
    "Don't be afraid to give yourself everything you've ever wanted in life.",
    "The future depends on what you do today.",
    "Success is where preparation and opportunity meet.",
    "Your only limit is your mind. Dream big, work hard, stay focused.",
    "Every expert was once a beginner. Every pro was once an amateur.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Choose a job you love, and you will never have to work a day in your life.",
    "Opportunities don't happen. You create them.",
    "The way to get started is to quit talking and begin doing.",
    "Innovation distinguishes between a leader and a follower.",
    "Your work is going to fill a large part of your life, make it meaningful.",
    "Success is not about being the best. It's about always getting better.",
    "The only impossible journey is the one you never begin.",
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going.",
    "The difference between ordinary and extraordinary is that little extra.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The expert in anything was once a beginner.",
    "You don't have to be great to get started, but you have to get started to be great.",
    "The road to success is always under construction.",
    "Success is not just about what you accomplish in your life, it's about what you inspire others to do.",
    "Your career should be a series of dots that you can connect looking backward.",
    "The biggest risk is not taking any risk at all.",
    "Hard work beats talent when talent doesn't work hard.",
    "Success isn't just about reaching your destination; it's about who you become along the way.",
    "The only person you are destined to become is the person you decide to be.",
    "Your career is what you're paid for. Your calling is what you're made for.",
    "Success is not measured by money, but by the impact you make.",
    "Every setback is a setup for a comeback.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Success is going from failure to failure without losing your enthusiasm.",
    "Your potential is endless. Your career is just the beginning."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => 
          (prevIndex + 1) % careerQuotes.length
        );
        setIsVisible(true);
      }, 500);
      
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [careerQuotes.length]);

  return (
    <div className="relative max-w-6xl mx-auto px-6 md:px-10">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl opacity-60"></div>
      
      {/* Large floating spheres */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-8 w-20 h-20 bg-gradient-to-br from-emerald-400/15 to-teal-400/15 rounded-full blur-lg animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-16 right-16 w-28 h-28 bg-gradient-to-br from-violet-400/15 to-indigo-400/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '6s'}}></div>
      
      {/* Medium floating spheres */}
      <div className="absolute top-24 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-md animate-bounce" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
      <div className="absolute bottom-24 right-1/4 w-14 h-14 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full blur-md animate-bounce" style={{animationDuration: '4s', animationDelay: '2.5s'}}></div>
      
      {/* Flowing lines and patterns */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-200/40 to-transparent opacity-60"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-200/40 to-transparent opacity-60"></div>
      <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-pink-200/40 to-transparent opacity-60"></div>
      <div className="absolute left-0 bottom-1/4 w-full h-px bg-gradient-to-r from-transparent via-indigo-200/40 to-transparent opacity-60"></div>
      
      {/* Diagonal flowing lines */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-8 left-8 w-32 h-px bg-gradient-to-r from-blue-300/30 to-transparent rotate-45 origin-left"></div>
        <div className="absolute top-16 right-8 w-24 h-px bg-gradient-to-l from-purple-300/30 to-transparent -rotate-45 origin-right"></div>
        <div className="absolute bottom-16 left-16 w-28 h-px bg-gradient-to-r from-pink-300/30 to-transparent rotate-45 origin-left"></div>
        <div className="absolute bottom-8 right-16 w-20 h-px bg-gradient-to-l from-emerald-300/30 to-transparent -rotate-45 origin-right"></div>
      </div>
      
      <div className="relative z-10 text-center py-4">
        {/* Enhanced Header */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Daily Inspiration
          </h2>
          <p className="text-base text-gray-600 font-medium">
            ✨ Fuel your career journey ✨
          </p>
        </div>

        {/* Premium Quote Display */}
        <div className="relative">
          {/* Quote background card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border border-white/50 relative overflow-hidden">
            {/* Decorative quote marks */}
            <div className="absolute top-2 left-3 text-3xl text-blue-200 font-serif opacity-40">"</div>
            <div className="absolute bottom-2 right-3 text-3xl text-blue-200 font-serif opacity-40 rotate-180">"</div>
            
            {/* Animated quote content */}
            <div className="relative min-h-[80px] flex items-center justify-center px-4">
              <blockquote 
                className={`text-lg md:text-xl lg:text-2xl font-light text-gray-800 leading-relaxed italic transition-all duration-500 text-center max-w-3xl ${
                  isVisible ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-4 scale-95'
                }`}
              >
                {careerQuotes[currentQuoteIndex]}
              </blockquote>
            </div>
            
            {/* Gradient line decoration */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mt-4"></div>
          </div>
        </div>

        {/* Enhanced Progress Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {careerQuotes.slice(0, 8).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                Math.floor(currentQuoteIndex / 4) === Math.floor(index / 4)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        {/* Enhanced floating elements */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-32 right-32 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full animate-bounce opacity-50" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-32 left-32 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full animate-bounce opacity-40" style={{animationDelay: '5s'}}></div>
        
        {/* Additional floating dots with ping animation */}
        <div className="absolute top-16 left-1/2 w-2 h-2 bg-blue-400/50 rounded-full animate-ping" style={{animationDuration: '2s', animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-ping" style={{animationDuration: '2.5s', animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-12 w-1 h-1 bg-pink-400/50 rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/3 left-12 w-2.5 h-2.5 bg-emerald-400/50 rounded-full animate-ping" style={{animationDuration: '2.8s', animationDelay: '3.5s'}}></div>
        
        {/* Orbiting elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-80 h-80">
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400/40 rounded-full animate-spin" style={{animationDuration: '8s', transformOrigin: '0 160px'}}></div>
            <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse', transformOrigin: '0 120px'}}></div>
          </div>
        </div>
      </div>
      
      {/* Corner decorative elements */}
      <div className="absolute top-4 left-4 w-6 h-6 border border-blue-200/50 rounded-full animate-pulse"></div>
      <div className="absolute top-4 right-4 w-4 h-4 border border-purple-200/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-4 left-4 w-5 h-5 border border-pink-200/50 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-4 right-4 w-3 h-3 border border-emerald-200/50 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
    </div>
  );
}

export default MotivationalQuotes;