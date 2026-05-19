require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const workerRoutes = require('./routes/workers');
const livestockRoutes = require('./routes/livestock');
const taskRoutes = require('./routes/tasks');
const fieldRoutes = require('./routes/fields');
const transactionRoutes = require('./routes/transactions');
const inventoryRoutes = require('./routes/inventory');

app.use('/api/workers', workerRoutes);
app.use('/api/livestock', livestockRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/inventory', inventoryRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
