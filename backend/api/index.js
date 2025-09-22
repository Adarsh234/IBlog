// api/index.js
import express from 'express';
import serverless from 'serverless-http';
import connectDB from '../lib/connectDB.js';
import userRouter from '../routes/user.route.js';
import postRouter from '../routes/post.route.js';
import commentRouter from '../routes/comment.route.js';
import webhookRouter from '../routes/webhook.route.js';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

// Connect to MongoDB
connectDB();

const allowedOrigins = [
  'https://i-blog-peach.vercel.app', // frontend production
  'http://localhost:3000'             // local dev
];

const app = express();

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Clerk authentication middleware
app.use(clerkMiddleware());

// Parse JSON
app.use(express.json());

// Routes
app.use('/webhooks', webhookRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// Error handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong!',
    status: error.status || 500,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
});

// Export serverless handler for Vercel
export const handler = serverless(app);
