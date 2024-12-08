const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin"); // Path to your Admin model

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Vehicle_Renting", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10); 
  const admin = new Admin({
    name: "admin",
    email: "admin@gmail.com", 
    password: hashedPassword,
    role: "admin", 
  });

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: admin.email });
    if (existingAdmin) {
      console.log("Admin user already exists. Skipping seeding.");
    } else {
      await admin.save();
    }
    mongoose.disconnect(); // Disconnect after the operation
  } catch (err) {
    mongoose.disconnect(); // Disconnect on error
  }
};

// Execute the seeding function
seedAdmin();
