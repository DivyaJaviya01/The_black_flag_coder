import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  FireIcon,
  ClipboardDocumentIcon,
  MapIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    setUser(null);
    navigate('/');
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleToggle = (menu) => (e) => {
    e.stopPropagation();
    toggleMenu(menu);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border-b border-white/10 shadow-xl shadow-slate-900/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <MapIcon className="h-7 w-7 text-blue-400" />
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Mentoria</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8 relative">
            {/* Home: label navigates, arrow toggles dropdown */}
            <div className="relative flex items-center">
              <button
                onClick={() => {
                  // If on home page, scroll to top
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    // Navigate to home page
                    window.location.href = '/';
                  }
                  setOpenMenu(null);
                }}
                className="group flex items-center space-x-1 text-gray-200 hover:text-white transition-colors"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Home</span>
              </button>
              <button
                onClick={handleToggle("home")}
                aria-expanded={openMenu === "home"}
                aria-controls="menu-home"
                className="ml-1 p-1 rounded hover:bg-white/10 transition-colors"
              >
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openMenu === "home" ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openMenu === "home" && (
                <div id="menu-home" className="absolute top-10 left-1/2 -translate-x-1/2 w-56 bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/10">
                  <div className="py-2">
                    <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5">
                      <ChartBarIcon className="h-5 w-5 mr-3 text-sky-400" />
                      <span className="text-sm">Dashboard</span>
                    </Link>
                    <button 
                      onClick={() => {
                        const trendingSection = document.getElementById('trending-section');
                        if (trendingSection) {
                          trendingSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          // If not on home page, navigate to home and then scroll
                          window.location.href = '/#trending-section';
                        }
                        setOpenMenu(null);
                      }}
                      className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5 w-full text-left"
                    >
                      <FireIcon className="h-5 w-5 mr-3 text-rose-400" />
                      <span className="text-sm">Trending</span>
                    </button>
                    <button 
                      onClick={() => {
                        const assessmentSection = document.getElementById('assessment-section');
                        if (assessmentSection) {
                          assessmentSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          // If not on home page, navigate to home and then scroll
                          window.location.href = '/#assessment-section';
                        }
                        setOpenMenu(null);
                      }}
                      className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5 w-full text-left"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 mr-3 text-amber-400" />
                      <span className="text-sm">Form</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Roadmap: label navigates, arrow toggles dropdown */}
            <div className="relative flex items-center">
              <Link to="/roadmap" className="group flex items-center space-x-1 text-gray-200 hover:text-white transition-colors">
                <MapIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Roadmap</span>
              </Link>
              <button
                onClick={handleToggle("roadmap")}
                aria-expanded={openMenu === "roadmap"}
                aria-controls="menu-roadmap"
                className={`ml-1 p-1 rounded hover:bg-white/10 transition-colors`}
              >
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openMenu === "roadmap" ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openMenu === "roadmap" && (
                <div id="menu-roadmap" className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/10">
                  <div className="py-2">
                    <Link to="/roadmap" className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5">
                      <MapIcon className="h-5 w-5 mr-3 text-purple-400" />
                      <span className="text-sm">Career Fields</span>
                    </Link>
                    <Link to="/colleges" className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5">
                      <BuildingLibraryIcon className="h-5 w-5 mr-3 text-blue-400" />
                      <span className="text-sm">Colleges</span>
                    </Link>
                    <Link to="/scholarship" className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5">
                      <AcademicCapIcon className="h-5 w-5 mr-3 text-emerald-400" />
                      <span className="text-sm">Scholarship</span>
                    </Link>
                    <Link to="/career-support" className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5">
                      <BriefcaseIcon className="h-5 w-5 mr-3 text-violet-400" />
                      <span className="text-sm">Career Path Support</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Talk with AI: label navigates to page, arrow toggles dropdown */}
            <div className="relative flex items-center">
              <Link
                to="/talk-with-ai"
                className="group flex items-center space-x-1 text-gray-200 hover:text-white transition-colors"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Talk with AI</span>
              </Link>
              <button
                onClick={handleToggle("ai-assist")}
                aria-expanded={openMenu === "ai-assist"}
                aria-controls="menu-ai-assist"
                className="ml-1 p-1 rounded hover:bg-white/10 transition-colors"
              >
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openMenu === "ai-assist" ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openMenu === "ai-assist" && (
                <div id="menu-ai-assist" className="absolute top-10 left-1/2 -translate-x-1/2 w-56 bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/10">
                  <div className="py-2">
                    <Link 
                      to="/ai-chat"
                      className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5"
                      onClick={() => setOpenMenu(null)}
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-3 text-blue-400" />
                      <span className="text-sm">AI Chat</span>
                    </Link>
                    <Link 
                      to="/talk-with-ai#live-chat"
                      className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5"
                      onClick={() => setOpenMenu(null)}
                    >
                      <CpuChipIcon className="h-5 w-5 mr-3 text-purple-400" />
                      <span className="text-sm">Live Chat</span>
                    </Link>
                    <Link 
                      to="/talk-with-ai#faq"
                      className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/5"
                      onClick={() => setOpenMenu(null)}
                    >
                      <QuestionMarkCircleIcon className="h-5 w-5 mr-3 text-emerald-400" />
                      <span className="text-sm">FAQ</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-white text-sm font-medium hidden md:block">
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white transition-colors"
                    title="Logout"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="inline-flex items-center space-x-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] px-4 py-2 rounded-lg shadow-md shadow-blue-900/30 transition-all"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;