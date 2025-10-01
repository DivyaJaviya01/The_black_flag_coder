#!/usr/bin/env node

/**
 * Port Connectivity Test Suite
 * Tests connectivity for all ports used in the M-frontend and M-backend application
 */

const net = require('net');
const http = require('http');
const https = require('https');

// Configuration
const CONFIG = {
  // Frontend ports (from vite.config.js)
  frontend: {
    dev: 5173,
    preview: 4173
  },
  
  // Backend ports (from package.json and Server.cjs)
  backend: [3000, 3001, 3002, 5174, 8000, 5000, 3003, 8001, 5173, 4000, 8080],
  
  // Common database ports
  database: {
    mongodb: 27017,
    mongoExpress: 8081
  },
  
  // Test configuration
  timeout: 5000, // 5 seconds timeout
  retries: 3,
  host: 'localhost'
};

// ANSI color codes for better output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test results storage
const testResults = {
  passed: [],
  failed: [],
  warnings: [],
  summary: {}
};

/**
 * Check if a port is listening (TCP connection test)
 */
function checkPortListening(host, port, timeout = 3000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let isResolved = false;
    
    const cleanup = () => {
      if (!isResolved) {
        isResolved = true;
        socket.destroy();
      }
    };
    
    socket.setTimeout(timeout);
    
    socket.on('connect', () => {
      cleanup();
      resolve({ success: true, port, message: 'Port is listening' });
    });
    
    socket.on('timeout', () => {
      cleanup();
      resolve({ success: false, port, message: 'Connection timeout' });
    });
    
    socket.on('error', (err) => {
      cleanup();
      resolve({ success: false, port, message: err.message });
    });
    
    try {
      socket.connect(port, host);
    } catch (err) {
      cleanup();
      resolve({ success: false, port, message: err.message });
    }
  });
}

/**
 * Check HTTP/HTTPS connectivity and response
 */
function checkHttpConnectivity(host, port, timeout = 5000, useHttps = false) {
  return new Promise((resolve) => {
    const protocol = useHttps ? https : http;
    const url = `${useHttps ? 'https' : 'http'}://${host}:${port}/`;
    
    const req = protocol.get(url, { timeout }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          success: true,
          port,
          statusCode: res.statusCode,
          headers: res.headers,
          message: `HTTP ${res.statusCode} - ${res.statusMessage}`
        });
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, port, message: 'HTTP request timeout' });
    });
    
    req.on('error', (err) => {
      resolve({ success: false, port, message: `HTTP error: ${err.message}` });
    });
    
    req.setTimeout(timeout);
  });
}

/**
 * Test API endpoint connectivity
 */
function checkApiEndpoint(host, port, endpoint = '/api/health', timeout = 5000) {
  return new Promise((resolve) => {
    const url = `http://${host}:${port}${endpoint}`;
    
    const req = http.get(url, { timeout }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            success: true,
            port,
            endpoint,
            statusCode: res.statusCode,
            data: jsonData,
            message: `API endpoint responding: ${res.statusCode}`
          });
        } catch (err) {
          resolve({
            success: res.statusCode === 200,
            port,
            endpoint,
            statusCode: res.statusCode,
            message: `Non-JSON response: ${res.statusCode}`
          });
        }
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, port, endpoint, message: 'API request timeout' });
    });
    
    req.on('error', (err) => {
      resolve({ success: false, port, endpoint, message: `API error: ${err.message}` });
    });
    
    req.setTimeout(timeout);
  });
}

/**
 * Format and print test result
 */
function printResult(result, testType) {
  const timestamp = new Date().toISOString();
  const status = result.success ? '✅ PASS' : '❌ FAIL';
  const color = result.success ? colors.green : colors.red;
  
  console.log(`${color}${status}${colors.reset} [${testType}] Port ${result.port}: ${result.message}`);
  
  if (result.statusCode) {
    console.log(`     ${colors.cyan}└─ HTTP ${result.statusCode}${colors.reset}`);
  }
  
  if (result.endpoint) {
    console.log(`     ${colors.cyan}└─ Endpoint: ${result.endpoint}${colors.reset}`);
  }
  
  // Store result
  if (result.success) {
    testResults.passed.push({ ...result, testType, timestamp });
  } else {
    testResults.failed.push({ ...result, testType, timestamp });
  }
}

/**
 * Run comprehensive port tests
 */
async function runPortTests() {
  console.log(`${colors.bold}${colors.blue}🚀 Starting Port Connectivity Tests${colors.reset}\n`);
  console.log(`${colors.cyan}Host: ${CONFIG.host}${colors.reset}`);
  console.log(`${colors.cyan}Timeout: ${CONFIG.timeout}ms${colors.reset}\n`);
  
  // Test 1: Frontend Development Server
  console.log(`${colors.bold}${colors.yellow}📱 Testing Frontend Ports${colors.reset}`);
  
  const frontendResult = await checkPortListening(CONFIG.host, CONFIG.frontend.dev, CONFIG.timeout);
  printResult(frontendResult, 'Frontend-TCP');
  
  if (frontendResult.success) {
    const httpResult = await checkHttpConnectivity(CONFIG.host, CONFIG.frontend.dev, CONFIG.timeout);
    printResult(httpResult, 'Frontend-HTTP');
  }
  
  console.log();
  
  // Test 2: Backend Servers
  console.log(`${colors.bold}${colors.yellow}🖥️  Testing Backend Ports${colors.reset}`);
  
  for (const port of CONFIG.backend) {
    const tcpResult = await checkPortListening(CONFIG.host, port, CONFIG.timeout);
    printResult(tcpResult, 'Backend-TCP');
    
    if (tcpResult.success) {
      // Test HTTP connectivity
      const httpResult = await checkHttpConnectivity(CONFIG.host, port, CONFIG.timeout);
      printResult(httpResult, 'Backend-HTTP');
      
      // Test API health endpoint if HTTP is working
      if (httpResult.success) {
        const apiResult = await checkApiEndpoint(CONFIG.host, port, '/api/health', CONFIG.timeout);
        printResult(apiResult, 'Backend-API');
      }
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log();
  
  // Test 3: Database Ports
  console.log(`${colors.bold}${colors.yellow}🗄️  Testing Database Ports${colors.reset}`);
  
  const mongoResult = await checkPortListening(CONFIG.host, CONFIG.database.mongodb, CONFIG.timeout);
  printResult(mongoResult, 'Database-MongoDB');
  
  const mongoExpressResult = await checkPortListening(CONFIG.host, CONFIG.database.mongoExpress, CONFIG.timeout);
  printResult(mongoExpressResult, 'Database-MongoExpress');
  
  console.log();
}

/**
 * Check for port conflicts
 */
function checkPortConflicts() {
  console.log(`${colors.bold}${colors.yellow}⚠️  Checking for Port Conflicts${colors.reset}`);
  
  const allPorts = [
    CONFIG.frontend.dev,
    CONFIG.frontend.preview,
    ...CONFIG.backend,
    CONFIG.database.mongodb,
    CONFIG.database.mongoExpress
  ];
  
  const portCounts = {};
  const conflicts = [];
  
  allPorts.forEach(port => {
    portCounts[port] = (portCounts[port] || 0) + 1;
    if (portCounts[port] > 1) {
      conflicts.push(port);
    }
  });
  
  if (conflicts.length > 0) {
    conflicts.forEach(port => {
      console.log(`${colors.red}❌ CONFLICT${colors.reset} Port ${port} is configured multiple times`);
      testResults.warnings.push({
        type: 'conflict',
        port,
        message: `Port ${port} has multiple configurations`
      });
    });
  } else {
    console.log(`${colors.green}✅ No port conflicts detected${colors.reset}`);
  }
  
  console.log();
}

/**
 * Generate test summary
 */
function generateSummary() {
  const total = testResults.passed.length + testResults.failed.length;
  const passRate = total > 0 ? ((testResults.passed.length / total) * 100).toFixed(1) : 0;
  
  testResults.summary = {
    total,
    passed: testResults.passed.length,
    failed: testResults.failed.length,
    warnings: testResults.warnings.length,
    passRate: `${passRate}%`,
    timestamp: new Date().toISOString()
  };
  
  console.log(`${colors.bold}${colors.blue}📊 Test Summary${colors.reset}`);
  console.log(`${colors.cyan}Total Tests: ${total}${colors.reset}`);
  console.log(`${colors.green}Passed: ${testResults.passed.length}${colors.reset}`);
  console.log(`${colors.red}Failed: ${testResults.failed.length}${colors.reset}`);
  console.log(`${colors.yellow}Warnings: ${testResults.warnings.length}${colors.reset}`);
  console.log(`${colors.white}Pass Rate: ${passRate}%${colors.reset}`);
  
  if (testResults.failed.length > 0) {
    console.log(`\n${colors.bold}${colors.red}❌ Failed Tests:${colors.reset}`);
    testResults.failed.forEach(result => {
      console.log(`   • Port ${result.port} (${result.testType}): ${result.message}`);
    });
  }
  
  if (testResults.warnings.length > 0) {
    console.log(`\n${colors.bold}${colors.yellow}⚠️  Warnings:${colors.reset}`);
    testResults.warnings.forEach(warning => {
      console.log(`   • ${warning.message}`);
    });
  }
}

/**
 * Save results to JSON file
 */
function saveResults() {
  const fs = require('fs');
  const filename = `port-test-results-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  
  try {
    fs.writeFileSync(filename, JSON.stringify(testResults, null, 2));
    console.log(`\n${colors.cyan}📄 Results saved to: ${filename}${colors.reset}`);
  } catch (err) {
    console.log(`\n${colors.red}❌ Failed to save results: ${err.message}${colors.reset}`);
  }
}

/**
 * Display usage information
 */
function showUsage() {
  console.log(`${colors.bold}Port Connectivity Test Suite${colors.reset}
  
Usage: node port-connectivity-test.js [options]

Options:
  --help, -h        Show this help message
  --json            Save results to JSON file
  --host HOST       Set target host (default: localhost)
  --timeout MS      Set timeout in milliseconds (default: 5000)

Tests performed:
  • TCP connectivity to all configured ports
  • HTTP connectivity for web servers
  • API endpoint health checks
  • Port conflict detection

Ports tested:
  • Frontend: ${CONFIG.frontend.dev} (Vite dev server)
  • Backend: ${CONFIG.backend.join(', ')}
  • Database: ${CONFIG.database.mongodb} (MongoDB), ${CONFIG.database.mongoExpress} (Mongo Express)
`);
}

/**
 * Main execution function
 */
async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  if (args.includes('--help') || args.includes('-h')) {
    showUsage();
    return;
  }
  
  const hostIndex = args.indexOf('--host');
  if (hostIndex !== -1 && args[hostIndex + 1]) {
    CONFIG.host = args[hostIndex + 1];
  }
  
  const timeoutIndex = args.indexOf('--timeout');
  if (timeoutIndex !== -1 && args[timeoutIndex + 1]) {
    CONFIG.timeout = parseInt(args[timeoutIndex + 1]) || CONFIG.timeout;
  }
  
  const saveJson = args.includes('--json');
  
  try {
    console.log(`${colors.bold}${colors.cyan}🔍 Port Connectivity Test Suite${colors.reset}`);
    console.log(`${colors.cyan}Testing connectivity for M-frontend and M-backend application${colors.reset}\n`);
    
    // Run tests
    await runPortTests();
    checkPortConflicts();
    generateSummary();
    
    if (saveJson) {
      saveResults();
    }
    
    console.log(`\n${colors.bold}${colors.green}✅ Port connectivity tests completed!${colors.reset}`);
    
    // Exit with error code if any tests failed
    process.exit(testResults.failed.length > 0 ? 1 : 0);
    
  } catch (error) {
    console.error(`${colors.red}❌ Test suite error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error(`${colors.red}❌ Uncaught Exception: ${err.message}${colors.reset}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`${colors.red}❌ Unhandled Rejection at:${colors.reset}`, promise, `${colors.red}reason:${colors.reset}`, reason);
  process.exit(1);
});

// Run the main function
if (require.main === module) {
  main();
}

module.exports = {
  checkPortListening,
  checkHttpConnectivity,
  checkApiEndpoint,
  CONFIG
};