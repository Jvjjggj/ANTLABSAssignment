// server.js

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const ticketRoutes = require('./routes/tickets');
const dotenv = require('dotenv');
const dashboardRoutes = require('./routes/dashboard'); // Add dashboard route

const app = express();

dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

app.use(cors({
    origin: '*',
}));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/dashboard', dashboardRoutes); // Register dashboard route

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
