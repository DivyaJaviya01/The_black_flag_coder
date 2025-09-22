import React from 'react';
import { 
  BuildingLibraryIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';
import CareerPathDiagram from '../components/CareerPathDiagram';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import TrendingJobs from '../components/TrendingJobs';
import CareerAssessment from '../components/CareerAssessment';
import MotivationalQuotes from '../components/MotivationalQuotes';
import HeroImage from '../assets/Hero-section.jpg'; // Import the local image

function Home() {
  return (
    <>
      <div className="overflow-hidden">
        {/* Shared premium background for hero and stats sections */}
        <div className="relative min-h-screen overflow-hidden">
          {/* Enhanced gradient background with mesh pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_70%)] opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_70%)] opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_70%)] opacity-70" />
          
          {/* Animated gradient orbs */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/20 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/15 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          <div className="pointer-events-none absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-400/10 blur-3xl animate-pulse" style={{animationDelay: '4s'}} />

          {/* Floating geometric elements */}
          <div className="pointer-events-none absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}} />
          <div className="pointer-events-none absolute top-40 left-20 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full animate-bounce opacity-40" style={{animationDelay: '3s'}} />
          <div className="pointer-events-none absolute bottom-40 left-40 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full animate-bounce opacity-50" style={{animationDelay: '5s'}} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
              
              {/* Left: Enhanced Copy Section */}
              <div className="lg:w-1/2 lg:pr-16 text-center lg:text-left">
                {/* Premium badge */}
                <div className="inline-flex items-center mb-8">
                  <span className="relative inline-flex items-center text-sm font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl"></span>
                    <span className="relative px-6 py-2 bg-white/9 backdrop-blur-xl border border-white/20 rounded-full text-white">
                      ✨ AI-Powered Career Guidance ✨
                    </span>
                  </span>
                </div>
                
                {/* Main headline with gradient text */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-8">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200 drop-shadow-2xl">
                    Your Future
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mt-2">
                    Starts Here
                  </span>
                </h1>
                
                {/* Subtitle with better typography */}
                <p className="text-xl md:text-2xl text-slate-300/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 font-light">
                  Transform your career aspirations into reality with our 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 font-semibold"> AI-driven guidance platform.</span>
                </p>

                {/* Enhanced CTA buttons */}
                <div className="flex flex-row gap-6 justify-center lg:justify-start mb-12">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/70 transform hover:scale-105 transition-all duration-300 overflow-hidden whitespace-nowrap">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-3">
                      🚀 Start Your Journey
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  
                  <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 whitespace-nowrap">
                    <span className="flex items-center gap-3">
                      💬 Join Community
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Enhanced stats with animations */}
                <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                  <div className="text-center lg:text-left group cursor-pointer">
                    <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 group-hover:scale-110 transition-transform">
                      25K+
                    </div>
                    <div className="text-sm text-slate-400 font-medium">Success Stories</div>
                  </div>
                  <div className="text-center lg:text-left group cursor-pointer">
                    <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 group-hover:scale-110 transition-transform">
                      4.9★
                    </div>
                    <div className="text-sm text-slate-400 font-medium">User Rating</div>
                  </div>
                  <div className="text-center lg:text-left group cursor-pointer">
                    <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 group-hover:scale-110 transition-transform">
                      99%
                    </div>
                    <div className="text-sm text-slate-400 font-medium">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Right: Career Counselling Illustration */}
              <div className="lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center">
                <div class="w-full h-96 flex items-center justify-center">
                  {/* Image container with transparent background */}
                  <div class="relative p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <img 
                      src={HeroImage} 
                      alt="Career guidance illustration showing a businessman standing at road direction signs, making a decision for career path"
                      class="max-w-full max-h-full object-contain pointer-events-none select-none rounded-lg"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    
                    {/* Bold multi-color gradient sphere at top left */}
                    <div class="absolute -top-6 -left-6 w-24 h-24 rounded-full z-20">
                      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 blur-lg"></div>
                      <div class="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-700 animate-pulse"></div>
                      <div class="absolute inset-2 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
                    </div>
                    
                    {/* 3D Decorative star at bottom right */}
                    <div class="absolute bottom-2 right-4 z-20 transform -rotate-6">
                      <svg class="w-10 h-10 text-yellow-300 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20" style={{filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'}}>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Stats Section continues with same background seamlessly */}
          <div className="py-8 max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4"> 
              {/* Government Colleges */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 group cursor-pointer hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full text-white flex items-center justify-center shadow-xl bg-gradient-to-br from-blue-600 to-indigo-600 group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                  <BuildingLibraryIcon className="h-5 w-5 drop-shadow-lg" />
                </div>
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-lg">500+</div>
                  <div className="text-xs text-white font-medium drop-shadow-md">Government Colleges</div>
                </div>
              </div>
              
              {/* Scholarship Programs */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 group cursor-pointer hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full text-white flex items-center justify-center shadow-xl bg-gradient-to-br from-emerald-600 to-teal-600 group-hover:shadow-emerald-500/50 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                  <AcademicCapIcon className="h-5 w-5 drop-shadow-lg" />
                </div>
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-lg">50+</div>
                  <div className="text-xs text-white font-medium drop-shadow-md">Scholarship Programs</div>
                </div>
              </div>
              
              {/* Career Paths */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 group cursor-pointer hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full text-white flex items-center justify-center shadow-xl bg-gradient-to-br from-violet-600 to-purple-600 group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                  <BriefcaseIcon className="h-5 w-5 drop-shadow-lg" />
                </div>
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-lg">100+</div>
                  <div className="text-xs text-white font-medium drop-shadow-md">Career Paths</div>
                </div>
              </div>
              
              {/* Languages Supported */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 group cursor-pointer hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full text-white flex items-center justify-center shadow-xl bg-gradient-to-br from-amber-600 to-orange-600 group-hover:shadow-orange-500/50 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                  <GlobeAltIcon className="h-5 w-5 drop-shadow-lg" />
                </div>
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-lg">10+</div>
                  <div className="text-xs text-white font-medium drop-shadow-md">Languages Supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* FAQ Section with hero background */}
      <FAQ />

      {/* Trending Jobs Section */}
      <div id="trending-section">
        <TrendingJobs />
      </div>

      {/* Career Assessment Section */}
      <div id="assessment-section">
        <CareerAssessment />
      </div>

      {/* White Background Section */}
      <div className="bg-white py-20">
        {/* Motivational Quotes Rotator */}
        <MotivationalQuotes />
      </div>

    </>
  );
}

export default Home;