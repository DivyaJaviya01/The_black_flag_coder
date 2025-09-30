// Test script to verify API connection from frontend context
console.log('🧪 Testing API connection from frontend context...');

async function testAPIConnection() {
    try {
        console.log('🔄 Making request to http://localhost:3001/api/colleges');
        
        const response = await fetch('http://localhost:3001/api/colleges', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        console.log('📥 Response received:', {
            status: response.status,
            ok: response.ok,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ API Test Successful:', {
            success: data.success,
            count: data.count,
            totalCount: data.totalCount,
            collegesLength: data.colleges?.length || 0
        });
        
        return data;
    } catch (error) {
        console.error('❌ API Test Failed:', error);
        throw error;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testAPIConnection };
} else {
    // Make available globally
    window.testAPIConnection = testAPIConnection;
}

// Auto-run test if this script is loaded directly
if (typeof window !== 'undefined') {
    console.log('🚀 Auto-running API test...');
    testAPIConnection()
        .then(data => {
            console.log('🎉 API connection test completed successfully!');
            console.log('📊 Data summary:', {
                colleges: data.colleges?.length || 0,
                total: data.totalCount || 0
            });
        })
        .catch(error => {
            console.error('💥 API connection test failed:', error);
        });
}