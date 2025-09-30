// Browser Console Test for Frontend-Backend Connection
// Copy and paste this into the browser console on http://localhost:5173/colleges

console.log('🔍 Starting browser console test...');

async function testFrontendBackendConnection() {
    try {
        console.log('🔄 Testing backend connection from frontend...');
        
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
        
        console.log('🎉 Frontend-Backend connection test successful!');
        console.log('📊 Sample college data:', data.colleges?.[0]);
        
        return data;
        
    } catch (error) {
        console.error('❌ Frontend-Backend connection test failed:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        throw error;
    }
}

// Run the test
testFrontendBackendConnection()
    .then(data => {
        console.log('✅ Test completed successfully!');
        console.log('📋 Full data:', data);
    })
    .catch(error => {
        console.error('❌ Test failed:', error);
    });

// Also test the Vite proxy
async function testViteProxy() {
    try {
        console.log('🔄 Testing Vite proxy...');
        
        const response = await fetch('/api/colleges', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        console.log('📥 Proxy response received:', {
            status: response.status,
            ok: response.ok,
            statusText: response.statusText
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Proxy data received:', {
            success: data.success,
            count: data.count,
            totalCount: data.totalCount,
            collegesLength: data.colleges?.length || 0
        });
        
        console.log('🎉 Vite proxy test successful!');
        return data;
        
    } catch (error) {
        console.error('❌ Vite proxy test failed:', error);
        throw error;
    }
}

// Run proxy test
testViteProxy()
    .then(data => {
        console.log('✅ Proxy test completed successfully!');
    })
    .catch(error => {
        console.error('❌ Proxy test failed:', error);
    });
