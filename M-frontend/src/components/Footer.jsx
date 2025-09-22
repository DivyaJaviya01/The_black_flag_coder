import React from 'react';
import { ArrowRightIcon, GlobeAltIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* Same premium background as main website */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_70%)] opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_70%)] opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_70%)] opacity-70" />
            
            {/* Animated gradient orbs matching main site */}
            <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/20 blur-3xl animate-pulse" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/15 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
            
            <div className="relative z-10 text-white">
                {/* Call to Action Section */}
                <div className="px-6 py-16 text-center">
                    <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200">
                        Ready to Start Your Mentorship Journey?
                    </h2>
                    <p className="text-lg text-slate-300/90 mb-8 max-w-2xl mx-auto">
                        Take the first step towards your future. Discover your ideal mentor 
                        and explore the opportunities that await you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/70 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative flex items-center gap-3">
                                Take the Assessment Now
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105">
                            Explore Mentors
                        </button>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="px-6 py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-blue-900 font-bold text-xl">M</span>
                            </div>
                            <span className="text-2xl font-bold">Mentoria</span>
                        </div>
                        <p className="text-slate-300/90 mb-4 text-sm leading-relaxed">
                            Empowering individuals to achieve their goals through 
                            personalized mentorship, comprehensive guidance, and career insights.
                        </p>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <GlobeAltIcon className="w-4 h-4" />
                            <span>Global Mentorship Support</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-slate-300/90">
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Find Mentors</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Career Assessment</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Success Stories</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Career Guidance</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-3 text-slate-300/90">
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Help Center</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Contact Us</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Community Support</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Mentor Resources</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3 text-slate-300/90">
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Industry Insights</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Skill Development</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Career Planning</a></li>
                            <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Success Metrics</a></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300/90">
                        <div className="flex items-center gap-3">
                            <EnvelopeIcon className="w-5 h-5 text-cyan-300" />
                            <div>
                                <p className="text-xs text-cyan-300 uppercase tracking-wide">Email</p>
                                <p className="font-medium">support@mentoria.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <PhoneIcon className="w-5 h-5 text-cyan-300" />
                            <div>
                                <p className="text-xs text-cyan-300 uppercase tracking-wide">Helpline</p>
                                <p className="font-medium">1800-123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPinIcon className="w-5 h-5 text-cyan-300" />
                            <div>
                                <p className="text-xs text-cyan-300 uppercase tracking-wide">Office</p>
                                <p className="font-medium">Mumbai, India</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="px-6 py-4 bg-black/20 backdrop-blur-xl border-t border-white/10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                        <p>© {new Date().getFullYear()} Mentoria. Empowering mentorship connections for every individual.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-cyan-300 transition-colors duration-200">Privacy Policy</a>
                            <a href="#" className="hover:text-cyan-300 transition-colors duration-200">Terms of Service</a>
                            <a href="#" className="hover:text-cyan-300 transition-colors duration-200">Accessibility</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
