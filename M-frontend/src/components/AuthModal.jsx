import React, { useState } from 'react';
import { 
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Simulate authentication
    const userData = {
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      isAuthenticated: true
    };

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Call success callback
    onAuthSuccess(userData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    
    // Close modal
    onClose();
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-md shadow-2xl custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-slate-200 mb-2 font-medium">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full bg-white/10 border ${errors.name ? 'border-red-400' : 'border-white/20'} rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-slate-200 mb-2 font-medium">Email Address</label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/20'} rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-slate-200 mb-2 font-medium">Password</label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full bg-white/10 border ${errors.password ? 'border-red-400' : 'border-white/20'} rounded-lg pl-12 pr-12 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-slate-200 mb-2 font-medium">Confirm Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full bg-white/10 border ${errors.confirmPassword ? 'border-red-400' : 'border-white/20'} rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center">
            <p className="text-slate-300">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={switchMode}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;