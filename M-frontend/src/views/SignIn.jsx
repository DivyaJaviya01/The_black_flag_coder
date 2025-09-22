import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate authentication
      const userData = {
        id: Date.now(),
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        isAuthenticated: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Handle remember me
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      setSuccessMessage(isLogin ? 'Welcome back!' : 'Account created successfully!');
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSuccessMessage('');
    setFormData(prev => ({
      ...prev,
      name: '',
      password: '',
      confirmPassword: ''
    }));
  };

  const handleForgotPassword = () => {
    // This would typically open a forgot password modal or navigate to a page
    alert('Forgot password functionality would be implemented here');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4 pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-[90%] max-w-6xl h-[75vh]">
        {/* Back Button */}
        <Link
          to="/"
          className="absolute -top-12 left-0 inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors group z-10"
        >
          <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Main Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden h-full flex">
          {/* Left Side - Image */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-800/30 to-slate-900/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
            
            {/* 3D Illustration Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center w-full">
              {/* Main Illustration Container */}
              <div className="relative w-80 h-80 mb-8">
                {/* Background Elements with theme colors */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl transform rotate-6 backdrop-blur-sm"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-slate-800/20 to-slate-900/30 rounded-3xl backdrop-blur-sm"></div>
                
                {/* Character and Scene */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  {/* Desk/Table */}
                  <div className="absolute bottom-12 w-40 h-6 bg-gradient-to-br from-slate-600/80 to-slate-700/80 rounded-lg"></div>
                  <div className="absolute bottom-16 w-36 h-16 bg-gradient-to-br from-blue-400/80 to-indigo-500/80 rounded-lg">
                    <div className="absolute -bottom-2 left-2 w-4 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-sm"></div>
                    <div className="absolute -bottom-2 right-2 w-4 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-sm"></div>
                  </div>
                  
                  {/* Person */}
                  <div className="relative z-20">
                    {/* Body */}
                    <div className="w-14 h-18 bg-gradient-to-br from-purple-400/80 to-purple-500/80 rounded-xl mx-auto mb-1"></div>
                    
                    {/* Head */}
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-200/90 to-amber-300/90 rounded-full mx-auto mb-1 relative">
                      {/* Hair */}
                      <div className="absolute -top-1 -left-1 w-12 h-6 bg-gradient-to-br from-slate-600/80 to-slate-700/80 rounded-full"></div>
                      {/* Eyes */}
                      <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                      <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                      {/* Smile */}
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-slate-700 rounded-full"></div>
                    </div>
                    
                    {/* Arms positioned for typing */}
                    <div className="relative">
                      <div className="absolute -top-8 left-2 w-2 h-6 bg-gradient-to-br from-amber-200/80 to-amber-300/80 rounded-full transform rotate-45"></div>
                      <div className="absolute -top-8 right-2 w-2 h-6 bg-gradient-to-br from-amber-200/80 to-amber-300/80 rounded-full transform -rotate-45"></div>
                    </div>
                    
                    {/* Legs */}
                    <div className="flex justify-center space-x-1 mt-1">
                      <div className="w-2 h-6 bg-gradient-to-br from-slate-600/80 to-slate-700/80 rounded-full"></div>
                      <div className="w-2 h-6 bg-gradient-to-br from-slate-600/80 to-slate-700/80 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Laptop on desk */}
                  <div className="absolute bottom-18 z-30">
                    {/* Laptop base */}
                    <div className="w-20 h-12 bg-gradient-to-br from-slate-700/90 to-slate-800/90 rounded-lg border border-slate-600/50">
                      {/* Keyboard area */}
                      <div className="w-16 h-8 bg-gradient-to-br from-slate-600/80 to-slate-700/80 rounded m-2 relative">
                        {/* Keys */}
                        <div className="absolute top-1 left-1 grid grid-cols-6 gap-0.5">
                          {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-white/30 rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Laptop screen */}
                    <div className="absolute -top-8 left-1 w-18 h-12 bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-t-lg border border-slate-600/50">
                      {/* Screen content */}
                      <div className="w-16 h-10 bg-gradient-to-br from-blue-100/80 to-white/80 rounded m-1 relative">
                        {/* Career chart/graph */}
                        <div className="absolute bottom-1 left-1 flex items-end space-x-0.5">
                          <div className="w-1 h-2 bg-blue-500/80 rounded-sm"></div>
                          <div className="w-1 h-3 bg-purple-500/80 rounded-sm"></div>
                          <div className="w-1 h-4 bg-indigo-500/80 rounded-sm"></div>
                          <div className="w-1 h-5 bg-blue-600/80 rounded-sm"></div>
                        </div>
                        {/* Text lines */}
                        <div className="absolute top-1 left-1 space-y-0.5">
                          <div className="w-8 h-0.5 bg-slate-400/60 rounded"></div>
                          <div className="w-6 h-0.5 bg-slate-400/60 rounded"></div>
                          <div className="w-7 h-0.5 bg-slate-400/60 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rocket for career growth */}
                  <div className="absolute top-4 right-4 transform rotate-12">
                    {/* Rocket body */}
                    <div className="w-6 h-16 bg-gradient-to-br from-blue-400/80 to-indigo-500/80 rounded-t-full relative">
                      {/* Rocket window */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-cyan-200/80 to-blue-200/80 rounded-full border border-white/40"></div>
                      {/* Rocket fins */}
                      <div className="absolute bottom-0 -left-1 w-2 h-4 bg-gradient-to-br from-red-400/80 to-red-500/80 rounded-bl-lg transform skew-x-12"></div>
                      <div className="absolute bottom-0 -right-1 w-2 h-4 bg-gradient-to-br from-red-400/80 to-red-500/80 rounded-br-lg transform -skew-x-12"></div>
                    </div>
                    {/* Rocket flame */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-3 bg-gradient-to-br from-yellow-400/80 to-orange-500/80 rounded-b-full"></div>
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gradient-to-br from-red-400/80 to-red-500/80 rounded-b-full"></div>
                    </div>
                    {/* Smoke trail */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                      <div className="absolute top-2 -left-0.5 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-200"></div>
                      <div className="absolute top-4 left-0.5 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-400"></div>
                    </div>
                  </div>
                  
                  {/* Career growth books/documents */}
                  <div className="absolute bottom-12 left-4">
                    <div className="w-3 h-8 bg-gradient-to-br from-green-400/80 to-green-500/80 rounded-sm transform rotate-12"></div>
                    <div className="absolute top-0 left-1 w-3 h-8 bg-gradient-to-br from-blue-400/80 to-blue-500/80 rounded-sm transform rotate-6"></div>
                    <div className="absolute top-0 left-2 w-3 h-8 bg-gradient-to-br from-purple-400/80 to-purple-500/80 rounded-sm"></div>
                  </div>
                  
                  {/* Success stars */}
                  <div className="absolute top-6 left-6">
                    <div className="w-3 h-3 bg-gradient-to-br from-yellow-400/80 to-yellow-500/80 rounded-full relative">
                      <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-200/60 to-yellow-300/60 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Floating success elements */}
                  <div className="absolute top-8 right-12 w-2 h-2 bg-gradient-to-br from-green-400/70 to-green-500/70 rounded-full opacity-70 animate-bounce"></div>
                  <div className="absolute top-16 left-8 w-2 h-2 bg-gradient-to-br from-blue-400/70 to-blue-500/70 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute bottom-20 right-8 w-3 h-3 bg-gradient-to-br from-purple-400/70 to-purple-500/70 rounded-full opacity-50 animate-bounce delay-300"></div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="text-center max-w-sm">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 mb-6 drop-shadow-2xl leading-tight">
                  Welcome to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 font-extrabold text-5xl block mt-2 drop-shadow-lg">
                    Mentoria!
                  </span>
                </h2>
                <div className="relative">
                  <p className="text-slate-100 text-lg leading-relaxed drop-shadow-lg font-medium tracking-wide">
                    Discover your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-semibold">
                      perfect career path
                    </span>{' '}
                    with our{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 font-semibold">
                      AI-powered guidance
                    </span>{' '}
                    and personalized recommendations.
                  </p>
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -left-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-50 animate-bounce delay-500"></div>
                </div>
                {/* Subtitle with icon */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-slate-300">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                  <span className="text-sm font-medium tracking-wider uppercase opacity-80">Your Journey Starts Here</span>
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Header */}
            <div className={`bg-gradient-to-r from-slate-800/50 to-slate-900/50 ${isLogin ? 'p-4' : 'p-3'} text-center border-b border-white/10`}>
              <div className="lg:hidden w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className={`${isLogin ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'} font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 ${isLogin ? 'mb-1' : 'mb-0.5'}`}>
                {isLogin ? 'Welcome Back' : 'Join Mentoria'}
              </h1>
              <p className={`text-slate-400 ${isLogin ? 'text-xs lg:text-sm' : 'text-xs'}`}>
                {isLogin 
                  ? 'Sign in to continue your career journey' 
                  : 'Start your career exploration today'
                }
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mx-6 mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-3">
                <CheckIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-green-300 text-sm">{successMessage}</span>
              </div>
            )}

            {/* Form Container */}
            <div className="flex-1 p-6 flex justify-center overflow-hidden">
              <div className="w-full max-w-sm h-full flex flex-col justify-center">
                <form onSubmit={handleSubmit} className={`${isLogin ? 'space-y-3' : 'space-y-2'}`}>
                  {!isLogin && (
                    <div className="space-y-1">
                      <label className="block text-slate-200 font-medium text-sm">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full bg-white/5 border ${
                            errors.name ? 'border-red-400' : 'border-white/20'
                          } rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-200 text-sm`}
                          placeholder="Enter your full name"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-slate-200 font-medium text-sm">Email Address</label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full bg-white/5 border ${
                          errors.email ? 'border-red-400' : 'border-white/20'
                        } rounded-lg pl-10 pr-4 ${isLogin ? 'py-2.5' : 'py-2'} text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-200 text-sm`}
                        placeholder="Enter your email address"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-200 font-medium text-sm">Password</label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full bg-white/5 border ${
                          errors.password ? 'border-red-400' : 'border-white/20'
                        } rounded-lg pl-10 pr-10 ${isLogin ? 'py-2.5' : 'py-2'} text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-200 text-sm`}
                        placeholder="Enter your password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                  </div>

                  {!isLogin && (
                    <div className="space-y-1">
                      <label className="block text-slate-200 font-medium text-sm">Confirm Password</label>
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full bg-white/5 border ${
                            errors.confirmPassword ? 'border-red-400' : 'border-white/20'
                          } rounded-lg pl-10 pr-10 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-200 text-sm`}
                          placeholder="Confirm your password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                  )}

                  {/* Remember Me and Forgot Password */}
                  {isLogin && (
                    <div className="flex items-center justify-between py-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-1"
                          disabled={isLoading}
                        />
                        <span className="text-slate-300 text-sm">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                        disabled={isLoading}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold ${isLogin ? 'py-2.5' : 'py-2'} px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01] disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                      </>
                    ) : (
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    )}
                  </button>

                  {/* Divider */}
                  <div className={`relative ${isLogin ? 'py-3' : 'py-2'}`}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-slate-900/80 px-3 text-slate-400">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Google Sign In */}
                    <button
                      type="button"
                      onClick={() => {/* TODO: Implement Google OAuth */}}
                      className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-2 px-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 border border-gray-200 hover:border-gray-300 text-sm"
                      disabled={isLoading}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Google</span>
                    </button>

                    {/* GitHub Sign In */}
                    <button
                      type="button"
                      onClick={() => {/* TODO: Implement GitHub OAuth */}}
                      className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 border border-gray-700 hover:border-gray-600 text-sm"
                      disabled={isLoading}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </button>
                  </div>

                  {/* Error Message */}
                  {errors.submit && (
                    <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                      {errors.submit}
                    </p>
                  )}

                  {/* Switch Mode */}
                  <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-slate-300 text-base">
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <button
                        type="button"
                        onClick={switchMode}
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors ml-1"
                        disabled={isLoading}
                      >
                        {isLogin ? 'Create one now' : 'Sign in instead'}
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default SignIn;