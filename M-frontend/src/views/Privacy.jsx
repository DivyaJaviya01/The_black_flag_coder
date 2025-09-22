import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/signin"
          className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Sign In</span>
        </Link>

        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <div className="prose prose-slate prose-invert max-w-none">
            <p className="text-slate-300 mb-4">
              At Mentoria, we take your privacy seriously. This policy describes how we collect, 
              use, and protect your personal information.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6 mb-3">Information We Collect</h2>
            <p className="text-slate-300 mb-4">
              We collect information you provide during registration, career assessments, and 
              when using our platform features. This includes your name, email, educational background, 
              and assessment responses.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6 mb-3">How We Use Your Information</h2>
            <p className="text-slate-300 mb-4">
              Your information is used to provide personalized career recommendations, improve our 
              services, and communicate with you about your career journey.
            </p>
            
            <h2 className="text-xl font-semibend text-white mt-6 mb-3">Data Security</h2>
            <p className="text-slate-300 mb-4">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6 mb-3">Contact Us</h2>
            <p className="text-slate-300">
              If you have questions about this privacy policy, please contact us at privacy@mentoria.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;