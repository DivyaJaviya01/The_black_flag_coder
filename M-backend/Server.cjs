// server.js

// 1. Import Dependencies
require("dotenv").config(); // Loads environment variables from .env file
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// 2. Setup App and Middleware
const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// Configure CORS with environment-specific origin
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Middleware to parse JSON bodies with size limit

// 3. Setup MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

const client = new MongoClient(mongoUri);
let db; // Variable to hold the database connection

// Async function to connect to the database
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas!");
    // Specify the database you want to use
    db = client.db("VI");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB Atlas:", err);
    process.exit(1);
  }
}

// Graceful shutdown function
async function gracefulShutdown() {
  console.log("\n🔄 Shutting down gracefully...");
  try {
    if (client) {
      await client.close();
      console.log("✅ MongoDB connection closed.");
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during shutdown:", err);
    process.exit(1);
  }
}

// Handle shutdown signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// 4. Middleware for request validation
function validateApiRequest(req, res, next) {
  // Add request logging
  console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  
  // Add any specific validation logic here
  if (req.query.limit && (isNaN(req.query.limit) || req.query.limit < 0)) {
    return res.status(400).json({
      success: false,
      message: "Invalid limit parameter. Must be a positive number."
    });
  }
  
  next();
}

// 5. Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: db ? "connected" : "disconnected"
  });
});

// 6. Define the API Endpoints

// Get all colleges with optional filtering
app.get("/api/data", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const { limit, search, sortBy, sortOrder } = req.query;
    const collection = db.collection("Colleges");
    
    // Build query filter
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { "name": { $regex: search, $options: "i" } },
          { "location": { $regex: search, $options: "i" } }
        ]
      };
    }
    
    // Build sort options
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    
    // Execute query
    let query = collection.find(filter);
    if (Object.keys(sortOptions).length > 0) {
      query = query.sort(sortOptions);
    }
    if (limit && !isNaN(limit)) {
      query = query.limit(parseInt(limit));
    }
    
    const data = await query.toArray();
    
    console.log(`✅ Data successfully fetched: ${data.length} records`);
    res.json({
      success: true,
      count: data.length,
      filter: search ? { search } : {},
      data: data
    });
  } catch (err) {
    console.error("❌ Failed to fetch data:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching data from database",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Get colleges by location
app.get("/api/colleges/location/:location", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const { location } = req.params;
    const collection = db.collection("Colleges");
    const data = await collection.find({ "location": { $regex: location, $options: "i" } }).toArray();
    
    console.log(`✅ Colleges in ${location}: ${data.length} records`);
    res.json({
      success: true,
      location: location,
      count: data.length,
      data: data
    });
  } catch (err) {
    console.error("❌ Failed to fetch colleges by location:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching colleges by location",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Get unique locations
app.get("/api/colleges/locations", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const collection = db.collection("Colleges");
    const locations = await collection.distinct("location");
    
    console.log(`✅ Unique locations fetched: ${locations.length}`);
    res.json({
      success: true,
      count: locations.length,
      data: locations.sort()
    });
  } catch (err) {
    console.error("❌ Failed to fetch locations:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching locations",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Get college by ID
app.get("/api/colleges/:id", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const { id } = req.params;
    const { ObjectId } = require('mongodb');
    
    let query;
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      query = { "name": { $regex: id, $options: "i" } };
    }
    
    const collection = db.collection("Colleges");
    const data = await collection.findOne(query);
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "College not found"
      });
    }
    
    console.log(`✅ College found: ${data["name"]}`);
    res.json({
      success: true,
      data: data
    });
  } catch (err) {
    console.error("❌ Failed to fetch college:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching college",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// 7. 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: "Route not found",
    path: req.path 
  });
});

// 8. Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ 
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 9. Start the Server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 CORS enabled for: ${CORS_ORIGIN}`);
  });

  // Handle server errors
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use`);
    } else {
      console.error('❌ Server error:', err);
    }
    process.exit(1);
  });
}).catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});



// Stop-Process -Name "node" -Force