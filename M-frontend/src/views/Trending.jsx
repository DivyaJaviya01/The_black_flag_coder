import React from 'react';
import TrendingJobs from '../components/TrendingJobs';

const Trending = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Trending{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
              Career Opportunities
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore the most in-demand careers across all fields. Stay ahead of the curve with real-time insights 
            into emerging opportunities and growing industries.
          </p>
        </div>
      </div>

      {/* Trending Jobs Component */}
      <TrendingJobs />
    </div>
  );
};

export default Trending;