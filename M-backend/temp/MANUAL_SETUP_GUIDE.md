# 🚀 Manual Setup Guide: Frontend & Backend

This guide provides step-by-step instructions to manually run both the frontend and backend servers for the M-frontend and M-backend application.

## 📋 Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- **MongoDB Atlas Account** (for database access)

## 🗂️ Project Structure Overview

```
The_black_flag_coder/
├── M-backend/          # Express.js backend server
│   ├── Server.cjs      # Main server file
│   ├── package.json    # Backend dependencies
│   └── .env           # Environment variables (MongoDB URI)
├── M-frontend/         # React frontend application
│   ├── src/           # Source code
│   ├── package.json   # Frontend dependencies
│   └── vite.config.js # Vite configuration
└── port-connectivity-test.* # Port testing tools
```

---

## 🖥️ Backend Setup (M-backend)

### Step 1: Navigate to Backend Directory
```bash
cd M-backend
```

### Step 2: Verify Environment Configuration
Ensure your `.env` file exists and contains:
```env
MONGODB_URI=mongodb+srv://your-connection-string
NODE_ENV=development
PORT=5173
CORS_ORIGIN=http://localhost:5175
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Available Backend Ports
The backend server can run on multiple ports. Choose one of the following:

#### Option A: Start on Port 5173 (Recommended)
```bash
npm run start:5173
```

#### Option B: Start on Port 3001 (Alternative)
```bash
npm run start:3001
```

#### Option C: Auto-select from Preferred Ports
```bash
npm start
```
This will try ports in this order: `[3000, 3001, 3002, 5174, 8000, 5000, 3003, 8001, 5173, 4000, 8080]`

#### Option D: Direct Node Command
```bash
node Server.cjs 5173
```

### Step 5: Verify Backend is Running
You should see output similar to:
```
🚀 Starting server...
🎯 Requested port: 5173
📋 Environment: development
✅ Successfully connected to MongoDB Atlas!
🎯 Trying requested port: 5173
✅ Server running on http://localhost:5173
📊 Database: Connected to MongoDB Atlas
🔗 CORS: Enabled for localhost origins
🎉 Ready to serve requests!
```

### Step 6: Test Backend API
Open a new terminal and test the health endpoint:
```bash
curl http://localhost:5173/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-10-01T03:19:42.396Z",
  "uptime": 31.0370584,
  "database": "connected"
}
```

---

## 📱 Frontend Setup (M-frontend)

### Step 1: Open New Terminal
**Important**: Keep the backend terminal running and open a new terminal window.

### Step 2: Navigate to Frontend Directory
```bash
cd M-frontend
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Verify Vite Configuration
Check `vite.config.js` to ensure proper proxy configuration:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,          // Frontend port
    host: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5173',  // Backend port
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
```

### Step 5: Start Frontend Development Server
```bash
npm run dev
```

### Step 6: Verify Frontend is Running
You should see output similar to:
```
Port 5174 is in use, trying another one...
  VITE v7.1.7  ready in 542 ms
  ➜  Local:   http://localhost:5175/
  ➜  Network: http://10.112.223.52:5175/
  ➜  press h + enter to show help
```

**Note**: Vite will automatically find the next available port if 5174 is busy.

### Step 7: Test Frontend-Backend Connection
Test the proxy by accessing the API through the frontend:
```bash
curl http://localhost:5175/api/health
```

---

## ✅ Verification & Testing

### Step 1: Manual Port Connectivity Test
Run the port connectivity test to verify both services:
```bash
node port-connectivity-test.js
```

### Step 2: Web-based Port Test
Open the HTML test interface:
```bash
start port-connectivity-test.html
```

### Step 3: Access Your Application
Open your browser and navigate to:
- **Frontend Application**: `http://localhost:5175`
- **Backend API**: `http://localhost:5173`

---

## 🔧 Troubleshooting

### Backend Issues

#### Problem: "Port already in use"
**Solution**: Try a different port or kill existing processes
```bash
# Try alternative port
npm run start:3001

# Or kill Node processes (Windows)
taskkill /f /im node.exe

# Or kill Node processes (macOS/Linux)
pkill node
```

#### Problem: "Failed to connect to MongoDB"
**Solution**: Check your `.env` file and MongoDB Atlas connection
```bash
# Verify .env file exists
ls -la .env

# Test MongoDB connection string
# Ensure your IP is whitelisted in MongoDB Atlas
```

#### Problem: "CORS error"
**Solution**: Verify CORS configuration in `Server.cjs`
- Ensure your frontend URL is allowed
- Check the CORS middleware settings

### Frontend Issues

#### Problem: "[vite] http proxy error"
**Solution**: 
1. Ensure backend is running first
2. Check `vite.config.js` proxy target matches backend port
3. Restart frontend development server

#### Problem: "Network Error" when fetching data
**Solution**:
1. Check if backend API is accessible:
   ```bash
   curl http://localhost:5173/api/health
   ```
2. Verify `src/config/api.js` has correct BASE_URL
3. Check browser developer tools for detailed error messages

#### Problem: "Module not found" errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Port Conflicts

#### Problem: Multiple services trying to use same port
**Solution**: Use the port separation approach
- **Backend**: Port 5173
- **Frontend**: Port 5175 (or next available)

---

## 🎯 Quick Start Commands

### Terminal 1 (Backend):
```bash
cd M-backend
npm run start:5173
```

### Terminal 2 (Frontend):
```bash
cd M-frontend
npm run dev
```

### Terminal 3 (Testing):
```bash
# Test connectivity
node port-connectivity-test.js

# Access application
start http://localhost:5175
```

---

## 📊 Expected Port Configuration

| Service | Port | URL | Status |
|---------|------|-----|--------|
| Backend API | 5173 | http://localhost:5173 | ✅ Running |
| Frontend Dev | 5175 | http://localhost:5175 | ✅ Running |
| MongoDB | 27017 | localhost:27017 | ✅ Connected (Atlas) |

---

## 🔗 Additional Resources

### Package.json Scripts Reference

**Backend (M-backend/package.json):**
```json
{
  "scripts": {
    "start": "node Server.cjs",
    "start:5173": "node Server.cjs 5173",
    "start:3001": "node Server.cjs 3001",
    "devStart": "nodemon Server.cjs",
    "test:ports": "node ../port-connectivity-test.js",
    "test:ports:web": "start ../port-connectivity-test.html"
  }
}
```

**Frontend (M-frontend/package.json):**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test:ports": "node ../port-connectivity-test.js",
    "test:ports:web": "start ../port-connectivity-test.html"
  }
}
```

### API Endpoints Available

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server health check |
| `/api/collections` | GET | List all database collections |
| `/api/collection/:name` | GET | Get specific collection data |

### Environment Variables

Create a `.env` file in the M-backend directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NODE_ENV=development
PORT=5173
CORS_ORIGIN=http://localhost:5175
```

---

## 🚨 Important Notes

1. **Always start the backend first** before starting the frontend
2. **Keep both terminals running** during development
3. **Check port availability** before starting services
4. **Verify MongoDB Atlas connection** and IP whitelist
5. **Use the port connectivity tests** to diagnose issues
6. **The frontend proxy configuration** must match the backend port

---

## 🎉 Success Indicators

You know everything is working correctly when:

- ✅ Backend shows "Ready to serve requests!" message
- ✅ Frontend shows Vite server ready with local URL
- ✅ `curl http://localhost:5175/api/health` returns JSON response
- ✅ Browser can access the frontend application
- ✅ No console errors in browser developer tools
- ✅ Port connectivity test shows high pass rate

---

**Happy Coding! 🚀**

If you encounter any issues not covered in this guide, refer to the port connectivity testing tools or check the application logs for more detailed error messages.