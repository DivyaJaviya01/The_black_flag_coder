# 🗄️ MongoDB Collection Explorer

A dynamic web-based MongoDB collection explorer for browsing and analyzing your VI database collections with real-time data visualization, schema analysis, and advanced filtering capabilities.

## ✨ Features

- 🔍 **Dynamic Collection Discovery** - Automatically finds all collections in your VI database
- 📊 **Schema Analysis** - Analyzes field types, frequencies, and data structure
- 🔎 **Advanced Filtering** - Search across multiple fields with regex support
- 📄 **Multiple View Modes** - Card view for readability, JSON view for developers
- 📖 **Pagination Support** - Handle large datasets efficiently
- 🔄 **Real-time Sorting** - Sort by any field in ascending/descending order
- 📈 **Statistics Dashboard** - View record counts and field statistics

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js + MongoDB
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Database**: MongoDB Atlas (VI Database)
- **API**: RESTful endpoints with CORS support

## 📋 Prerequisites

Before running the MongoDB Collection Explorer, ensure you have:

- ✅ **Node.js** (v14 or higher)
- ✅ **Python** (for simple HTTP server)
- ✅ **MongoDB Atlas connection** (configured in .env)
- ✅ **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start Guide

### Step 1: Start the Backend Server

```bash
# Navigate to backend directory
cd M-backend

# Start the MongoDB server
node Server.cjs
```

**Expected Output:**
```
✅ Successfully connected to MongoDB Atlas!
🚀 Server is running on http://localhost:3001
🌍 Environment: development
🔗 CORS enabled for: http://localhost:8080
```

### Step 2: Start the Frontend Server

**Option A: Using React+Vite Dev Server (Recommended)**
```bash
# Navigate to frontend directory
cd M-frontend

# Install dependencies (if needed)
npm install

# Start Vite dev server
npm run dev
```

**Expected Output:**
```
VITE v7.1.7  ready in 606 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Option B: Using Python HTTP Server**
```bash
# Navigate to frontend directory
cd M-frontend

# Start Python HTTP server
python -m http.server 8080
```

**Expected Output:**
```
Serving HTTP on :: port 8080 (http://[::]:8080/) ...
```

### Step 3: Access the Collection Explorer

**If using React+Vite (Option A):**
```
http://localhost:5173/
```
*Note: You'll need to add the MongoExplorer component to your React app*

**If using Python HTTP Server (Option B):**
```
http://localhost:8080/collection-explorer.html
```

## 🎯 Available Collections

Your VI database currently contains these collections:
- **Professions** - Career and profession data
- **vishal** - Custom data collection
- **Scholarship** - Scholarship information
- **Tesy** - Test/reference data
- **Courses** - Course information
- **Colleges** - College and university data

## 🔧 API Endpoints

The explorer uses these backend API endpoints:

### Health Check
```
GET /api/health
```
Returns server status and database connection info.

### Get All Collections
```
GET /api/collections
```
Returns list of all collections in the VI database.

### Get Collection Data
```
GET /api/collection/:name?search=term&limit=10&sortBy=field&sortOrder=asc&skip=0
```
Fetches data from a specific collection with optional filtering and pagination.

### Get Collection Schema
```
GET /api/collection/:name/schema?sampleSize=100
```
Analyzes and returns the schema structure of a collection.

## 🎨 How to Use the Explorer

### 1. Collection Navigation
- Click on any collection tab to select it
- Active collection will be highlighted in blue

### 2. Data Loading
- Click **"🔍 Load Data"** to fetch records from selected collection
- Use the **limit dropdown** to control how many records to display

### 3. Search & Filter
- Enter search terms in the **search box**
- Press Enter or click "Load Data" to apply filters
- Search works across all text fields in the collection

### 4. Sorting
- Select a field from the **"Sort By"** dropdown
- Choose **ascending** (↑) or **descending** (↓) order
- Click "Load Data" to apply sorting

### 5. View Modes
- **🃏 Card View** - User-friendly card layout with key-value pairs
- **📄 JSON View** - Raw JSON data for developers
- **🔍 Schema View** - Collection structure analysis

### 6. Schema Analysis
- Click **"📋 Show Schema"** to analyze collection structure
- View field types, frequency, and data patterns
- Understand your data better before querying

## 🔍 Example Queries

### Search for Engineering Colleges
1. Select "Colleges" collection
2. Enter "Engineering" in search box
3. Set limit to 25
4. Click "Load Data"

### Analyze Scholarship Schema
1. Select "Scholarship" collection
2. Click "Show Schema"
3. Review field types and frequencies

### Sort Courses by Name
1. Select "Courses" collection
2. Set "Sort By" to "name"
3. Choose "Ascending" order
4. Click "Load Data"

## 🛠️ Alternative Frontend Options

### Option 1: Python HTTP Server (Recommended)
```bash
cd M-frontend
python -m http.server 8080
# Access: http://localhost:8080/collection-explorer.html
```

### Option 2: React+Vite Integration
```bash
cd M-frontend
npm install
npm run dev
# Access: http://localhost:5173 (after adding React component)
```

### Option 3: Direct File Access
Simply open `collection-explorer.html` in your browser (may have CORS limitations).

## 📊 Statistics & Analytics

The explorer provides real-time statistics:
- **Records Shown** - Current page record count
- **Total Records** - Complete collection size
- **Unique Fields** - Number of different fields
- **Collection Name** - Currently selected collection

## 🔧 Troubleshooting

### npm run dev Error (esbuild version mismatch)
**Problem:** `Cannot start service: Host version "0.25.10" does not match binary version "0.25.9"`

**Solution:**
```bash
# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstall dependencies
npm install

# Try running dev server again
npm run dev
```

### Backend Not Starting
- Check if MongoDB URI is configured in `.env`
- Ensure port 3001 is not in use
- Verify Node.js version (v14+)

### CORS Errors
- Backend is configured for `http://localhost:8080`
- Use the exact URL provided in the guide
- Check browser console for detailed error messages

### No Collections Showing
- Verify MongoDB connection is successful
- Check if VI database exists and has collections
- Review backend logs for database errors

### Search Not Working
- Ensure collection is selected first
- Click "Load Data" after entering search terms
- Check if the field you're searching exists in the data

### Schema Analysis Empty
- Make sure the collection has data
- Some collections might have complex nested structures
- Try with a different collection first

## 🔒 Security Notes

- The explorer is designed for **local development only**
- CORS is configured for localhost origins
- No authentication is implemented (suitable for development)
- Do not expose this setup to public networks

## 📝 Configuration

### Backend Configuration
Backend server settings in `Server.cjs`:
- **Port**: 3001 (configurable via environment)
- **CORS**: Enabled for localhost:8080
- **Database**: VI database on MongoDB Atlas

### Frontend Configuration
Frontend is a static HTML application:
- **API Base**: `http://localhost:3001/api`
- **Port**: 8080 (Python HTTP server)
- **No build process required**

## 🆘 Support

If you encounter issues:

1. **Check Server Logs** - Look at backend terminal for error messages
2. **Verify API Endpoints** - Test `http://localhost:3001/api/health`
3. **Browser Console** - Check for JavaScript errors
4. **Network Tab** - Verify API calls are reaching the backend

## 📈 Future Enhancements

Potential improvements for the explorer:
- [ ] Export data to CSV/JSON
- [ ] Advanced query builder
- [ ] Data visualization charts
- [ ] Real-time data updates
- [ ] User authentication
- [ ] Data editing capabilities
- [ ] Custom field mapping
- [ ] Batch operations

---

## 🎉 Quick Test Commands

To verify everything works, run these commands in separate terminals:

**Terminal 1 (Backend):**
```bash
cd M-backend
node Server.cjs
```

**Terminal 2 (Frontend):**
```bash
cd M-frontend
python -m http.server 8080
```

**Terminal 3 (Verification):**
```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/collections
```

Then open: `http://localhost:8080/collection-explorer.html`

---

**Happy Exploring! 🚀**