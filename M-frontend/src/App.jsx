import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import About from "./views/About";
import SignIn from "./views/SignIn";
import Dashboard from "./views/Dashboard";
import TalkWithAI from "./views/TalkWithAI";
import AIChat from "./views/AIChat";
import Trending from "./views/Trending";
import Roadmap from "./views/Roadmap";
import Colleges from "./views/Colleges";
import Terms from "./views/Terms";
import Privacy from "./views/Privacy";
import CareerFields from "./views/CareerFields";

function AppContent() {
  const location = useLocation();
  console.log('AppContent - Current location:', location.pathname);
  
  const hideFooterRoutes = ['/signin', '/terms', '/privacy'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Content - flex-grow to fill available space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/talk-with-ai" element={<TalkWithAI />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/ai-assist" element={<Navigate to="/dashboard#chatbot" replace />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/career-fields" element={<CareerFields />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* Catch-all route for debugging */}
          <Route path="*" element={<div>404 - Page not found: {location.pathname}</div>} />
        </Routes>
      </main>

      {/* Footer at the bottom - conditionally rendered */}
      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  console.log('App component initializing...');
  
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;