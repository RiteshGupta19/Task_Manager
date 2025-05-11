require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: 'http://3.110.84.68',  
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
