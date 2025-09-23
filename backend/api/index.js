import express from 'express';
import serverless from 'serverless-http';
import connectDB from '../lib/connectDB.js';
import postRouter from '../routes/post.route.js';
import userRouter from '../routes/user.route.js';
import commentRouter from '../routes/comment.route.js';
import webhookRouter from '../routes/webhook.route.js';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

// Connect MongoDB
connectDB();

const app = express();

// 1️⃣ CORS configuration
const allowedOrigins = [
  'https://i-blog-peach.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// 2️⃣ JSON parsing
app.use(express.json());

// 3️⃣ Clerk auth
app.use(clerkMiddleware());

// 4️⃣ Routes
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/webhooks', webhookRouter);

// 5️⃣ Preflight handling
app.options('*', (req, res) => res.sendStatus(204));

// 6️⃣ Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    status: err.status || 500,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// 7️⃣ Export serverless handler
export const handler = serverless(app);
