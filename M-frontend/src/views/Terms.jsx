import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Terms = () => {
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
          <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
          
          <div className="prose prose-slate prose-invert max-w-none">
            <p className="text-slate-300 mb-4">
              Welcome to Mentoria. By using our career guidance platform, you agree to these terms of service.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6 mb-3">1. Service Description</h2>
            <p className="text-slate-300 mb-4">
              Mentoria provides career assessment tools, educational guidance, and career path recommendations 
              to help students and professionals make informed decisions about their future.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6 mb-3">2. User Responsibilities</h2>
            <p className="text-slate-300 mb-4">
              Users are responsible for providing accurate information during assessments and maintaining 
              the confidentiality of their account credentials.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. Privacy</h2>
            <p className="text-slate-300 mb-4">
              We respect your privacy and are committed to protecting your personal information. 
              Please refer to our Privacy Policy for detailed information.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6 mb-3">4. Contact</h2>
            <p className="text-slate-300">
              If you have any questions about these terms, please contact us at support@mentoria.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;