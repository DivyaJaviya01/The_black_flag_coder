// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3001;

// CORS middleware - simplified
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
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

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

const client = new MongoClient(mongoUri);
let db;

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas!");
    db = client.db("VI");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB Atlas:", err);
    process.exit(1);
  }
}

// Request validation middleware
function validateApiRequest(req, res, next) {
  if (req.query.limit && (isNaN(req.query.limit) || req.query.limit < 0)) {
    return res.status(400).json({
      success: false,
      message: "Invalid limit parameter. Must be a positive number."
    });
  }
  next();
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: db ? "connected" : "disconnected",
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.0'
  });
});

// Get all collections
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

// Get data from any collection
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

    const collections = await db.listCollections({ name }).toArray();
    if (collections.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Collection '${name}' not found`
      });
    }

    const collection = db.collection(name);

    let filter = {};
    if (search) {
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

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

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

// Get all colleges
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

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { "name": { $regex: search, $options: "i" } },
          { "location": { $regex: search, $options: "i" } }
        ]
      };
    }

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    let query = collection.find(filter);
    if (Object.keys(sortOptions).length > 0) {
      query = query.sort(sortOptions);
    }
    if (limit && !isNaN(limit)) {
      query = query.limit(parseInt(limit));
    }

    const data = await query.toArray();

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

// Get vishal collection data
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

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { "name": { $regex: search, $options: "i" } },
          { "title": { $regex: search, $options: "i" } },
          { "description": { $regex: search, $options: "i" } },
          { "category": { $regex: search, $options: "i" } }
        ]
      };
    }

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    let query = collection.find(filter);
    if (Object.keys(sortOptions).length > 0) {
      query = query.sort(sortOptions);
    }
    if (limit && !isNaN(limit)) {
      query = query.limit(parseInt(limit));
    }

    const data = await query.toArray();

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

// Get vishal item by ID
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

// Enhanced colleges endpoint
app.get("/api/colleges", validateApiRequest, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({
        message: "Database connection not available",
        error: "Service temporarily unavailable"
      });
    }

    const { search, type, location, limit = 50, skip = 0, sortBy = 'name', sortOrder = 'asc' } = req.query;

    const collections = await db.listCollections({ name: 'Colleges' }).toArray();
    if (collections.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Colleges collection not found in database"
      });
    }

    const collection = db.collection('Colleges');

    let filter = {};

    if (search) {
      const searchRegex = { $regex: search, $options: "i" };
      filter.$or = [
        { college_name: searchRegex },
        { name: searchRegex },
        { city: searchRegex },
        { location: searchRegex },
        { type: searchRegex },
        { specialization: searchRegex }
      ];
    }

    if (type && type !== 'all') {
      filter.type = { $regex: type, $options: "i" };
    }

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

    let sortOptions = {};
    const validSortFields = ['college_name', 'name', 'city', 'type', 'founded'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions['college_name'] = 1;
    }

    let query = collection.find(filter)
      .sort(sortOptions)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const colleges = await query.toArray();
    const totalCount = await collection.countDocuments(filter);

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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n✅ Server started successfully!`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`💾 Database: Connected to MongoDB Atlas`);
    console.log(`🚀 Ready to serve requests!\n`);
  });
}).catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
