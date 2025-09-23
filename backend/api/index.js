import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Allowed origins
const allowedOrigins = [
  "https://i-blog-peach.vercel.app", // Frontend production
  "http://localhost:5173",           // Local dev
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS policy blocked: ${origin}`), false);
    }
  },
  credentials: true, // Needed for cookies, auth
}));

// Built-in middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Serverless handler for Vercel
export default app;

// Optional: local dev server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
