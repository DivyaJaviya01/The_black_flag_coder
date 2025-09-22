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
import Terms from "./views/Terms";
import Privacy from "./views/Privacy";

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ['/signin', '/terms', '/privacy'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Routes */}
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
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>

      {/* Footer at the bottom - conditionally rendered */}
      {shouldShowFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;