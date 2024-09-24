// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/owners', ownerRoutes);
// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Vehicle_Renting", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
