// Debug script to test frontend-backend connection
console.log('🔍 Starting connection debug...');

async function testConnection() {
    try {
        console.log('🔄 Testing direct backend connection...');
        
        const response = await fetch('http://localhost:3001/api/colleges', {
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Data received:', {
            success: data.success,
            count: data.count,
            totalCount: data.totalCount,
            collegesLength: data.colleges?.length || 0
        });
        
        console.log('🎉 Connection test successful!');
        return data;
        
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        throw error;
    }
}

// Test the connection
testConnection()
    .then(data => {
        console.log('✅ Final result:', data);
    })
    .catch(error => {
        console.error('❌ Final error:', error);
    });
