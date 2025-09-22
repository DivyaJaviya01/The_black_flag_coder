import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  LightBulbIcon, 
  ChartBarIcon, 
  XMarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon 
} from '@heroicons/react/24/outline';
import AuthModal from './AuthModal';
import Dashboard from '../views/Dashboard';

const CareerAssessment = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentClass: '',
    subjects: [],
    interests: [],
    skills: [],
    careerGoals: '',
    workStyle: '',
    learningStyle: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitForm = () => {
    console.log('Assessment Data:', formData);
    
    // Check if user is authenticated
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      // Show dashboard with assessment results
      setShowForm(false);
      setShowDashboard(true);
    } else {
      // Redirect to sign-in page
      navigate('/signin');
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
    // Show dashboard after successful authentication
    setShowDashboard(true);
  };

  const subjectOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Political Science',
    'Psychology', 'Sociology', 'Art', 'Music', 'Physical Education'
  ];

  const interestOptions = [
    'Technology & Programming', 'Medical & Healthcare', 'Business & Finance',
    'Arts & Design', 'Sports & Fitness', 'Teaching & Education',
    'Research & Development', 'Social Work', 'Engineering', 'Law & Justice',
    'Media & Communication', 'Environment & Nature'
  ];

  const skillOptions = [
    'Problem Solving', 'Leadership', 'Communication', 'Creativity',
    'Analytical Thinking', 'Teamwork', 'Time Management', 'Technical Skills',
    'Public Speaking', 'Writing', 'Mathematics', 'Research'
  ];

  if (showDashboard && user) {
    return <Dashboard user={user} assessmentData={formData} />;
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Enhanced premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_70%)] opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_70%)] opacity-60"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200 mb-6 drop-shadow-2xl">
            Career Assessment
          </h2>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Discover your perfect career path with our comprehensive assessment designed specifically 
            for 10th and 12th grade students. Get personalized recommendations for streams and degrees 
            based on your interests, skills, and aspirations.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center group hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <AcademicCapIcon className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">Personalized Analysis</h3>
            <p className="text-slate-200 drop-shadow-md">
              Get detailed insights into your strengths, interests, and potential career paths 
              tailored specifically to your grade level and academic goals.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center group hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <LightBulbIcon className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">Stream Guidance</h3>
            <p className="text-slate-200 drop-shadow-md">
              Receive expert recommendations on which academic stream (Science, Commerce, Arts) 
              aligns best with your interests and career aspirations.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center group hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <ChartBarIcon className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">Degree Recommendations</h3>
            <p className="text-slate-200 drop-shadow-md">
              Discover the most suitable degree programs and career paths based on your assessment 
              results and future market trends.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Assessment
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Career Assessment - Step {currentStep} of 4
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-white mb-4">Basic Information</h4>
                  
                  <div>
                    <label className="block text-slate-200 mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-200 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-200 mb-2 font-medium">Current Class</label>
                    <select
                      value={formData.currentClass}
                      onChange={(e) => handleInputChange('currentClass', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                    >
                      <option value="" className="bg-slate-800 text-white">Select your class</option>
                      <option value="10th" className="bg-slate-800 text-white">10th Grade</option>
                      <option value="12th" className="bg-slate-800 text-white">12th Grade</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Subjects & Interests */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-white mb-4">Subjects & Interests</h4>
                  
                  <div>
                    <label className="block text-slate-200 mb-3 font-medium">Favorite Subjects (Select multiple)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {subjectOptions.map((subject) => (
                        <label key={subject} className="flex items-center space-x-2 cursor-pointer bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-all">
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject)}
                            onChange={() => handleArrayChange('subjects', subject)}
                            className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400"
                          />
                          <span className="text-slate-200 text-sm">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-200 mb-3 font-medium">Career Interests (Select multiple)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {interestOptions.map((interest) => (
                        <label key={interest} className="flex items-center space-x-2 cursor-pointer bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-all">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleArrayChange('interests', interest)}
                            className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400"
                          />
                          <span className="text-slate-200 text-sm">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Skills & Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-white mb-4">Skills & Preferences</h4>
                  
                  <div>
                    <label className="block text-slate-200 mb-3 font-medium">Your Strengths (Select multiple)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {skillOptions.map((skill) => (
                        <label key={skill} className="flex items-center space-x-2 cursor-pointer bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-all">
                          <input
                            type="checkbox"
                            checked={formData.skills.includes(skill)}
                            onChange={() => handleArrayChange('skills', skill)}
                            className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400"
                          />
                          <span className="text-slate-200 text-sm">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-200 mb-2 font-medium">Preferred Work Style</label>
                    <select
                      value={formData.workStyle}
                      onChange={(e) => handleInputChange('workStyle', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                    >
                      <option value="" className="bg-slate-800 text-white">Select work style</option>
                      <option value="individual" className="bg-slate-800 text-white">Individual Work</option>
                      <option value="team" className="bg-slate-800 text-white">Team Collaboration</option>
                      <option value="leadership" className="bg-slate-800 text-white">Leadership Roles</option>
                      <option value="flexible" className="bg-slate-800 text-white">Flexible/Mixed</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Goals & Learning Style */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-white mb-4">Goals & Learning Style</h4>
                  
                  <div>
                    <label className="block text-slate-200 mb-2 font-medium">Career Goals</label>
                    <textarea
                      value={formData.careerGoals}
                      onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                      placeholder="Describe your career aspirations and what you want to achieve..."
                    />
                  </div>

                  <div>
                    <label className="block text-slate-200 mb-2 font-medium">Learning Style</label>
                    <select
                      value={formData.learningStyle}
                      onChange={(e) => handleInputChange('learningStyle', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                    >
                      <option value="" className="bg-slate-800 text-white">Select learning style</option>
                      <option value="visual" className="bg-slate-800 text-white">Visual Learning</option>
                      <option value="auditory" className="bg-slate-800 text-white">Auditory Learning</option>
                      <option value="kinesthetic" className="bg-slate-800 text-white">Hands-on Learning</option>
                      <option value="reading" className="bg-slate-800 text-white">Reading/Writing</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-white/20 bg-gradient-to-r from-slate-800/30 to-slate-900/30">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 text-slate-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Previous</span>
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  <span>Next</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={submitForm}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Complete Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={handleAuthSuccess} 
      />
    </div>
  );
};

export default CareerAssessment;