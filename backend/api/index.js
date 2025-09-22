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

// Allowed frontend domains
const allowedOrigins = [
  'https://i-blog-peach.vercel.app', // production frontend
  'http://localhost:3000'             // local dev
];

const app = express();

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy does not allow this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Handle preflight OPTIONS requests
app.options('*', cors());

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
  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong!',
    status: error.status,
    stack: error.stack
  });
});

// Export serverless handler for Vercel
export const handler = serverless(app);
