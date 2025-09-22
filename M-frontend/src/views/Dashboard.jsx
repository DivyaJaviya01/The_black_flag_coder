import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import { 
  ChartBarIcon, 
  AcademicCapIcon,
  LightBulbIcon,
  TrophyIcon,
  UserCircleIcon,
  ArrowRightIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatbotRef = useRef(null);
  const [user, setUser] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  
  // Check for hash fragment and scroll to chatbot section
  useEffect(() => {
    if (location.hash === '#chatbot' && chatbotRef.current) {
      chatbotRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // Check if user is authenticated
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/signin');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Get or create default assessment data
    const savedAssessment = localStorage.getItem('assessmentData');
    if (savedAssessment) {
      setAssessmentData(JSON.parse(savedAssessment));
    } else {
      // Default assessment data for demonstration
      const defaultAssessment = {
        currentClass: '12th Grade',
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'],
        interests: ['Technology & Programming', 'Problem Solving', 'Innovation', 'Science & Research', 'Digital Design'],
        skills: ['Analytical Thinking', 'Programming', 'Problem Solving', 'Communication', 'Creativity']
      };
      setAssessmentData(defaultAssessment);
      localStorage.setItem('assessmentData', JSON.stringify(defaultAssessment));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    navigate('/signin');
  };

  if (!user || !assessmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  // Generate recommendations based on assessment data
  const generateRecommendations = () => {
    const { subjects, interests, skills, currentClass } = assessmentData;
    
    let recommendedStreams = [];
    let recommendedDegrees = [];

    // Simple logic for stream recommendations
    if (subjects.includes('Mathematics') && subjects.includes('Physics')) {
      recommendedStreams.push({ name: 'Science (PCM)', match: '95%', description: 'Perfect for Engineering and Technology careers' });
    }
    if (subjects.includes('Biology') && subjects.includes('Chemistry')) {
      recommendedStreams.push({ name: 'Science (PCB)', match: '92%', description: 'Ideal for Medical and Life Sciences' });
    }
    if (interests.includes('Business & Finance') || subjects.includes('Economics')) {
      recommendedStreams.push({ name: 'Commerce', match: '88%', description: 'Great for Business and Finance careers' });
    }
    if (interests.includes('Arts & Design') || subjects.includes('Art')) {
      recommendedStreams.push({ name: 'Arts & Humanities', match: '85%', description: 'Perfect for Creative and Liberal Arts fields' });
    }

    // Default recommendations if none match
    if (recommendedStreams.length === 0) {
      recommendedStreams = [
        { name: 'Science (PCM)', match: '75%', description: 'Based on your analytical skills' },
        { name: 'Commerce', match: '70%', description: 'Good foundation for various careers' }
      ];
    }

    // Degree recommendations based on interests
    if (interests.includes('Technology & Programming')) {
      recommendedDegrees.push({ name: 'Computer Science Engineering', match: '94%', duration: '4 years' });
      recommendedDegrees.push({ name: 'Information Technology', match: '91%', duration: '4 years' });
    }
    if (interests.includes('Medical & Healthcare')) {
      recommendedDegrees.push({ name: 'MBBS', match: '96%', duration: '5.5 years' });
      recommendedDegrees.push({ name: 'Bachelor of Pharmacy', match: '89%', duration: '4 years' });
    }
    if (interests.includes('Business & Finance')) {
      recommendedDegrees.push({ name: 'Bachelor of Business Administration', match: '92%', duration: '3 years' });
      recommendedDegrees.push({ name: 'Chartered Accountancy', match: '88%', duration: '4-5 years' });
    }

    // Default degree recommendations
    if (recommendedDegrees.length === 0) {
      recommendedDegrees = [
        { name: 'Bachelor of Technology', match: '80%', duration: '4 years' },
        { name: 'Bachelor of Science', match: '75%', duration: '3 years' }
      ];
    }

    return { streams: recommendedStreams.slice(0, 3), degrees: recommendedDegrees.slice(0, 4) };
  };

  const recommendations = generateRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 w-full">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_70%)] opacity-80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_70%)] opacity-60"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                  ) : (
                    <UserCircleIcon className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200 mb-4">
                Welcome, {user.name}!
              </h1>
              <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-6">
                Your personalized career assessment results are ready. Here are our recommendations based on your responses.
              </p>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-200"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Assessment Summary */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">
                <ChartBarIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Assessment Score</h3>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  92%
                </div>
                <p className="text-slate-300 text-sm">Compatibility Match</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">
                <AcademicCapIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Current Class</h3>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                  {assessmentData.currentClass}
                </div>
                <p className="text-slate-300 text-sm">Grade Level</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">
                <TrophyIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Top Skills</h3>
                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  {assessmentData.skills.slice(0, 2).join(', ')}
                </div>
                <p className="text-slate-300 text-sm">Identified Strengths</p>
              </div>
            </div>

            {/* Recommended Streams */}
            <div className="mb-12">
              <div className="flex items-center mb-8">
                <BookOpenIcon className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Recommended Academic Streams</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {recommendations.streams.map((stream, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">{stream.name}</h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full">
                        {stream.match}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-4">{stream.description}</p>
                    <button className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Learn More <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Degrees */}
            <div className="mb-12">
              <div className="flex items-center mb-8">
                <BriefcaseIcon className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Recommended Degree Programs</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.degrees.map((degree, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{degree.name}</h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full">
                          {degree.match}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Duration: {degree.duration}</span>
                        <button className="flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors">
                          Explore <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Interest Analysis */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
              <div className="flex items-center mb-6">
                <LightBulbIcon className="w-8 h-8 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Your Interest Profile</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Top Interests</h3>
                  <div className="space-y-2">
                    {assessmentData.interests.slice(0, 5).map((interest, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                        <span className="text-slate-300">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Favorite Subjects</h3>
                  <div className="space-y-2">
                    {assessmentData.subjects.slice(0, 5).map((subject, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3"></div>
                        <span className="text-slate-300">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 w-full">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
