# 🚀 Backend Server & Port Management Guide

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Port Management](#port-management)
- [Server Commands](#server-commands)
- [Port Monitoring](#port-monitoring)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

## 🎯 Quick Start

### Prerequisites
- Node.js installed
- MongoDB Atlas connection configured in `.env`
- All dependencies installed: `npm install`

### Start the Server
```bash
# Navigate to backend directory
cd M-backend

# Start server (auto-selects available port)
npm start

# Start with specific port
npm run start:3001

# Start with development monitoring
npm run dev-monitor
```

## 🔧 Port Management

### Available Development Ports
The server supports the following ports in priority order:
- **3000** - Node.js/React Dev (Primary development server)
- **3001** - Backend API (Express.js API server)
- **3002** - Secondary Dev (Alternative development server)
- **3003** - Third Dev Server (Additional development port)
- **4000** - Web Server (Alternative web server)
- **5000** - Express API (Common Express.js port)
- **5173** - Vite Dev Server (Vite development default)
- **5174** - Vite Alt Server (Vite development alternative)
- **8000** - HTTP Server (Standard HTTP server)
- **8001** - Alt HTTP Server (Alternative HTTP server)
- **8080** - Spring/Tomcat (Spring Boot or Tomcat server)

### Manual Port Selection

#### Using npm scripts:
```bash
npm run start:3000    # Start on port 3000
npm run start:3001    # Start on port 3001
npm run start:3002    # Start on port 3002
npm run start:5174    # Start on port 5174
npm run start:8000    # Start on port 8000
npm run start:5000    # Start on port 5000
npm run start:3003    # Start on port 3003
npm run start:8001    # Start on port 8001
npm run start:5173    # Start on port 5173
npm run start:4000    # Start on port 4000
npm run start:8080    # Start on port 8080
```

#### Using command line:
```bash
# Direct port specification
node Server.cjs 3001

# Using environment variable
PORT=3001 npm start

# Using nodemon for development
nodemon Server.cjs 3001
```

## 📊 Port Monitoring

### Built-in Port Status Checker

#### Option 1: Standalone HTML File
```bash
# Open port checker directly
npm run check-ports

# Or manually open
start port-status-checker.html
```

#### Option 2: Web Interface (when server is running)
```bash
# Access via any running server
http://localhost:3000/port-status
http://localhost:3001/port-status
# (Replace with your active port)
```

### Port Checker Features
- **Real-time Status**: Shows which ports are open/closed
- **Auto-refresh**: Checks every 5 seconds automatically
- **Manual Check**: Click "Check All Ports" for immediate update
- **Response Times**: Shows connection speeds
- **Visual Indicators**: Color-coded status (Green=Open, Red=Closed)

## 🛠️ Server Commands

### Development Mode
```bash
# Start with auto-restart on file changes
npm run devStart

# Start with port monitoring
npm run dev-monitor

# Start and open port checker
npm run check-ports && npm run devStart
```

### Production Mode
```bash
# Standard production start
npm start

# Start on specific port
PORT=3001 npm start

# Start with PM2 (if installed)
pm2 start Server.cjs --name "backend-api"
```

### Environment Configuration
```bash
# Set environment variables
NODE_ENV=development npm start
NODE_ENV=production npm start

# With custom MongoDB URI
MONGODB_URI="your-connection-string" npm start

# Enable multi-port mode
MULTI_PORT=true npm start
```

## 🔍 Health Checks & Monitoring

### Health Check Endpoints
```bash
# Basic health check
curl http://localhost:3000/api/health

# Port status API
curl http://localhost:3000/api/port-status

# Get all collections
curl http://localhost:3000/api/collections
```

### Response Example
```json
{
  "status": "OK",
  "timestamp": "2025-10-01T05:18:33.148Z",
  "uptime": 79.8114179,
  "database": "connected",
  "server": {
    "port": "3000",
    "name": "Node.js/React Dev",
    "description": "Primary development server",
    "isDevelopmentPort": true
  },
  "environment": "development",
  "version": "2.0.0"
}
```

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Error: EADDRINUSE
# Solution: Server will auto-try next available port
# Or manually specify different port:
npm run start:3002
```

#### Database Connection Issues
```bash
# Check .env file has MONGODB_URI
# Verify MongoDB Atlas connection
# Check firewall/network settings
```

#### CORS Issues
```bash
# Server has CORS enabled for all localhost origins
# If issues persist, check browser console
# Verify origin matches localhost pattern
```

### Force Stop All Node Processes
```powershell
# Windows PowerShell
Stop-Process -Name "node" -Force

# Or find specific process
Get-Process -Name "node"
Stop-Process -Id [PROCESS_ID]
```

```bash
# Linux/Mac
pkill node

# Or find and kill specific port
lsof -ti:3001 | xargs kill
```

### Check What's Using a Port
```powershell
# Windows
netstat -ano | findstr :3001

# Linux/Mac
lsof -i :3001
```

## ⚡ Advanced Usage

### Multiple Server Instances
```bash
# Terminal 1: Start on port 3001
npm run start:3001

# Terminal 2: Start on port 3002
npm run start:3002

# Terminal 3: Monitor all ports
npm run check-ports
```

### Custom Configuration
```bash
# Create custom start script
node Server.cjs 5555

# With environment variables
NODE_ENV=staging PORT=4000 node Server.cjs
```

### Development Workflow
```bash
# 1. Check available ports
npm run check-ports

# 2. Start server with monitoring
npm run dev-monitor

# 3. In another terminal, start frontend
cd ../M-frontend
npm run dev

# 4. Monitor both in port checker
```

### API Testing
```bash
# Test specific endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/collections
curl "http://localhost:3000/api/data?limit=5"
curl http://localhost:3000/api/colleges/locations
```

## 📝 Environment Variables

Create a `.env` file in the M-backend directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
MULTI_PORT=false
```

## 🔄 Restart & Reload

### Graceful Restart
```bash
# Ctrl+C to stop server gracefully
# Then restart with:
npm start
```

### Auto-reload Development
```bash
# Use nodemon for auto-restart on file changes
npm run devStart

# Or install globally and use
npm install -g nodemon
nodemon Server.cjs
```

## 📊 Monitoring Dashboard

The port status checker provides:
- **Live Status**: Real-time port availability
- **Statistics**: Open/closed port counts
- **Response Times**: Connection speed metrics
- **Auto-refresh**: Continuous monitoring
- **Service Info**: What each port is typically used for

## 🎯 Best Practices

1. **Always check ports** before starting development
2. **Use specific port scripts** for consistent environments
3. **Monitor database connections** via health checks
4. **Keep port checker open** during development
5. **Use environment variables** for configuration
6. **Gracefully shutdown** servers with Ctrl+C

## 🆘 Quick Commands Reference

```bash
# Essential Commands
npm start                    # Start server (auto port)
npm run devStart            # Development mode with auto-restart
npm run check-ports         # Open port status checker
npm run dev-monitor         # Start server + port monitor

# Port-specific starts
npm run start:3001          # Backend API
npm run start:3000          # React Dev
npm run start:5173          # Vite Dev

# Health checks
curl localhost:3000/api/health
curl localhost:3000/port-status

# Emergency stop
Ctrl+C                      # Graceful stop
Stop-Process -Name "node" -Force  # Force stop all
```

---

**💡 Tip**: Keep this guide bookmarked and the port checker open while developing for the smoothest experience!