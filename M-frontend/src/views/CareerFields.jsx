import React, { useState, useEffect } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const CareerFields = () => {
  // State for managing bookmarked fields
  const [bookmarkedFields, setBookmarkedFields] = useState([]);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('careerFieldBookmarks');
    if (savedBookmarks) {
      setBookmarkedFields(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('careerFieldBookmarks', JSON.stringify(bookmarkedFields));
  }, [bookmarkedFields]);

  // Function to toggle bookmark status for a field
  const toggleBookmark = (fieldName) => {
    setBookmarkedFields(prevBookmarks => {
      if (prevBookmarks.includes(fieldName)) {
        // Remove bookmark
        return prevBookmarks.filter(name => name !== fieldName);
      } else {
        // Add bookmark
        return [...prevBookmarks, fieldName];
      }
    });
  };

  // Function to get trend color based on trend value
  const getTrendColor = (trend) => {
    if (trend.includes('Up') || trend.includes('up') || trend.includes('+')) {
      return 'text-green-400';
    } else if (trend.includes('Down') || trend.includes('down') || trend.includes('-')) {
      return 'text-red-400';
    } else {
      return 'text-yellow-400';
    }
  };

  const CareerFieldCard = ({ field, streamColor }) => {
    const isBookmarked = bookmarkedFields.includes(field.name);
    
    return (
      <div className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
            {field.name}
          </h3>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(field.name);
            }}
            className="w-4 h-4 rounded-full flex items-center justify-center focus:outline-none"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${getTrendColor(field.trend)}`}>
            {field.trend}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-12 bg-slate-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full bg-gradient-to-r ${streamColor} transition-all duration-500`}
                style={{ width: `${field.popularity}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-400">{field.popularity}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-center mt-10">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Career Fields</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto mb-8">
                Explore various career paths available in the Science stream after 12th grade
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Separator Line */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mb-16"></div>
      </div>

      {/* Career Fields Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4">
              <AcademicCapIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-center text-white">Science Career Fields</h2>
          </div>
          <p className="text-slate-200 text-center mb-10 max-w-3xl mx-auto">Explore various career paths available in the Science stream after 12th grade</p>
          
          {/* PCM Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-slate-400/50">PCM (Physics, Chemistry, Mathematics)</h3>
            
            {/* Aerospace and Aeronautical Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Aerospace and Aeronautical Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Aerospace Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Aerodynamic Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Aerospace Project Manager', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Aircraft Maintenance Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Avionics Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Flight Test Manager', trend: 'Trending', popularity: 70 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Manufacturing Engineer', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Material and Process Manager', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Propulsion Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Satellite System Engineer', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Structural Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'System Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'UAV Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
              </div>
            </div>
            
            {/* Agriculture Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Agriculture Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Agribusiness Consultant', trend: 'Trending', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Agricultural Economist', trend: 'Stable', popularity: 65 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Agricultural Extension Officer', trend: 'Stable', popularity: 60 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Agricultural Officer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Agricultural Salesperson', trend: 'Stable', popularity: 65 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Agricultural Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Agronomist', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Farm Manager', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Food Inspector', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Food Scientist', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Indian Forest Service', trend: 'Stable', popularity: 65 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Plant Breeder', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Rural Development Officer', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Soil Scientist', trend: 'Stable', popularity: 65 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Supply Chain Manager', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
              </div>
            </div>
            
            {/* Biomedical Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Biomedical Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Biomedical Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Clinical Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biomedical Equipment Technician (BMET)', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Rehabilitation Engineer', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biomaterials Scientist', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biomedical Scientist', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biotechnologist', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Clinical Research Associate', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Toxicologist', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Research Scientist', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Medical Science Liaison (MSL)', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Regulatory Affairs Specialist', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Health Informatics Specialist', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Medical Writer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Medical Sales Representative', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-pink-500 to-rose-500" 
                />
              </div>
            </div>
            
            {/* Biotechnology Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Biotechnology Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Research Scientist', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biochemist', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Microbiologist', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Bioinformatic Analyst', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Clinical Research Associate', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biomedical Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Quality Control Analyst', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Regulatory Affairs Specialist', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Bioprocess Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Production Manager', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Food Scientist', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biotechnologist', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Biotechnologist', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Medical Science Liaison', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biotech Analyst', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
              </div>
            </div>
            
            {/* Blockchain Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Blockchain</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Blockchain Developer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Smart Contract Developer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blockchain Architect', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Decentralized Application (dApp) Developer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blockchain DevOps Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blockchain Project Manager', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blockchain Consultant', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blockchain Analyst', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blockchain Legal Advisor/Specialist', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blockchain Security Specialist/Auditor', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Web 3/Blockchain UX Designer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Cryptocurrency Trader/Analyst', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-cyan-500 to-blue-500" 
                />
              </div>
            </div>
            
            {/* Chemical Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Chemical Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Process Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Chemical Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Production Manager', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Quality Control Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Petroleum Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biotechnologist', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Materials Scientist/Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Food Scientist/Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Pharmaceutical Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Research Scientist', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Energy Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
              </div>
            </div>
            
            {/* Civil Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Civil Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Structural Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Construction Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Geotechnical Engineer', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Transportation Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Water Resources Engineer', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Urban Planner', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Site Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Surveyor', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Project Manager', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Quantity Surveyor', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Coastal Engineer', trend: 'Stable', popularity: 65 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Materials Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
              </div>
            </div>
            
            {/* Computer Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Computer Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'AI Engineer', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Big Data Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blockchain Developer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Cloud Engineer', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Computer Analyst', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Computer Hardware Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Cybersecurity Analyst', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Data Scientist', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'DevOps Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Embedded Systems Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Full Stack Engineer', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Game Developer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Machine Learning Engineer', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Network Architect', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Network Engineer', trend: 'Stable', popularity: 90 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Robotics Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Software Engineer', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'System Engineer', trend: 'Stable', popularity: 90 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
              </div>
            </div>
            
            {/* Electrical & Electronics Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Electrical & Electronics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Electrical Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Electronics Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Control Systems Engineer', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Power Systems Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Telecommunications Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Instrumentation Engineer', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Renewable Energy Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Biomedical Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-blue-500 to-cyan-500" 
                />
              </div>
            </div>
            
            {/* Electronic & Communication Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Electronic & Communication</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Electronic Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Telecommunications Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'VLSI Design Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'RF (Radio Frequency) Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Signal Processing Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Software Developer/Analyst', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'IoT (Internet of Things) Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Control Systems Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Power Electronics Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Network Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-purple-500 to-indigo-500" 
                />
              </div>
            </div>
            
            {/* Environmental Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Environmental Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Atmospheric Scientist/Climatologist', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Climate Change Analyst', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Ecologist', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Consultant', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Crime Officer', trend: 'Stable', popularity: 65 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Health and Safety Specialist', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Lawyer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Policy Analyst', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Restoration Planner', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Scientist', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Technician', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Geoscientist', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'GIS Specialist', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Hydrologist', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Marine Biologist', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Renewable Energy Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Sustainability Manager', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Urban/Environmental Planner', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Wildlife Biologist', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-green-500 to-emerald-500" 
                />
              </div>
            </div>
            
            {/* Mechanical Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Mechanical Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Acoustic Consultant and Audio Engineer', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Automotive Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Construction and Instrumental Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Control and Instrumental Engineer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Design Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Maintenance Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Powertrain Engineer or Vehicle Dynamic Specialist Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Process Design Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Project Manager', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Research and Development Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Technical Sales Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-amber-500 to-orange-500" 
                />
              </div>
            </div>
            
            {/* Mining Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Mining Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Accountant', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Blasting Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Driller', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Electrician', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Environmental Scientist', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Fitter/Technician', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Geologist', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Geophysicist', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Geotechnical Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Health and Safety Officer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Heavy Equipment Operator', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Maintenance Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Metallurgical Engineer', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Mine Manager', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Mine Surveyor', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Miner/Mine Worker', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Project Manager', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Reclamationist', trend: 'Stable', popularity: 65 }} 
                  streamColor="from-gray-500 to-slate-500" 
                />
              </div>
            </div>
            
            {/* Petroleum Engineering Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Petroleum Engineering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Chemical Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Completion Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Data Scientist/IT Specialist', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Derrickhand', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Driller', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Drilling Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Equipment Operator', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Field Service Technician', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Finance and Accounting', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Health, Safety and Environment Specialist', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Human Resources (HR)', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Logistics Coordinator', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Maintenance Technician', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Offshore Mechanic', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Petrophysicist', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Petroleum Engineer', trend: 'Stable', popularity: 90 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Petroleum Geologist', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Pipeline Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Production Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Project Manager', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Refinery/Plant Operator', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Reservoir Engineer', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Rig Manager', trend: 'Stable', popularity: 85 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Roustabout', trend: 'Stable', popularity: 70 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Supply Chain Manager', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-yellow-500 to-amber-500" 
                />
              </div>
            </div>
            
            {/* Robotics & Automation Subfield */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Robotics & Automation</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CareerFieldCard 
                  field={{ name: 'Robotics Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Automation Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Machine Learning Specialist', trend: 'Trending', popularity: 95 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Controls Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Mechatronics Engineer', trend: 'Trending', popularity: 85 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Robotics Technician', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Robotics Process Automation Engineer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Systems Integrator', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Embedded Systems Developer', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Research Scientist', trend: 'Trending', popularity: 90 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Robotics Operator', trend: 'Stable', popularity: 75 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Robotics UI/UX Designer', trend: 'Trending', popularity: 80 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Sales Engineer', trend: 'Stable', popularity: 80 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Robotics Entrepreneur/Startup Founder', trend: 'Trending', popularity: 75 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
                <CareerFieldCard 
                  field={{ name: 'Ethical Robotics Consultant', trend: 'Trending', popularity: 70 }} 
                  streamColor="from-indigo-500 to-purple-500" 
                />
              </div>
            </div>
          </div>
          
          {/* PCB Section */}
          <div className="mb-10 mt-24">
            <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-slate-400/50">PCB (Physics, Chemistry, Biology)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <CareerFieldCard 
                field={{ name: 'MBBS (MEDICINE)', trend: 'Trending', popularity: 95 }} 
                streamColor="from-green-500 to-emerald-600" 
              />
              <CareerFieldCard 
                field={{ name: 'BDS (DENTAL)', trend: 'Trending', popularity: 85 }} 
                streamColor="from-green-500 to-emerald-600" 
              />
              <CareerFieldCard 
                field={{ name: 'BAMS (AYURVEDA)', trend: 'Trending', popularity: 70 }} 
                streamColor="from-green-500 to-emerald-600" 
              />
              <CareerFieldCard 
                field={{ name: 'BHMS (HOMEOPATHY)', trend: 'Stable', popularity: 65 }} 
                streamColor="from-green-500 to-emerald-600" 
              />
              <CareerFieldCard 
                field={{ name: 'BUMS (UNANI)', trend: 'Stable', popularity: 60 }} 
                streamColor="from-green-500 to-emerald-600" 
              />
              <CareerFieldCard 
                field={{ name: 'B.V.Sc (VETERINARY)', trend: 'Trending', popularity: 75 }} 
                streamColor="from-green-500 to-emerald-600" 
              />
              <CareerFieldCard 
                field={{ name: 'B.Pharm (PHARMACY)', trend: 'Stable', popularity: 80 }} 
                streamColor="from-green-500 to-emerald-600" 
              />
              <CareerFieldCard 
                field={{ name: 'B.Sc NURSING', trend: 'Trending', popularity: 90 }} 
                streamColor="from-green-500 to-emerald-600" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerFields;