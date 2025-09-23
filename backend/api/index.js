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

// 1️⃣ Connect to MongoDB
connectDB();

const app = express();

// 2️⃣ CORS configuration
const allowedOrigins = [
  'https://i-blog-peach.vercel.app', // frontend production
  'http://localhost:5173'             // local dev
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// 3️⃣ Parse JSON bodies
app.use(express.json());

// 4️⃣ Clerk authentication middleware
app.use(clerkMiddleware());

// 5️⃣ API Routes
app.use('/api/webhooks', webhookRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// 6️⃣ Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    status: err.status || 500,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// 7️⃣ Export serverless handler for Vercel
export const handler = serverless(app);
