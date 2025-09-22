import React from 'react';

const TrendingJobs = () => {
  const jobCategories = [
    // Science Jobs
    {
      id: 1,
      category: "Science",
      title: "Data Scientist",
      description: "Analyze complex data to extract meaningful insights for business decisions",
      salary: "₹15-25 LPA",
      demand: "High",
      skills: ["Python", "Machine Learning", "Statistics"],
      color: "from-blue-500 to-cyan-500",
      icon: "🔬"
    },
    {
      id: 2,
      category: "Science",
      title: "AI/ML Engineer",
      description: "Develop artificial intelligence and machine learning models",
      salary: "₹20-35 LPA",
      demand: "Very High",
      skills: ["TensorFlow", "Python", "Deep Learning"],
      color: "from-purple-500 to-indigo-500",
      icon: "🤖"
    },
    {
      id: 3,
      category: "Science",
      title: "Biotechnology Researcher",
      description: "Research and develop biological products and processes",
      salary: "₹8-15 LPA",
      demand: "Medium",
      skills: ["Biology", "Research", "Lab Techniques"],
      color: "from-green-500 to-emerald-500",
      icon: "🧬"
    },
    {
      id: 4,
      category: "Science",
      title: "Environmental Engineer",
      description: "Design solutions for environmental problems",
      salary: "₹6-12 LPA",
      demand: "Medium",
      skills: ["Environmental Science", "Engineering", "Sustainability"],
      color: "from-teal-500 to-green-500",
      icon: "🌱"
    },
    {
      id: 5,
      category: "Science",
      title: "Cybersecurity Analyst",
      description: "Protect organizations from cyber threats and attacks",
      salary: "₹10-20 LPA",
      demand: "High",
      skills: ["Security", "Networking", "Ethical Hacking"],
      color: "from-red-500 to-orange-500",
      icon: "🛡️"
    },
    
    // Commerce Jobs
    {
      id: 6,
      category: "Commerce",
      title: "Financial Analyst",
      description: "Analyze financial data to guide business investment decisions",
      salary: "₹8-18 LPA",
      demand: "High",
      skills: ["Excel", "Financial Modeling", "Analytics"],
      color: "from-amber-500 to-yellow-500",
      icon: "📊"
    },
    {
      id: 7,
      category: "Commerce",
      title: "Digital Marketing Manager",
      description: "Plan and execute digital marketing campaigns",
      salary: "₹6-15 LPA",
      demand: "Very High",
      skills: ["SEO", "Social Media", "Analytics"],
      color: "from-pink-500 to-rose-500",
      icon: "📱"
    },
    {
      id: 8,
      category: "Commerce",
      title: "Business Analyst",
      description: "Bridge the gap between business needs and technology solutions",
      salary: "₹7-16 LPA",
      demand: "High",
      skills: ["Analysis", "Communication", "Project Management"],
      color: "from-indigo-500 to-blue-500",
      icon: "💼"
    },
    {
      id: 9,
      category: "Commerce",
      title: "Investment Banking",
      description: "Provide financial services to corporations and governments",
      salary: "₹15-40 LPA",
      demand: "Medium",
      skills: ["Finance", "Valuation", "Deal Making"],
      color: "from-slate-600 to-gray-600",
      icon: "🏦"
    },
    {
      id: 10,
      category: "Commerce",
      title: "E-commerce Manager",
      description: "Manage online sales platforms and digital commerce strategies",
      salary: "₹8-20 LPA",
      demand: "High",
      skills: ["E-commerce", "Analytics", "Marketing"],
      color: "from-orange-500 to-red-500",
      icon: "🛒"
    },

    // Arts Jobs
    {
      id: 11,
      category: "Arts",
      title: "UX/UI Designer",
      description: "Design user-friendly interfaces for digital products",
      salary: "₹8-20 LPA",
      demand: "Very High",
      skills: ["Design", "Prototyping", "User Research"],
      color: "from-violet-500 to-purple-500",
      icon: "🎨"
    },
    {
      id: 12,
      category: "Arts",
      title: "Content Creator",
      description: "Create engaging content for various digital platforms",
      salary: "₹5-15 LPA",
      demand: "High",
      skills: ["Writing", "Video Editing", "Social Media"],
      color: "from-cyan-500 to-blue-500",
      icon: "📝"
    },
    {
      id: 13,
      category: "Arts",
      title: "Game Designer",
      description: "Design and develop engaging video game experiences",
      salary: "₹6-18 LPA",
      demand: "Medium",
      skills: ["Game Design", "Programming", "Creativity"],
      color: "from-emerald-500 to-teal-500",
      icon: "🎮"
    },
    {
      id: 14,
      category: "Arts",
      title: "Motion Graphics Artist",
      description: "Create animated graphics for films, TV, and digital media",
      salary: "₹4-12 LPA",
      demand: "Medium",
      skills: ["After Effects", "Animation", "Design"],
      color: "from-pink-500 to-purple-500",
      icon: "🎬"
    },
    {
      id: 15,
      category: "Arts",
      title: "Social Media Manager",
      description: "Manage brand presence across social media platforms",
      salary: "₹4-10 LPA",
      demand: "High",
      skills: ["Social Media", "Content Strategy", "Analytics"],
      color: "from-blue-500 to-indigo-500",
      icon: "📲"
    },

    // Vocational Jobs
    {
      id: 16,
      category: "Vocational",
      title: "Cloud DevOps Engineer",
      description: "Manage cloud infrastructure and deployment pipelines",
      salary: "₹12-25 LPA",
      demand: "Very High",
      skills: ["AWS", "Docker", "Kubernetes"],
      color: "from-gray-500 to-slate-500",
      icon: "☁️"
    },
    {
      id: 17,
      category: "Vocational",
      title: "Mobile App Developer",
      description: "Develop applications for mobile platforms",
      salary: "₹8-20 LPA",
      demand: "High",
      skills: ["React Native", "Flutter", "iOS/Android"],
      color: "from-teal-500 to-cyan-500",
      icon: "📱"
    },
    {
      id: 18,
      category: "Vocational",
      title: "Digital Marketer",
      description: "Execute digital marketing strategies and campaigns",
      salary: "₹4-12 LPA",
      demand: "Very High",
      skills: ["SEO", "PPC", "Content Marketing"],
      color: "from-orange-500 to-amber-500",
      icon: "🎯"
    },
    {
      id: 19,
      category: "Vocational",
      title: "Blockchain Developer",
      description: "Build decentralized applications and smart contracts",
      salary: "₹15-30 LPA",
      demand: "Medium",
      skills: ["Solidity", "Web3", "Cryptocurrency"],
      color: "from-yellow-500 to-orange-500",
      icon: "⛓️"
    },
    {
      id: 20,
      category: "Vocational",
      title: "Network Administrator",
      description: "Maintain and configure computer networks",
      salary: "₹6-15 LPA",
      demand: "Medium",
      skills: ["Networking", "Security", "System Admin"],
      color: "from-indigo-500 to-purple-500",
      icon: "🌐"
    }
  ];

  return (
    <section className="relative py-20 bg-gray-50">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      
      {/* Subtle accent elements */}
      <div className="pointer-events-none absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Trending 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"> Career Opportunities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the most in-demand careers across Science, Commerce, Arts, and Vocational fields
          </p>
        </div>

        {/* Moving Cards Container */}
        <div className="relative cards-container py-4">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling container with proper masking */}
          <div className="flex gap-6 animate-scroll will-change-transform px-4">
            {/* First set of cards */}
            {jobCategories.map((job) => (
              <div
                key={job.id}
                className="flex-shrink-0 w-80 group cursor-pointer p-2"
              >
                <div className="relative bg-white rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_2px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.15),0_8px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 p-6 h-full flex flex-col border-t-4" style={{borderTopColor: `transparent`}}>
                  {/* Gradient top border overlay */}
                  <div className={`absolute -top-1 left-3 right-3 h-1 bg-gradient-to-r ${job.color} rounded-t-3xl`}></div>
                  
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  
                  {/* Content */}
                  <div className="relative flex flex-col h-full">
                    
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2),0_4px_8px_-4px_rgba(0,0,0,0.1)]`}>
                          <span className="text-lg">{job.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{job.title}</h3>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{job.category}</p>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                        job.demand === 'Very High' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                        job.demand === 'High' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {job.demand}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                      {job.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Salary Range</p>
                        <p className="text-sm font-bold text-gray-800">{job.salary}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Growth</p>
                        <p className="text-sm font-bold text-emerald-600">+15%</p>
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-6 flex-grow">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg font-semibold border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button className={`w-full bg-gradient-to-r ${job.color} hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.2),0_4px_12px_-4px_rgba(0,0,0,0.1)] text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 group/btn shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)]`}>
                        <span className="flex items-center justify-center space-x-2">
                          <span>View Position</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {jobCategories.map((job) => (
              <div
                key={`duplicate-${job.id}`}
                className="flex-shrink-0 w-80 group cursor-pointer p-2"
              >
                <div className="relative bg-white rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_2px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.15),0_8px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 p-6 h-full flex flex-col border-t-4" style={{borderTopColor: `transparent`}}>
                  {/* Gradient top border overlay */}
                  <div className={`absolute -top-1 left-3 right-3 h-1 bg-gradient-to-r ${job.color} rounded-t-3xl`}></div>
                  
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  
                  {/* Content */}
                  <div className="relative flex flex-col h-full">
                    
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2),0_4px_8px_-4px_rgba(0,0,0,0.1)]`}>
                          <span className="text-lg">{job.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{job.title}</h3>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{job.category}</p>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                        job.demand === 'Very High' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                        job.demand === 'High' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {job.demand}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                      {job.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Salary Range</p>
                        <p className="text-sm font-bold text-gray-800">{job.salary}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Growth</p>
                        <p className="text-sm font-bold text-emerald-600">+15%</p>
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-6 flex-grow">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg font-semibold border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button className={`w-full bg-gradient-to-r ${job.color} hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.2),0_4px_12px_-4px_rgba(0,0,0,0.1)] text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 group/btn shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)]`}>
                        <span className="flex items-center justify-center space-x-2">
                          <span>View Position</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-4">
              🔍 Explore All Career Paths
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * 20 - 120px));
          }
        }
        
        .animate-scroll {
          animation: scroll 120s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Hide overflow cards properly - only for cards container */
        .cards-container {
          overflow: hidden;
          mask: linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%);
          -webkit-mask: linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%);
        }
      `}</style>
    </section>
  );
};

export default TrendingJobs;