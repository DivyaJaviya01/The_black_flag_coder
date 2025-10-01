# Port Connectivity Testing Suite

This repository includes comprehensive port connectivity testing tools to verify that all ports used by the M-frontend and M-backend applications are accessible and functioning correctly.

## 🎯 What Gets Tested

### Frontend Ports
- **5173** - Vite development server (default)
- **4173** - Vite preview server

### Backend Ports
The backend server tries multiple ports in order:
- **3000, 3001, 3002** - Primary backend ports
- **5174** - Alternative port
- **8000, 5000** - Common server ports
- **3003, 8001** - Additional backend ports
- **5173** - Shared with frontend
- **4000, 8080** - Standard web server ports

### Database Ports
- **27017** - MongoDB default port
- **8081** - Mongo Express web interface

## 🛠️ Available Test Tools

### 1. Web-based Test Suite (Recommended) ⭐
**File:** `port-connectivity-test.html`

Features:
- ✅ Beautiful web interface with real-time results
- ✅ Visual progress tracking and status indicators
- ✅ Interactive controls and configuration options
- ✅ Live test logs and detailed results
- ✅ JSON export functionality
- ✅ Cross-platform browser compatibility
- ✅ Real-time HTTP/WebSocket connectivity testing
- ✅ Port conflict detection with warnings
- ✅ Responsive design for mobile devices

### 2. Node.js Test Suite (CLI)
**File:** `port-connectivity-test.js`

Features:
- ✅ TCP connectivity testing
- ✅ HTTP response validation
- ✅ API endpoint health checks
- ✅ Port conflict detection
- ✅ Colored console output
- ✅ JSON result export
- ✅ Cross-platform compatibility

### 3. PowerShell Test Suite (Windows)
**File:** `port-connectivity-test.ps1`

Features:
- ✅ TCP connectivity testing
- ✅ HTTP response validation
- ✅ Port conflict detection
- ✅ PowerShell native implementation
- ✅ JSON result export

## 🚀 How to Run Tests

### Method 1: Web Interface (Recommended) 🌐

Simply open the HTML file in your browser:

```bash
# Option 1: Double-click the file
port-connectivity-test.html

# Option 2: Using npm scripts
cd M-backend
npm run test:ports:web

# Option 3: Using browser directly
# Navigate to: file:///path/to/your/project/port-connectivity-test.html
```

**Web Interface Features:**
- 🎯 Select test scope (All, Frontend, Backend, Database)
- ⚙️ Configure hostname and timeout settings
- 📈 Real-time progress tracking
- 📊 Visual results with color-coded status
- 📋 Export results to JSON
- 📜 Live test logs

### Method 2: Using npm scripts (CLI)

From the M-backend directory:
```bash
cd M-backend
npm run test:ports           # Run basic port tests
npm run test:ports:json      # Run tests and save results to JSON
```

From the M-frontend directory:
```bash
cd M-frontend
npm run test:ports           # Run basic port tests
npm run test:ports:json      # Run tests and save results to JSON
```

### Method 3: Direct execution

#### Node.js version:
```bash
# Basic test
node port-connectivity-test.js

# Advanced options
node port-connectivity-test.js --host localhost --timeout 10000 --json

# Show help
node port-connectivity-test.js --help
```

#### PowerShell version (Windows):
```powershell
# Basic test
.\port-connectivity-test.ps1

# Advanced options
.\port-connectivity-test.ps1 -Host localhost -Timeout 10000 -SaveJson

# Show help
.\port-connectivity-test.ps1 -Help
```

## 📊 Test Types Performed

### 1. TCP Connectivity Test
- Verifies if ports are listening and accepting connections
- Tests socket connectivity with configurable timeout
- Identifies network-level blocking issues

### 2. HTTP Connectivity Test
- Tests HTTP protocol responses on web server ports
- Validates HTTP status codes
- Detects web server availability

### 3. API Health Check Test
- Tests `/api/health` endpoint on backend ports
- Validates JSON API responses
- Confirms backend application functionality

### 4. Port Conflict Detection
- Identifies duplicate port configurations
- Warns about potential conflicts
- Ensures clean port allocation

## 📋 Sample Output

```
🚀 Starting Port Connectivity Tests

Host: localhost
Timeout: 5000ms

📱 Testing Frontend Ports
✅ PASS [Frontend-TCP] Port 5173: Port is listening
✅ PASS [Frontend-HTTP] Port 5173: HTTP 200 - OK

🖥️  Testing Backend Ports
❌ FAIL [Backend-TCP] Port 3000: Connection timeout
❌ FAIL [Backend-TCP] Port 3001: Connection timeout
✅ PASS [Backend-TCP] Port 5174: Port is listening
✅ PASS [Backend-HTTP] Port 5174: HTTP 200 - OK
✅ PASS [Backend-API] Port 5174: API endpoint responding: 200

🗄️  Testing Database Ports
❌ FAIL [Database-MongoDB] Port 27017: Connection timeout
❌ FAIL [Database-MongoExpress] Port 8081: Connection timeout

⚠️  Checking for Port Conflicts
✅ No port conflicts detected

📊 Test Summary
Total Tests: 8
Passed: 4
Failed: 4
Warnings: 0
Pass Rate: 50.0%
```

## 🔧 Command Line Options

### Node.js Version Options

| Option | Description | Example |
|--------|-------------|---------|
| `--help, -h` | Show help message | `node port-connectivity-test.js --help` |
| `--host HOST` | Set target host | `node port-connectivity-test.js --host 192.168.1.100` |
| `--timeout MS` | Set timeout in milliseconds | `node port-connectivity-test.js --timeout 10000` |
| `--json` | Save results to JSON file | `node port-connectivity-test.js --json` |

### PowerShell Version Options

| Parameter | Description | Example |
|-----------|-------------|---------|
| `-Help` | Show help message | `.\port-connectivity-test.ps1 -Help` |
| `-Host` | Set target host | `.\port-connectivity-test.ps1 -Host "192.168.1.100"` |
| `-Timeout` | Set timeout in milliseconds | `.\port-connectivity-test.ps1 -Timeout 10000` |
| `-SaveJson` | Save results to JSON file | `.\port-connectivity-test.ps1 -SaveJson` |

## 📈 Understanding Results

### Test Status Indicators
- ✅ **PASS** - Port is accessible and responding correctly
- ❌ **FAIL** - Port is not accessible or not responding
- ⚠️ **WARNING** - Configuration issue detected

### Common Failure Reasons
1. **Connection timeout** - Service not running on that port
2. **Connection refused** - Port blocked or service down
3. **HTTP error** - Service running but not responding to HTTP
4. **API error** - HTTP working but API endpoint issues

### Exit Codes
- `0` - All tests passed
- `1` - One or more tests failed

## 🔍 Troubleshooting

### If Backend Ports Fail
1. Check if the backend server is running:
   ```bash
   cd M-backend
   npm run start
   ```

2. Verify environment variables:
   - Check `.env` file exists
   - Verify `MONGODB_URI` is set
   - Confirm `PORT` environment variable

3. Check logs for startup errors

### If Frontend Port Fails
1. Start the development server:
   ```bash
   cd M-frontend
   npm run dev
   ```

2. Check for port conflicts
3. Verify Vite configuration in `vite.config.js`

### If Database Ports Fail
1. Ensure MongoDB is running (if using local instance)
2. Check MongoDB Atlas connectivity (if using cloud)
3. Verify network connectivity
4. Check firewall settings

## 📁 Generated Files

When using `--json` or `-SaveJson` options, the test will generate:
- `port-test-results-[timestamp].json` - Complete test results in JSON format

The JSON file contains:
- Individual test results
- Summary statistics
- Timestamps
- Detailed error messages
- Port configuration information

## 🔄 Integration with CI/CD

You can integrate these tests into your CI/CD pipeline:

```yaml
# Example GitHub Actions step
- name: Test Port Connectivity
  run: |
    cd M-backend
    npm run test:ports
```

The tests return proper exit codes for automation:
- Exit code 0: All tests passed
- Exit code 1: One or more tests failed

## 📝 Customization

To test additional ports, modify the `CONFIG` object in the test files:

```javascript
// In port-connectivity-test.js
const CONFIG = {
  frontend: {
    dev: 5173,
    preview: 4173,
    // Add your custom ports here
    custom: 9000
  },
  backend: [3000, 3001, /* add more ports */],
  // ... rest of config
};
```

## 🤝 Contributing

To add new test types or improve existing ones:

1. Fork the repository
2. Add your test function
3. Update the documentation
4. Submit a pull request

## 📞 Support

If you encounter issues with the port testing suite:

1. Check this README for troubleshooting steps
2. Verify your network configuration
3. Ensure all dependencies are installed
4. Check for any firewall or antivirus blocking

---

## 📄 License

This port testing suite is part of the M-frontend/M-backend project and follows the same license terms.