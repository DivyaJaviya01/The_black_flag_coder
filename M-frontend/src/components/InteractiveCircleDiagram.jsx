import React, { useState } from 'react';

const InteractiveCircleDiagram = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const centerPoint = {
    title: "Career Guidance & Counseling",
    description: "Comprehensive support for your career journey"
  };

  const outerPoints = [
    {
      id: 1,
      title: "Training",
      icon: "👨‍🏫",
      description: "Comprehensive skill development programs designed to enhance your professional capabilities and prepare you for industry demands.",
      details: ["Interactive workshops", "Hands-on learning", "Industry-relevant curriculum", "Expert trainers"],
      websiteFeatures: ["Online courses", "Video tutorials", "Progress tracking", "Certificate downloads"],
      position: { top: '20%', left: '50%' }, // 0° - Top
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: "Coaching",
      icon: "💪",
      description: "One-on-one personalized coaching sessions to unlock your potential and accelerate your career growth.",
      details: ["Personal development", "Goal setting", "Performance optimization", "Confidence building"],
      websiteFeatures: ["Video calls integration", "Schedule booking", "Chat support", "Session recordings"],
      position: { top: '29.3%', left: '70.7%' }, // 45° - Top Right
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: "Experience",
      icon: "⚡",
      description: "Real-world experience opportunities through internships, projects, and industry partnerships.",
      details: ["Internship placements", "Live projects", "Industry exposure", "Practical learning"],
      websiteFeatures: ["Project galleries", "Portfolio builder", "Company connections", "Experience tracker"],
      position: { top: '50%', left: '80%' }, // 90° - Right
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: "Direction",
      icon: "🧭",
      description: "Clear roadmaps and strategic guidance to help you navigate your career path effectively.",
      details: ["Career planning", "Strategic guidance", "Path optimization", "Future mapping"],
      websiteFeatures: ["Interactive roadmaps", "Goal setting tools", "Progress visualization", "Path recommendations"],
      position: { top: '70.7%', left: '70.7%' }, // 135° - Bottom Right
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: "Partnership",
      icon: "🤝",
      description: "Strong industry partnerships providing direct access to leading companies and opportunities.",
      details: ["Industry connections", "Job placements", "Networking events", "Employer partnerships"],
      websiteFeatures: ["Company profiles", "Job board", "Networking hub", "Partnership directory"],
      position: { top: '80%', left: '50%' }, // 180° - Bottom
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 6,
      title: "Mentorship",
      icon: "🎓",
      description: "Expert mentors from top companies providing guidance, support, and valuable industry insights.",
      details: ["Expert guidance", "Industry insights", "Personal support", "Career advice"],
      websiteFeatures: ["Mentor profiles", "Match algorithm", "Review system", "Mentor dashboard"],
      position: { top: '70.7%', left: '29.3%' }, // 225° - Bottom Left
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 7,
      title: "Support",
      icon: "💝",
      description: "Continuous support system ensuring you never feel alone in your career journey.",
      details: ["24/7 assistance", "Community support", "Resource access", "Ongoing guidance"],
      websiteFeatures: ["Help center", "Live chat", "Community forums", "FAQ section"],
      position: { top: '50%', left: '20%' }, // 270° - Left
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 8,
      title: "Results",
      icon: "📊",
      description: "Proven track record of successful career transformations and achievement of professional goals.",
      details: ["Success metrics", "Career advancement", "Goal achievement", "Proven outcomes"],
      websiteFeatures: ["Analytics dashboard", "Success stories", "Progress reports", "Achievement badges"],
      position: { top: '29.3%', left: '29.3%' }, // 315° - Top Left
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Why Choose 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Mentoria</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive approach to career development through our interactive guidance ecosystem
          </p>
        </div>

        {/* Interactive Diagram Container */}
        <div className="relative w-full max-w-4xl mx-auto aspect-square">
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
            {outerPoints.map((point) => (
              <line
                key={`line-${point.id}`}
                x1="50%"
                y1="50%"
                x2={point.position.left}
                y2={point.position.top}
                stroke="#6366F1"
                strokeWidth="3"
                strokeDasharray="10,6"
                className="opacity-60"
              />
            ))}
          </svg>

          {/* Central Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 20 }}>
            <div className="w-48 h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <div className="text-center text-white p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-lg font-bold leading-tight">{centerPoint.title}</h3>
                <p className="text-xs opacity-90 mt-1">{centerPoint.description}</p>
              </div>
            </div>
          </div>

          {/* Outer Points */}
          {outerPoints.map((point) => (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ 
                top: point.position.top, 
                left: point.position.left,
                zIndex: hoveredPoint === point.id ? 30 : 25
              }}
              onMouseEnter={() => setHoveredPoint(point.id)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Small Circle */}
              <div className={`w-28 h-28 bg-gradient-to-br ${point.color} rounded-full flex items-center justify-center shadow-lg border-3 border-white transition-all duration-300 ${hoveredPoint === point.id ? 'scale-110 shadow-xl' : 'hover:scale-105'}`}>
                <div className="text-center text-white">
                  <div className="text-2xl">{point.icon}</div>
                  <div className="text-xs font-semibold mt-1">{point.title}</div>
                </div>
              </div>

              {/* Popup on Hover */}
              {hoveredPoint === point.id && (
                <div className="absolute z-30 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 transform transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-2"
                     style={{
                       top: point.position.top === '20%' || point.position.top === '29.3%' ? '100%' : 
                            point.position.top === '70.7%' || point.position.top === '80%' ? '-400px' : '-200px',
                       left: point.position.left === '20%' || point.position.left === '29.3%' ? '0px' :
                            point.position.left === '70.7%' || point.position.left === '80%' ? '-280px' : '-140px'
                     }}>
                  
                  {/* Arrow pointer */}
                  <div className={`absolute w-3 h-3 bg-white border border-gray-200 transform rotate-45 ${
                    point.position.top === '20%' || point.position.top === '29.3%' ? '-top-1.5' : 
                    point.position.top === '70.7%' || point.position.top === '80%' ? '-bottom-1.5' : 'top-1/2 -translate-y-1/2'
                  } ${
                    point.position.left === '20%' || point.position.left === '29.3%' ? 'left-6' :
                    point.position.left === '70.7%' || point.position.left === '80%' ? 'right-6' : 'left-1/2 -translate-x-1/2'
                  }`}></div>

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${point.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                        {point.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{point.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">{point.description}</p>

                    {/* Details List */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Features:</h4>
                        {point.details.map((detail, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-2
                        ">Website Features:</h4>
                        {point.websiteFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/70 transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-3">
              🚀 Experience Our Comprehensive Approach
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCircleDiagram;