// server.js

// 1. Import Dependencies
require("dotenv").config(); // Loads environment variables from .env file
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// 2. Setup App and Middleware
const app = express();

// Specific port configuration - tries ALL ports in preferred order
const PREFERRED_PORTS = [3000, 3001, 3002, 5174, 8000, 5000, 3003, 8001, 5173, 4000, 8080];
const REQUESTED_PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || null;

console.log(`🚀 Starting server...`);
if (REQUESTED_PORT) {
  console.log(`🎯 Requested port: ${REQUESTED_PORT}`);
} else {
  console.log(`🎯 Will try all preferred ports: ${PREFERRED_PORTS.join(', ')}`);
}
console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);

// Enhanced CORS configuration for all ports
const CORS_ORIGIN = process.env.CORS_ORIGIN || [];

// Function to check if port is in preferred list
function isPreferredPort(port) {
  return PREFERRED_PORTS.includes(port);
}

// Universal CORS configuration for preferred ports
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps, local files)
    if (!origin) return callback(null, true);
    
    // Allow file:// protocol for local HTML files
    if (origin.startsWith('file://')) return callback(null, true);
    
    // Allow ALL localhost and 127.0.0.1 with ANY port
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // For development mode, allow all origins
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      return callback(null, true);
    }
    
    return callback(new Error('CORS policy violation'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));

// Simple request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// Serve static files from public directory
app.use(express.static('public'));

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

// 4. Simple request validation
function validateApiRequest(req, res, next) {
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

// Colleges-specific endpoint with enhanced search and filtering
app.get("/api/colleges", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        message: "Database connection not available", 
        error: "Service temporarily unavailable" 
      });
    }

    const { search, type, location, limit = 50, skip = 0, sortBy = 'name', sortOrder = 'asc' } = req.query;
    
    // Check if colleges collection exists
    const collections = await db.listCollections({ name: 'Colleges' }).toArray();
    if (collections.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Colleges collection not found in database"
      });
    }
    
    const collection = db.collection('Colleges');
    
    // Build comprehensive search filter
    let filter = {};
    
    // Text search across multiple fields
    if (search) {
      const searchRegex = { $regex: search, $options: "i" };
      filter.$or = [
        { college_name: searchRegex },
        { name: searchRegex },
        { city: searchRegex },
        { location: searchRegex },
        { type: searchRegex },
        { specialization: searchRegex },
        { 'courses_offered.undergraduate': { $elemMatch: { $regex: search, $options: "i" } } },
        { 'courses_offered.postgraduate': { $elemMatch: { $regex: search, $options: "i" } } }
      ];
    }
    
    // Filter by college type
    if (type && type !== 'all') {
      filter.type = { $regex: type, $options: "i" };
    }
    
    // Filter by location
    if (location) {
      const locationRegex = { $regex: location, $options: "i" };
      if (filter.$or) {
        filter.$and = [
          { $or: filter.$or },
          { $or: [
            { city: locationRegex },
            { location: locationRegex }
          ]}
        ];
        delete filter.$or;
      } else {
        filter.$or = [
          { city: locationRegex },
          { location: locationRegex }
        ];
      }
    }
    
    // Build sort options
    let sortOptions = {};
    const validSortFields = ['college_name', 'name', 'city', 'type', 'founded'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions['college_name'] = 1; // Default sort
    }
    
    // Execute query with pagination
    let query = collection.find(filter)
      .sort(sortOptions)
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    
    const colleges = await query.toArray();
    const totalCount = await collection.countDocuments(filter);
    
    // Transform data to ensure consistent format
    const transformedColleges = colleges.map(college => ({
      _id: college._id,
      id: college.id || college._id,
      name: college.college_name || college.name,
      college_name: college.college_name || college.name,
      shortName: college.shortName,
      type: college.type || 'College',
      city: college.city,
      location: college.location || college.city,
      founded: college.founded,
      specialization: college.specialization,
      courses_offered: college.courses_offered,
      courses: college.courses,
      placement: college.placement,
      recommendation: college.recommendation,
      seats: college.seats,
      website: college.website,
      fees: college.fees,
      intake: college.intake,
      admissionPath: college.admissionPath,
      whyConsider: college.whyConsider,
      placements: college.placements,
      reservation: college.reservation,
      rating: college.rating
    }));
    
    console.log(`✅ Colleges API: ${colleges.length} records fetched (${totalCount} total) with filters:`, {
      search, type, location
    });
    
    res.json({
      success: true,
      colleges: transformedColleges,
      count: colleges.length,
      totalCount: totalCount,
      pagination: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: (parseInt(skip) + colleges.length) < totalCount
      },
      filters: {
        search: search || null,
        type: type || 'all',
        location: location || null
      }
    });
  } catch (err) {
    console.error("❌ Failed to fetch colleges:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching colleges data",
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

// 9. Start the Server - Try ALL preferred ports in order
connectDB().then(() => {
  const tryPort = (portIndex = 0) => {
    let currentPort;
    
    // If specific port was requested via command line or environment
    if (REQUESTED_PORT && portIndex === 0) {
      currentPort = REQUESTED_PORT;
      console.log(`🎯 Trying requested port: ${currentPort}`);
    } else {
      // Calculate the correct index for preferred ports
      const preferredIndex = REQUESTED_PORT ? portIndex - 1 : portIndex;
      
      if (preferredIndex >= PREFERRED_PORTS.length) {
        console.error(`❌ All preferred ports [${PREFERRED_PORTS.join(', ')}] are in use`);
        process.exit(1);
      }
      
      currentPort = PREFERRED_PORTS[preferredIndex];
      console.log(`🎯 Trying preferred port: ${currentPort} (${preferredIndex + 1}/${PREFERRED_PORTS.length})`);
    }
    
    const server = app.listen(currentPort, () => {
      console.log(`✅ Server running on http://localhost:${currentPort}`);
      console.log(`📊 Database: Connected to MongoDB Atlas`);
      console.log(`🔗 CORS: Enabled for localhost origins`);
      console.log(`🎉 Ready to serve requests!`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️  Port ${currentPort} is busy, trying next...`);
        tryPort(portIndex + 1);
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });
  };
  
  tryPort();
  
}).catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});



// Stop-Process -Name "node" -Force