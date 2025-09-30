import React, { useState, useEffect } from 'react';
import { AcademicCapIcon, MapPinIcon, CalendarIcon, UserGroupIcon, CurrencyRupeeIcon, LinkIcon, ChevronRightIcon, BookmarkIcon, StarIcon, ClockIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { API_CONFIG } from '../config/api.js';

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Scroll to top when component mounts
  useEffect(() => {
    if (window.location.hash === '#career-fields-section') {
      setTimeout(() => {
        const careerFieldsSection = document.getElementById('career-fields-section');
        if (careerFieldsSection) {
          careerFieldsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Fetch colleges from database
  const fetchColleges = async (query = '', type = 'all') => {
    console.log('🚀 Fetching colleges with params:', { query, type });
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (query) params.append('search', query);
      if (type !== 'all') params.append('type', type);
      
      const apiUrl = `http://localhost:3001/api/colleges?${params.toString()}`;
      console.log('📡 API URL:', apiUrl);
      
      console.log('🔄 Making fetch request...');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
      
      console.log('📥 Response received:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response not OK. Response text:', errorText);
        throw new Error(`Failed to fetch colleges from database: ${response.status} ${response.statusText}`);
      }
      
      console.log('🔄 Parsing JSON...');
      const data = await response.json();
      console.log('✅ Data received and parsed:', {
        success: data.success,
        count: data.count,
        totalCount: data.totalCount,
        collegesLength: data.colleges?.length || 0,
        firstCollegeName: data.colleges?.[0]?.name || data.colleges?.[0]?.college_name || 'No name'
      });
      
      console.log('🔄 Setting colleges state...');
      setColleges(data.colleges || []);
      console.log('✅ Colleges state set successfully');
      
      // Clear any previous errors if successful
      if (data.colleges && data.colleges.length > 0) {
        console.log('✅ Data fetch successful, clearing any previous errors');
        setError(null);
      }
      
    } catch (err) {
      console.error('❌ API Error occurred:', err.message);
      console.error('❌ Full error object:', err);
      console.error('❌ Error stack:', err.stack);
      setError(err.message);
      // No fallback data - show error message instead
      setColleges([]);
    } finally {
      console.log('🔄 Setting loading to false...');
      setLoading(false);
    }
  };

  // Fetch colleges on component mount and when search/filter changes
  useEffect(() => {
    fetchColleges(searchQuery, filterType);
  }, [searchQuery, filterType]);

  // Debug effect to track state changes
  useEffect(() => {
    console.log('📈 State changed:', {
      loading,
      error,
      collegesCount: colleges.length,
      searchQuery,
      filterType
    });
  }, [loading, error, colleges.length, searchQuery, filterType]);

  // Search and Filter Component
  const SearchAndFilter = () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search colleges by name, location, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="md:w-48">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="IIT">IIT</option>
            <option value="NIT">NIT</option>
            <option value="IIIT">IIIT</option>
            <option value="AIIMS">AIIMS</option>
            <option value="Government">Government</option>
            <option value="Central University">Central University</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Loading Component
  const LoadingCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-pulse">
          <div className="h-48 bg-slate-300"></div>
          <div className="p-6">
            <div className="h-6 bg-slate-300 rounded mb-2"></div>
            <div className="h-4 bg-slate-200 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // SIMPLIFIED College Card Template - Shows Database Data Clearly
  const CollegeCard = ({ college }) => {
    console.log('🎨 Rendering college card:', college);
    
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {college.name || college.college_name || 'Unknown College'}
          </h3>
          
          <div className="space-y-2 text-sm">
            <p><strong>Type:</strong> {college.type || 'N/A'}</p>
            <p><strong>Location:</strong> {college.city || college.location || 'N/A'}</p>
            <p><strong>Founded:</strong> {college.founded || 'N/A'}</p>
            
            {college.specialization && (
              <p><strong>Specialization:</strong> {college.specialization}</p>
            )}
            
            {college.website && (
              <p><strong>Website:</strong> 
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  {college.website}
                </a>
              </p>
            )}
          </div>
          
          {/* Show raw data for debugging */}
          <details className="mt-4">
            <summary className="text-xs text-gray-500 cursor-pointer">Show Raw Data</summary>
            <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
              {JSON.stringify(college, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  };

  /* COMMENTED OUT COMPLEX TEMPLATE - ORIGINAL TEMPLATE CODE
  const CollegeCard = ({ college }) => {
    // Generate a unique background color based on college name
    const getCollegeColor = (name) => {
      const colors = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-green-500 to-emerald-500',
        'from-amber-500 to-orange-500',
        'from-rose-500 to-red-500',
        'from-indigo-500 to-blue-500',
        'from-teal-500 to-cyan-500',
        'from-fuchsia-500 to-purple-500',
        'from-lime-500 to-green-500',
        'from-violet-500 to-purple-500'
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    };
    
    const collegeColor = getCollegeColor(college.name || college.college_name);

    return (
      <article className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 group">
        {/* College Header */
  //       <header className={`h-32 bg-gradient-to-r ${collegeColor} relative p-6 flex items-center`}>
  //         <div className="text-center w-full">
  //           <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
  //             <BuildingOfficeIcon className="h-6 w-6 text-white" />
  //           </div>
  //           <h2 className="text-xl font-bold text-white">
  //             {college.name || college.college_name}
  //           </h2>
  //           <p className="text-white/90 text-sm">
  //             {college.shortName || college.location}
  //           </p>
  //           <p className="text-white/80 text-xs">
  //             <strong>{college.city || college.location}</strong>
  //           </p>
  //         </div>
          
  //         {/* Type Badge */}
  //         <div className="absolute top-4 right-4">
  //           <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
  //             {college.type || 'College'}
  //           </span>
  //         </div>
  //       </header>

  //       <div className="p-6">
  //         {/* Specialization */}
  //         {(college.specialization || college.whyConsider) && (
  //           <div className="mb-4">
  //             <h3 className="text-lg font-semibold text-slate-800 mb-2 border-b-2 border-blue-500 inline-block pb-1">
  //               Specialization
  //             </h3>
  //             <p className="text-slate-700 text-sm">
  //               {college.specialization || college.whyConsider}
  //             </p>
  //           </div>
  //         )}

  //         {/* Courses Offered */}
  //         {(college.courses_offered || college.courses) && (
  //           <div className="mb-4">
  //             <h3 className="text-lg font-semibold text-slate-800 mb-2 border-b-2 border-blue-500 inline-block pb-1">
  //               Courses Offered
  //             </h3>
              
  //             {/* Handle database format (courses_offered) */}
  //             {college.courses_offered && (
  //               <>
  //                 {college.courses_offered.undergraduate && (
  //                   <>
  //                     <h4 className="font-medium text-slate-700 mt-2 mb-1">Undergraduate</h4>
  //                     <ul className="list-none space-y-1 mb-3">
  //                       {college.courses_offered.undergraduate.map((course, index) => (
  //                         <li key={index} className="flex items-start text-sm text-slate-600">
  //                           <span className="text-green-500 mr-2 mt-1">✔</span>
  //                           {course}
  //                         </li>
  //                       ))}
  //                     </ul>
  //                   </>
  //                 )}
  //                 {college.courses_offered.postgraduate && (
  //                   <>
  //                     <h4 className="font-medium text-slate-700 mt-2 mb-1">Postgraduate</h4>
  //                     <ul className="list-none space-y-1">
  //                       {college.courses_offered.postgraduate.map((course, index) => (
  //                         <li key={index} className="flex items-start text-sm text-slate-600">
  //                           <span className="text-green-500 mr-2 mt-1">✔</span>
  //                           {course}
  //                         </li>
  //                       ))}
  //                     </ul>
  //                   </>
  //                 )}
  //               </>
  //             )}
              
  //             {/* Handle existing format (courses) */}
  //             {college.courses && !college.courses_offered && (
  //               <div className="space-y-2">
  //                 {Object.entries(college.courses).map(([level, courseList]) => (
  //                   <div key={level}>
  //                     <h4 className="font-medium text-slate-700 capitalize">{level}</h4>
  //                     <p className="text-sm text-slate-600">{courseList}</p>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         )}

  //         {/* Placement Statistics */}
  //         {college.placement && (
  //           <div className="mb-4">
  //             <h3 className="text-lg font-semibold text-slate-800 mb-2 border-b-2 border-blue-500 inline-block pb-1">
  //               Placements ({new Date().getFullYear()})
  //             </h3>
  //             <div className="bg-blue-50 rounded-lg p-4">
  //               <div className="grid grid-cols-2 gap-4 text-center">
  //                 {college.placement.highest_package && (
  //                   <div>
  //                     <div className="text-xl font-bold text-blue-600">
  //                       {college.placement.highest_package}
  //                     </div>
  //                     <div className="text-xs text-slate-600">Highest Package</div>
  //                   </div>
  //                 )}
  //                 {college.placement.average_package && (
  //                   <div>
  //                     <div className="text-xl font-bold text-blue-600">
  //                       {college.placement.average_package}
  //                     </div>
  //                     <div className="text-xs text-slate-600">Average Package</div>
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         )}

  //         {/* Top Recruiters */}
  //         {(college.placement?.top_recruiters || college.placements) && (
  //           <div className="mb-4">
  //             <h3 className="text-lg font-semibold text-slate-800 mb-2 border-b-2 border-blue-500 inline-block pb-1">
  //               Top Recruiters
  //             </h3>
  //             <div className="flex flex-wrap gap-2">
  //               {(college.placement?.top_recruiters || college.placements?.split(', ') || []).map((recruiter, index) => (
  //                 <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
  //                   {recruiter}
  //                 </span>
  //               ))}
  //             </div>
  //           </div>
  //         )}

  //         {/* Key Strengths */}
  //         {college.recommendation?.strengths && (
  //           <div className="mb-4">
  //             <h3 className="text-lg font-semibold text-slate-800 mb-2 border-b-2 border-blue-500 inline-block pb-1">
  //               Key Strengths
  //             </h3>
  //             <ul className="list-none space-y-1">
  //               {college.recommendation.strengths.map((strength, index) => (
  //                 <li key={index} className="flex items-start text-sm text-slate-600">
  //                   <span className="text-green-500 mr-2 mt-1">✔</span>
  //                   {strength}
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         )}

  //         {/* Additional Info */}
  //         <div className="space-y-3 mb-4">
  //           {college.founded && (
  //             <div className="flex items-center text-slate-600">
  //               <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
  //               <span className="text-sm">Founded: {college.founded}</span>
  //             </div>
  //           )}
            
  //           {(college.intake || college.seats) && (
  //             <div className="flex items-center text-slate-600">
  //               <UserGroupIcon className="h-4 w-4 mr-2 text-blue-500" />
  //               <span className="text-sm">
  //                 Intake: {college.intake || 
  //                   `UG: ${college.seats?.total_undergraduate_seats || 'N/A'}, PG: ${college.seats?.total_postgraduate_seats || 'N/A'}`
  //                 }
  //               </span>
  //             </div>
  //           )}
            
  //           {college.fees && (
  //             <div className="flex items-center text-slate-600">
  //               <CurrencyRupeeIcon className="h-4 w-4 mr-2 text-blue-500" />
  //               <span className="text-sm">Fees: {college.fees}</span>
  //             </div>
  //           )}
  //         </div>

  //         {/* Admission Note */}
  //         {(college.seats?.notes || college.admissionPath) && (
  //           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
  //             <p className="text-sm text-yellow-800">
  //               <strong>Admission:</strong> {college.seats?.notes || 'Based on entrance exam and highly competitive.'}
  //               {college.seats && (
  //                 <span> Total UG seats: {college.seats.total_undergraduate_seats} | PG seats: {college.seats.total_postgraduate_seats}</span>
  //               )}
  //             </p>
  //           </div>
  //         )}

  //         {/* Footer with Website Link */}
  //         <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4">
  //           {college.website ? (
  //             <a 
  //               href={college.website} 
  //               target="_blank" 
  //               rel="noopener noreferrer"
  //               className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
  //             >
  //               <LinkIcon className="h-4 w-4 mr-1" />
  //               Visit Website
  //             </a>
  //           ) : (
  //             <span className="text-slate-400 text-sm">No website available</span>
  //           )}
            
  //           {(college.reservation || college.type) && (
  //             <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
  //               {college.reservation || college.type}
  //             </span>
  //           )}
  //         </div>
  //       </div>
  //     </article>
  //   );
  // };
  // */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Centered Text Content */}
            <div className="text-center mt-10">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Government Colleges</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto mb-8">
                Explore premier government institutions for higher education across various fields with detailed information on admissions, courses, and opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Separator Line */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mb-16"></div>
      </div>

      {/* Search and Filters */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-8">
        <SearchAndFilter />
      </div>

      {/* Colleges Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
          {/* Debug Information */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-yellow-800 mb-2">🔍 Debug Info</h3>
              <div className="text-xs text-yellow-700">
                <p>Loading: {loading.toString()}</p>
                <p>Error: {error || 'None'}</p>
                <p>Colleges count: {colleges.length}</p>
                <p>Search query: "{searchQuery}"</p>
                <p>Filter type: {filterType}</p>
                <button 
                  onClick={() => {
                    console.log('🔄 Manual test fetch triggered');
                    fetchColleges(searchQuery, filterType);
                  }}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                >
                  🔄 Test Fetch
                </button>
                <button 
                  onClick={() => {
                    console.log('📋 Current state:', { loading, error, colleges: colleges.length });
                    console.log('📋 Colleges data:', colleges);
                  }}
                  className="mt-2 ml-2 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                >
                  📋 Log State
                </button>
              </div>
            </div>
          )}

          {/* Results Count */}
          {!loading && (
            <div className="mb-6">
              <p className="text-white/70 text-sm">
                Showing {colleges.length} college{colleges.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
                {filterType !== 'all' && ` in ${filterType}`}
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-200">Error: {error}</p>
              <p className="text-red-200/70 text-sm mt-1">
                Please check if the backend server is running on http://localhost:3001
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && <LoadingCards />}

          {/* Database Data Display */}
          {!loading && colleges.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">📊 Database Data Display</h3>
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-semibold">
                  ✅ Successfully fetched {colleges.length} colleges from database
                </p>
              </div>
              
              {/* Raw Data Display */}
              <details className="mb-6">
                <summary className="text-white cursor-pointer text-lg font-semibold bg-blue-600 px-4 py-2 rounded">
                  🔍 View Raw Database Data
                </summary>
                <div className="mt-4 bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
                  <pre className="text-sm">
                    {JSON.stringify(colleges, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          )}

          {/* Colleges Grid */}
          {!loading && colleges.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <CollegeCard key={college.id || college._id} college={college} />
              ))}
            </div>
          )}

          {/* No Results State */}
          {!loading && colleges.length === 0 && !error && (
            <div className="text-center py-12">
              <AcademicCapIcon className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No colleges found</h3>
              <p className="text-white/70">Try adjusting your search criteria or filters.</p>
            </div>
          )}

          {/* Database Connection Error State */}
          {!loading && colleges.length === 0 && error && (
            <div className="text-center py-12">
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-8 max-w-md mx-auto">
                <AcademicCapIcon className="h-16 w-16 text-red-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-200 mb-2">Database Connection Issue</h3>
                <p className="text-red-200/70 mb-4">
                  Unable to fetch college data from the database.
                </p>
                <p className="text-red-200/70 text-sm">
                  Make sure the backend server is running on http://localhost:3001
                </p>
                <button 
                  onClick={() => fetchColleges(searchQuery, filterType)}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Colleges;
