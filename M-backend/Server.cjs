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

// Get all collections in the database
app.get("/api/collections", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    console.log(`✅ Found ${collectionNames.length} collections: ${collectionNames.join(', ')}`);
    res.json({
      success: true,
      count: collectionNames.length,
      data: collectionNames
    });
  } catch (err) {
    console.error("❌ Failed to fetch collections:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching collections",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Get data from any collection dynamically
app.get("/api/collection/:name", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const { name } = req.params;
    const { limit, search, sortBy, sortOrder, skip } = req.query;
    
    // Validate collection exists
    const collections = await db.listCollections({ name }).toArray();
    if (collections.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Collection '${name}' not found`
      });
    }
    
    const collection = db.collection(name);
    
    // Build query filter for search
    let filter = {};
    if (search) {
      // Get a sample document to understand the schema
      const sampleDoc = await collection.findOne({});
      if (sampleDoc) {
        const searchFields = Object.keys(sampleDoc).filter(key => 
          typeof sampleDoc[key] === 'string' || 
          (typeof sampleDoc[key] === 'object' && sampleDoc[key] !== null && !Array.isArray(sampleDoc[key]))
        );
        
        filter = {
          $or: searchFields.map(field => ({
            [field]: { $regex: search, $options: "i" }
          }))
        };
      }
    }
    
    // Build sort options
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    
    // Execute query with pagination
    let query = collection.find(filter);
    if (Object.keys(sortOptions).length > 0) {
      query = query.sort(sortOptions);
    }
    if (skip && !isNaN(skip)) {
      query = query.skip(parseInt(skip));
    }
    if (limit && !isNaN(limit)) {
      query = query.limit(parseInt(limit));
    }
    
    const data = await query.toArray();
    const totalCount = await collection.countDocuments(filter);
    
    console.log(`✅ ${name} collection: ${data.length} records fetched (${totalCount} total)`);
    res.json({
      success: true,
      collection: name,
      count: data.length,
      totalCount: totalCount,
      filter: search ? { search } : {},
      data: data
    });
  } catch (err) {
    console.error(`❌ Failed to fetch data from collection ${req.params.name}:`, err);
    res.status(500).json({ 
      success: false,
      message: `Error fetching data from collection ${req.params.name}`,
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Get schema analysis for any collection
app.get("/api/collection/:name/schema", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const { name } = req.params;
    const { sampleSize = 100 } = req.query;
    
    const collection = db.collection(name);
    
    // Get sample documents for schema analysis
    const sampleDocs = await collection.find({}).limit(parseInt(sampleSize)).toArray();
    
    if (sampleDocs.length === 0) {
      return res.json({
        success: true,
        collection: name,
        schema: {},
        sampleSize: 0,
        totalDocuments: 0
      });
    }
    
    // Analyze schema
    const schema = {};
    const fieldFrequency = {};
    
    sampleDocs.forEach(doc => {
      Object.keys(doc).forEach(field => {
        if (!fieldFrequency[field]) {
          fieldFrequency[field] = 0;
          schema[field] = {
            type: getFieldType(doc[field]),
            examples: new Set(),
            nullable: false
          };
        }
        fieldFrequency[field]++;
        
        if (doc[field] === null || doc[field] === undefined) {
          schema[field].nullable = true;
        } else if (schema[field].examples.size < 3) {
          schema[field].examples.add(doc[field]);
        }
      });
    });
    
    // Convert sets to arrays and add frequency info
    Object.keys(schema).forEach(field => {
      schema[field].examples = Array.from(schema[field].examples).slice(0, 3);
      schema[field].frequency = fieldFrequency[field];
      schema[field].percentage = Math.round((fieldFrequency[field] / sampleDocs.length) * 100);
    });
    
    const totalDocuments = await collection.countDocuments({});
    
    console.log(`✅ Schema analysis for ${name}: ${Object.keys(schema).length} fields`);
    res.json({
      success: true,
      collection: name,
      schema: schema,
      sampleSize: sampleDocs.length,
      totalDocuments: totalDocuments
    });
  } catch (err) {
    console.error(`❌ Failed to analyze schema for collection ${req.params.name}:`, err);
    res.status(500).json({ 
      success: false,
      message: `Error analyzing schema for collection ${req.params.name}`,
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Helper function to determine field type
function getFieldType(value) {
  if (value === null || value === undefined) return 'null';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (typeof value === 'object') return 'object';
  if (typeof value === 'string') {
    if (value.match(/^\d{4}-\d{2}-\d{2}/)) return 'date';
    if (value.match(/^https?:\/\//)) return 'url';
    if (value.includes('@') && value.includes('.')) return 'email';
    return 'string';
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'integer' : 'number';
  }
  return typeof value;
}

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

// Get all data from vishal collection
app.get("/api/vishal", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const { limit, search, sortBy, sortOrder } = req.query;
    const collection = db.collection("vishal");
    
    // Build query filter
    let filter = {};
    if (search) {
      // This will search across all string fields in the documents
      // You can customize this based on your actual data structure
      filter = {
        $or: [
          { "name": { $regex: search, $options: "i" } },
          { "title": { $regex: search, $options: "i" } },
          { "description": { $regex: search, $options: "i" } },
          { "category": { $regex: search, $options: "i" } }
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
    
    console.log(`✅ Vishal data successfully fetched: ${data.length} records`);
    res.json({
      success: true,
      count: data.length,
      filter: search ? { search } : {},
      data: data
    });
  } catch (err) {
    console.error("❌ Failed to fetch vishal data:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching data from vishal collection",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Get specific item from vishal collection by ID
app.get("/api/vishal/:id", validateApiRequest, async (req, res) => {
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
      // Try to match by name or other identifier
      query = {
        $or: [
          { "name": { $regex: id, $options: "i" } },
          { "title": { $regex: id, $options: "i" } }
        ]
      };
    }
    
    const collection = db.collection("vishal");
    const data = await collection.findOne(query);
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Item not found in vishal collection"
      });
    }
    
    console.log(`✅ Vishal item found: ${data.name || data.title || data._id}`);
    res.json({
      success: true,
      data: data
    });
  } catch (err) {
    console.error("❌ Failed to fetch vishal item:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching item from vishal collection",
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