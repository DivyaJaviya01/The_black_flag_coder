import React, { useState, useEffect } from 'react';

const CollegesTest = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🚀 Simple fetch starting...');
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:3001/api/colleges');
        console.log('📡 Response status:', response.status, response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Data received:', data.count, 'colleges');
        
        setColleges(data.colleges || []);
        setError(null);
        
      } catch (err) {
        console.error('❌ Fetch error:', err.message);
        setError(err.message);
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Only run once on mount

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading colleges...</h2>
        <div>Please wait while we fetch college data from the database.</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h2>❌ Error Loading Colleges</h2>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>🏫 Colleges Test Page</h1>
      <p><strong>Found {colleges.length} colleges:</strong></p>
      
      {colleges.length === 0 ? (
        <div>No colleges found in database.</div>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {colleges.map((college, index) => (
            <div key={college._id || index} style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '8px',
              background: '#f9f9f9'
              }}>
              <h3>{college.name || college.college_name || 'Unknown College'}</h3>
              <p><strong>Location:</strong> {college.location || 'N/A'}, <strong>{college.city}</strong></p>
              <p><strong>Type:</strong> {college.type || 'N/A'}</p>
              {college.specialization && (<p><strong>Specialization:</strong> {college.specialization}</p>)}
              <div style={{ marginTop: '10px' }}>
                <strong>Courses Offered:</strong><br />
                {college.courses_offered?.undergraduate && (
                  <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                    <strong>UG:</strong> {Array.isArray(college.courses_offered.undergraduate)
                      ? college.courses_offered.undergraduate.join(', ')
                      : college.courses_offered.undergraduate}
                  </div>
                )}
                {college.courses_offered?.postgraduate && (
                  <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                    <strong>PG:</strong> {Array.isArray(college.courses_offered.postgraduate)
                      ? college.courses_offered.postgraduate.join(', ')
                      : college.courses_offered.postgraduate}
                  </div>
                )}
              </div>

              {/* Recommendation Section */}
              {college.recommendation && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Recommendation:</strong><br />
                  {college.recommendation.rankings && (
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      <strong>Rankings:</strong> {college.recommendation.rankings}
                    </div>
                  )}
                  {college.recommendation.strengths && (
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      <strong>Strengths:</strong> {Array.isArray(college.recommendation.strengths)
                        ? college.recommendation.strengths.join(', ')
                        : college.recommendation.strengths}
                    </div>
                  )}
                </div>
              )}

              {/* Placements Section */}
              {college.placement && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Placements:</strong><br />
                  
                  {college.placement.highest_package && (
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      <strong>Highest Package:</strong> {college.placement.highest_package}
                    </div>
                  )}
                  {college.placement.average_package && (
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      <strong>Average Package:</strong> {college.placement.average_package}
                    </div>
                  )}
                  {college.placement.top_recruiters && (
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      <strong>Top Recruiters:</strong> {Array.isArray(college.placement.top_recruiters)
                        ? college.placement.top_recruiters.join(', ')
                        : college.placement.top_recruiters}
                    </div>
                  )}
                </div>
              )}

              {/* Seats & Admissions Section */}
              {college.seats && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Seats & Admissions:</strong><br />
                  
                  {college.seats.total_undergraduate_seats && (
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      <strong>Total Undergraduate Seats:</strong> {college.seats.total_undergraduate_seats}
                    </div>
                  )}
                  {college.seats.total_postgraduate_seats && (
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      <strong>Total Postgraduate Seats:</strong> {college.seats.total_postgraduate_seats}
                    </div>
                  )}
                  {college.seats.notes && (
                    <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                      <strong>Notes:</strong> {college.seats.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>Debug: Loading={loading.toString()}, Error={error || 'none'}, Count={colleges.length}</p>
      </div>
    </div>
  );
};

export default CollegesTest;