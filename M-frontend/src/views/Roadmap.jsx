import React, { useState } from 'react';
import { 
  BeakerIcon,
  CurrencyDollarIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

const Roadmap = () => {
  const [expandedStreams, setExpandedStreams] = useState({
    science: false,
    commerce: false,
    arts: false,
    vocational: false
  });

  // Define all fields for each stream
  const streamData = {
    science: {
      title: "Science Stream",
      icon: BeakerIcon,
      color: "from-blue-500 to-cyan-500",
      trending: [
        { name: "Data Science", trend: "🔥 Hot", popularity: 95 },
        { name: "AI/ML Engineering", trend: "🚀 Rising", popularity: 92 },
        { name: "Cybersecurity", trend: "🔥 Hot", popularity: 88 },
        { name: "Biotechnology", trend: "📈 Growing", popularity: 85 },
        { name: "Software Development", trend: "🔥 Hot", popularity: 90 },
        { name: "Robotics Engineering", trend: "🚀 Rising", popularity: 83 },
        { name: "Environmental Science", trend: "📈 Growing", popularity: 78 },
        { name: "Blockchain Development", trend: "🚀 Rising", popularity: 82 },
        { name: "Quantum Computing", trend: "🚀 Rising", popularity: 75 }
      ],
      additional: [
        { name: "Aerospace Engineering", trend: "📈 Growing", popularity: 80 },
        { name: "Biomedical Engineering", trend: "📈 Growing", popularity: 77 },
        { name: "Chemical Engineering", trend: "📊 Stable", popularity: 74 },
        { name: "Nuclear Physics", trend: "📊 Stable", popularity: 72 },
        { name: "Marine Biology", trend: "📈 Growing", popularity: 70 },
        { name: "Meteorology", trend: "📊 Stable", popularity: 68 }
      ]
    },
    commerce: {
      title: "Commerce Stream",
      icon: CurrencyDollarIcon,
      color: "from-green-500 to-emerald-500",
      trending: [
        { name: "Digital Marketing", trend: "🔥 Hot", popularity: 94 },
        { name: "Financial Analysis", trend: "🔥 Hot", popularity: 89 },
        { name: "E-commerce Management", trend: "🚀 Rising", popularity: 87 },
        { name: "Investment Banking", trend: "📈 Growing", popularity: 86 },
        { name: "Business Analytics", trend: "🔥 Hot", popularity: 91 },
        { name: "Cryptocurrency Trading", trend: "🚀 Rising", popularity: 84 },
        { name: "Supply Chain Management", trend: "📈 Growing", popularity: 81 },
        { name: "Project Management", trend: "🔥 Hot", popularity: 88 },
        { name: "Corporate Strategy", trend: "📈 Growing", popularity: 83 }
      ],
      additional: [
        { name: "Accounting", trend: "📊 Stable", popularity: 79 },
        { name: "Human Resources", trend: "📈 Growing", popularity: 76 },
        { name: "International Trade", trend: "📈 Growing", popularity: 75 },
        { name: "Insurance", trend: "📊 Stable", popularity: 73 },
        { name: "Real Estate", trend: "📈 Growing", popularity: 78 },
        { name: "Banking Operations", trend: "📊 Stable", popularity: 71 }
      ]
    },
    arts: {
      title: "Arts Stream",
      icon: PaintBrushIcon,
      color: "from-purple-500 to-pink-500",
      trending: [
        { name: "UX/UI Design", trend: "🔥 Hot", popularity: 93 },
        { name: "Content Creation", trend: "🚀 Rising", popularity: 90 },
        { name: "Social Media Management", trend: "🔥 Hot", popularity: 89 },
        { name: "Graphic Design", trend: "📈 Growing", popularity: 85 },
        { name: "Video Production", trend: "🚀 Rising", popularity: 87 },
        { name: "Creative Writing", trend: "📈 Growing", popularity: 82 },
        { name: "Photography", trend: "📈 Growing", popularity: 84 },
        { name: "Animation", trend: "🚀 Rising", popularity: 86 },
        { name: "Game Design", trend: "🚀 Rising", popularity: 88 }
      ],
      additional: [
        { name: "Interior Design", trend: "📈 Growing", popularity: 80 },
        { name: "Fashion Design", trend: "📈 Growing", popularity: 77 },
        { name: "Journalism", trend: "📊 Stable", popularity: 74 },
        { name: "Literature", trend: "📊 Stable", popularity: 72 },
        { name: "History Research", trend: "📊 Stable", popularity: 69 },
        { name: "Psychology", trend: "📈 Growing", popularity: 81 }
      ]
    },
    vocational: {
      title: "Vocational Skills",
      icon: WrenchScrewdriverIcon,
      color: "from-orange-500 to-red-500",
      trending: [
        { name: "Cloud Computing", trend: "🔥 Hot", popularity: 96 },
        { name: "DevOps Engineering", trend: "🔥 Hot", popularity: 93 },
        { name: "Mobile App Development", trend: "🔥 Hot", popularity: 91 },
        { name: "Digital Forensics", trend: "🚀 Rising", popularity: 87 },
        { name: "Network Administration", trend: "📈 Growing", popularity: 84 },
        { name: "Database Management", trend: "📈 Growing", popularity: 85 },
        { name: "Ethical Hacking", trend: "🚀 Rising", popularity: 89 },
        { name: "Technical Writing", trend: "📈 Growing", popularity: 82 },
        { name: "Quality Assurance", trend: "📈 Growing", popularity: 80 }
      ],
      additional: [
        { name: "System Administration", trend: "📊 Stable", popularity: 78 },
        { name: "Hardware Repair", trend: "📊 Stable", popularity: 75 },
        { name: "Automotive Technology", trend: "📈 Growing", popularity: 77 },
        { name: "Electrical Work", trend: "📊 Stable", popularity: 74 },
        { name: "Plumbing", trend: "📊 Stable", popularity: 72 },
        { name: "Carpentry", trend: "📊 Stable", popularity: 70 }
      ]
    }
  };

  const toggleExpanded = (stream) => {
    setExpandedStreams(prev => ({
      ...prev,
      [stream]: !prev[stream]
    }));
  };

  const getTrendColor = (trend) => {
    if (trend.includes('Hot')) return 'text-red-400';
    if (trend.includes('Rising')) return 'text-yellow-400';
    if (trend.includes('Growing')) return 'text-green-400';
    return 'text-blue-400';
  };

  const FieldCard = ({ field, streamColor }) => (
    <div className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
          {field.name}
        </h3>
        <BookmarkIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Centered Text Content */}
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Career{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                  Roadmap
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto mb-8">
                Explore trending career fields across all streams. Discover the most in-demand skills 
                and opportunities in Science, Commerce, Arts, and Vocational sectors.
              </p>
              <div className="text-lg text-slate-400 font-medium">
                Find the right path for your future 🎯
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streams Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {Object.entries(streamData).map(([streamKey, stream]) => {
          const IconComponent = stream.icon;
          const fieldsToShow = expandedStreams[streamKey] 
            ? [...stream.trending, ...stream.additional] 
            : stream.trending;

          return (
            <div key={streamKey} className="mb-16">
              {/* Stream Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stream.color} flex items-center justify-center shadow-lg`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{stream.title}</h2>
                  <p className="text-slate-400">
                    {expandedStreams[streamKey] 
                      ? `${stream.trending.length + stream.additional.length} total fields` 
                      : `${stream.trending.length} trending fields`
                    }
                  </p>
                </div>
              </div>

              {/* Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {fieldsToShow.map((field, index) => (
                  <FieldCard 
                    key={index} 
                    field={field} 
                    streamColor={stream.color}
                  />
                ))}
              </div>

              {/* See More Button */}
              <div className="text-center">
                <button
                  onClick={() => toggleExpanded(streamKey)}
                  className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${stream.color} hover:shadow-lg hover:shadow-blue-500/25 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105`}
                >
                  <span>
                    {expandedStreams[streamKey] ? 'Show Less' : 'See More Fields'}
                  </span>
                  <ChevronRightIcon 
                    className={`h-4 w-4 transition-transform duration-300 ${
                      expandedStreams[streamKey] ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;