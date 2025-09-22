import React from 'react';
import {
  MapIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  UsersIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Personalized Roadmap",
      description: "Customized career paths tailored to your goals and aspirations for optimal success.",
      icon: MapIcon
    },
    {
      id: 2,
      title: "From A to Z Information",
      description: "Complete guidance from basics to advanced levels covering every aspect of your career journey.",
      icon: BookOpenIcon
    },
    {
      id: 3,
      title: "Practical Skill Development",
      description: "Hands-on training and skill-building for real-world applications and industry readiness.",
      icon: WrenchScrewdriverIcon
    },
    {
      id: 4,
      title: "Interactive Tools",
      description: "Engaging learning tools and interactive resources to enhance your educational experience.",
      icon: PuzzlePieceIcon
    },
    {
      id: 5,
      title: "Real-World Insights",
      description: "Industry insights and practical knowledge from experienced professionals and experts.",
      icon: GlobeAltIcon
    },
    {
      id: 6,
      title: "Updates of Scholarships and Courses",
      description: "Latest opportunities and educational programs to advance your career and academic goals.",
      icon: AcademicCapIcon
    },
    {
      id: 7,
      title: "Nearby Colleges",
      description: "Information about local educational institutions and their programs in your area.",
      icon: BuildingLibraryIcon
    },
    {
      id: 8,
      title: "Community Support",
      description: "Connect with peers and mentors in your field for networking and collaborative learning.",
      icon: UsersIcon
    },
    {
      id: 9,
      title: "Constant Updates",
      description: "Regular updates on industry trends, opportunities, and educational developments.",
      icon: ArrowPathIcon
    }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Mentoria</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive approach to career development through proven methodologies and expert guidance.
          </p>
        </div>

        {/* Features in 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group text-center hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Icon Circle */}
              <div className="relative mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-300">
                <feature.icon className="w-10 h-10 text-white" />
                {/* Floating Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed px-2">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover Line */}
              <div className="mt-4 mx-auto w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-16 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/70 transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              🚀 Start Your Journey Today
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;