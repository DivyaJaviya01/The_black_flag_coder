// Frontend API Test - Simulating the exact same call as Colleges.jsx
const testFrontendAPI = async () => {
    console.log('🚀 Testing frontend API call...');
    
    try {
        const params = new URLSearchParams();
        params.append('limit', '5');
        
        const response = await fetch(`http://localhost:3001/api/colleges?${params.toString()}`);
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            throw new Error(`Failed to fetch colleges from database: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Success! Data received:', {
            success: data.success,
            count: data.count,
            totalCount: data.totalCount,
            colleges: data.colleges?.length || 0,
            firstCollege: data.colleges?.[0]?.name || 'N/A'
        });
        
        return data;
    } catch (err) {
        console.error('❌ API Error:', err.message);
        throw err;
    }
};

// Run the test
testFrontendAPI();