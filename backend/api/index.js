import express from 'express';
import connectDB from '../lib/connectDB.js';
import userRouter from '../routes/user.route.js';
import postRouter from '../routes/post.route.js';
import commentRouter from '../routes/comment.route.js';
import webhookRouter from '../routes/webhook.route.js';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import serverless from 'serverless-http';

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

// Routes
app.use('/webhooks', webhookRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong!',
    status: error.status,
    stack: error.stack,
  });
});

// Export for Vercel
export const handler = serverless(app);
