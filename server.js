require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const customerRoutes = require('./routes/customerRoutes');
// const ownerRoutes = require('./routes/ownerRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const locationRoute = require('./routes/locationRoute');
const rentalRoutes = require('./routes/rentalRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const adminRoutes = require("./routes/adminRoutes");
// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);
app.use('/api/customers', customerRoutes);
// app.use('/api/owners', ownerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/locations", locationRoute);
app.use("/api/rentals", rentalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Vehicle_Renting", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
