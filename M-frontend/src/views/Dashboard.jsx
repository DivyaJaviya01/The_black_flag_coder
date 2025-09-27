import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChartBarIcon, 
  AcademicCapIcon,
  LightBulbIcon,
  TrophyIcon,
  UserCircleIcon,
  ArrowRightIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  BellIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatbotRef = useRef(null);
  const [user, setUser] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [userHistory, setUserHistory] = useState({ viewedStreams: [], viewedJobs: [] });
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for hash fragment and scroll to chatbot section
  useEffect(() => {
    if (location.hash === '#chatbot' && chatbotRef.current) {
      chatbotRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // Check if user is authenticated
  useEffect(() => {
    console.log('Dashboard - Checking authentication status...');
    const userData = localStorage.getItem('user');
    console.log('Dashboard - User data from localStorage:', userData);
    
    if (!userData) {
      console.log('Dashboard - No user data found, redirecting to sign in');
      // Use window.location.href for a full page navigation to ensure all components update
      window.location.href = '/signin';
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      console.log('Dashboard - Parsed user data:', parsedUser);
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

      // Get user history
      const savedHistory = localStorage.getItem('userHistory');
      if (savedHistory) {
        setUserHistory(JSON.parse(savedHistory));
      } else {
        // Sample history data for demonstration
        const sampleHistory = {
          viewedStreams: [
            { name: 'Science (PCM)', match: '95%', description: 'Perfect for Engineering and Technology careers', timestamp: new Date(Date.now() - 86400000).toISOString() },
            { name: 'Commerce', match: '88%', description: 'Great for Business and Finance careers', timestamp: new Date(Date.now() - 172800000).toISOString() }
          ],
          viewedJobs: [
            { id: 1, title: 'Data Scientist', category: 'Science', timestamp: new Date(Date.now() - 86400000).toISOString() },
            { id: 11, title: 'UX/UI Designer', category: 'Arts', timestamp: new Date(Date.now() - 259200000).toISOString() },
            { id: 6, title: 'Financial Analyst', category: 'Commerce', timestamp: new Date(Date.now() - 432000000).toISOString() }
          ]
        };
        setUserHistory(sampleHistory);
        localStorage.setItem('userHistory', JSON.stringify(sampleHistory));
      }
      
      console.log('Dashboard - Authentication check completed successfully');
    } catch (error) {
      console.error('Dashboard - Error parsing user data:', error);
      // If there's an error parsing, remove the invalid data and redirect to sign in
      localStorage.removeItem('user');
      // Use window.location.href for a full page navigation to ensure all components update
      window.location.href = '/signin';
    }
    
    // Add event listener for storage changes to detect logout from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'user' && !e.newValue) {
        console.log('Dashboard - User logged out in another tab, redirecting to sign in');
        // Use window.location.href for a full page navigation to ensure all components update
        window.location.href = '/signin';
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  // Set loading to false after authentication check
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    // Use window.location.href for a full page navigation to ensure all components update
    window.location.href = '/signin';
  };

  // Function to clear user history
  const clearHistory = () => {
    const clearedHistory = { viewedStreams: [], viewedJobs: [] };
    setUserHistory(clearedHistory);
    localStorage.setItem('userHistory', JSON.stringify(clearedHistory));
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-slate-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show loading state if user or assessment data is not ready
  if (!user || !assessmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-slate-300">Loading your dashboard...</p>
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

  // Function to add to history
  const addToHistory = (type, item) => {
    const newHistory = { ...userHistory };
    const timestamp = new Date().toISOString();
    
    if (type === 'stream') {
      newHistory.viewedStreams = [
        { ...item, timestamp },
        ...newHistory.viewedStreams.slice(0, 4) // Keep only last 5
      ];
    } else if (type === 'job') {
      newHistory.viewedJobs = [
        { ...item, timestamp },
        ...newHistory.viewedJobs.slice(0, 4) // Keep only last 5
      ];
    }
    
    setUserHistory(newHistory);
    localStorage.setItem('userHistory', JSON.stringify(newHistory));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Career Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user.name}. Here's your personalized career guidance overview.</p>
        </div>

        {/* Line after heading */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"></div>

        {/* Assessment-Based Recommendations Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Career Insights</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Best Skills */}
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg mr-3">
                  <TrophyIcon className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Top Skills</h3>
              </div>
              <ul className="space-y-2">
                {assessmentData.skills.slice(0, 3).map((skill, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-slate-300">{skill}</span>
                    <span className="text-xs font-medium bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                      {100 - (index * 10)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Stream */}
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                  <AcademicCapIcon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Recommended Stream</h3>
              </div>
              <div className="text-center py-2">
                <p className="text-xl font-bold text-white mb-1">
                  {recommendations.streams.length > 0 ? recommendations.streams[0].name : 'Science (PCM)'}
                </p>
                <p className="text-sm text-slate-400">
                  {recommendations.streams.length > 0 ? recommendations.streams[0].match : '95%'} match
                </p>
                <button 
                  className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  onClick={() => recommendations.streams.length > 0 && addToHistory('stream', recommendations.streams[0])}
                >
                  Explore Path
                </button>
              </div>
            </div>

            {/* Recommended Field */}
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                  <LightBulbIcon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Suggested Field</h3>
              </div>
              <div className="text-center py-2">
                <p className="text-xl font-bold text-white mb-1">
                  {recommendations.degrees.length > 0 ? recommendations.degrees[0].name : 'Computer Science'}
                </p>
                <p className="text-sm text-slate-400">
                  {recommendations.degrees.length > 0 ? recommendations.degrees[0].match : '94%'} match
                </p>
                <button 
                  className="mt-3 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                  onClick={() => recommendations.degrees.length > 0 && addToHistory('job', {
                    id: Date.now(),
                    title: recommendations.degrees[0].name,
                    category: recommendations.streams.length > 0 ? recommendations.streams[0].name : 'Science',
                    timestamp: new Date().toISOString()
                  })}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Assessment Match</p>
                <h3 className="text-2xl font-bold text-white">94%</h3>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <ChartBarIcon className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '94%'}}></div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Current Education</p>
                <h3 className="text-2xl font-bold text-white">{assessmentData.currentClass}</h3>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <AcademicCapIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-sm">Preparing for future</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Key Strengths</p>
                <h3 className="text-2xl font-bold text-white">{assessmentData.skills.length}</h3>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <TrophyIcon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-sm truncate">{assessmentData.skills[0]}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Top Interest</p>
                <h3 className="text-2xl font-bold text-white">{assessmentData.interests.length}</h3>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <LightBulbIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-sm truncate">{assessmentData.interests[0]}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 w-full">
            {/* Recommendations Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Personalized Recommendations</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.streams.map((stream, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{stream.name}</h3>
                      <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                        {stream.match}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{stream.description}</p>
                    <button 
                      className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                      onClick={() => addToHistory('stream', stream)}
                    >
                      Explore Path <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Interest Analysis */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Insights</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <LightBulbIcon className="w-5 h-5 text-yellow-400 mr-2" />
                    Your Interests
                  </h3>
                  <div className="space-y-3">
                    {assessmentData.interests.slice(0, 5).map((interest, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                        <span className="text-slate-300">{interest}</span>
                        <span className="text-xs font-medium bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          {Math.max(70 - (index * 8), 40)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <AcademicCapIcon className="w-5 h-5 text-green-400 mr-2" />
                    Favorite Subjects
                  </h3>
                  <div className="space-y-3">
                    {assessmentData.subjects.slice(0, 5).map((subject, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                        <span className="text-slate-300">{subject}</span>
                        <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          {Math.max(85 - (index * 7), 50)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3 w-full">
            {/* Recently Viewed Streams */}
            {userHistory.viewedStreams.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <EyeIcon className="w-5 h-5 text-blue-400 mr-2" />
                    Recently Viewed Streams
                  </h2>
                  <button 
                    onClick={clearHistory}
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                    title="Clear History"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {userHistory.viewedStreams.map((stream, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white">{stream.name}</h3>
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          {formatDate(stream.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          {stream.match} match
                        </span>
                        <button 
                          className="text-xs text-blue-400 hover:text-blue-300"
                          onClick={() => addToHistory('stream', stream)}
                        >
                          View Again
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recently Viewed Jobs */}
            {userHistory.viewedJobs.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <BriefcaseIcon className="w-5 h-5 text-purple-400 mr-2" />
                    Recently Viewed Careers
                  </h2>
                  <button 
                    onClick={clearHistory}
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                    title="Clear History"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {userHistory.viewedJobs.map((job, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white text-sm">{job.title}</h3>
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                          {formatDate(job.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{job.category}</span>
                        <button 
                          className="text-xs text-purple-400 hover:text-purple-300"
                          onClick={() => addToHistory('job', job)}
                        >
                          View Again
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Quick Navigation</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className="bg-slate-800/50 hover:bg-slate-700/50 rounded-lg p-4 border border-slate-700/50 hover:border-blue-500/50 transition-colors text-center"
                  onClick={() => window.location.href = '/roadmap'}
                >
                  <BookOpenIcon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <span className="text-sm text-white">Explore Streams</span>
                </button>
                
                <button 
                  className="bg-slate-800/50 hover:bg-slate-700/50 rounded-lg p-4 border border-slate-700/50 hover:border-purple-500/50 transition-colors text-center"
                  onClick={() => window.location.href = '/trending'}
                >
                  <BriefcaseIcon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <span className="text-sm text-white">Trending Jobs</span>
                </button>
                
                <button 
                  className="bg-slate-800/50 hover:bg-slate-700/50 rounded-lg p-4 border border-slate-700/50 hover:border-green-500/50 transition-colors text-center"
                  onClick={() => window.location.href = '/ai-chat'}
                >
                  <ChartBarIcon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <span className="text-sm text-white">AI Chat</span>
                </button>
                
                <button 
                  className="bg-slate-800/50 hover:bg-slate-700/50 rounded-lg p-4 border border-slate-700/50 hover:border-yellow-500/50 transition-colors text-center"
                  onClick={() => window.location.href = '/assessment'}
                >
                  <LightBulbIcon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <span className="text-sm text-white">Retake Assessment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 2px gradient line between dashboard and footer */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-24"></div>
    </div>
  );
};

export default Dashboard;