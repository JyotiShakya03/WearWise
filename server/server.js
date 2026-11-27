
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");

const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const aiRoutes = require("./routes/aiRoutes");
const contactRoutes = require("./routes/contactRoutes");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

const app = express();
app.disable("x-powered-by");


// Product image storage
const uploadDirectory = path.join(__dirname, "uploads", "products");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: "Too many requests. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false
});

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many AI requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many contact requests. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false
});


app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin"
    }
  })
);

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "1mb" }));

// Serve uploaded product images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// API routes
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ai", aiLimiter, aiRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);
app.get("/", (req, res) => {
  res.send("WearWise Backend is Running!");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hello from WearWise Backend!"
  });
});

// AI health check - Kaggle GPU service
app.get("/api/ai/health", aiLimiter, async (req, res) => {
  try {
    if (!process.env.AI_SERVICE_URL) {
      return res.status(503).json({
        success: false,
        message: "AI service URL is not configured."
      });
    }

    const response = await fetch(
      `${process.env.AI_SERVICE_URL}/health`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true"
        },
        signal: AbortSignal.timeout(10000)
      }
    );

    if (!response.ok) {
      return res.status(503).json({
        success: false,
        message: "WearWise AI Service is unavailable."
      });
    }
    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("AI Health Check Error:", error.message);

    return res.status(503).json({
      success: false,
      message: "WearWise AI Service is unavailable."
    });
  }
});


// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found."
  });
});

// Global error handler

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: "Internal server error."
  });
});



const PORT = process.env.PORT || 5000;

let server;
let isShuttingDown = false;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully!");

    server = app.listen(PORT, () => {
      console.log(`WearWise server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}

async function shutdown(signal) {
  if (isShuttingDown) return;

  isShuttingDown = true;

  console.log(`${signal} received. Shutting down server...`);

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });
      });
    }

    await mongoose.connection.close();

    console.log("Server and MongoDB connection closed safely.");
    process.exit(0);

  } catch (error) {
    console.error("Shutdown Error:", error.message);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();