// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customer = require('./routes/customer');
const owner = require('./routes/owner');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use('/api/customer', customer);
app.use('/api/owner', owner);
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Vehicle_Renting', {
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
