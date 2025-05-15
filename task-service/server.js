// server.js (or app.js)
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();
app.use(express.json());
const allowedOrigins = [
  'http://taskmanager19.s3-website.ap-south-1.amazonaws.com',
  'https://d395d44loc2fy0.cloudfront.net',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
dotenv.config();
connectDB();

app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => console.log(`Task service running on port ${PORT}`));
