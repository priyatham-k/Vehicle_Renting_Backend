const Vehicle = require("../models/vehicle");
const Rental = require("../models/Rental");
const User = require("../models/User");const mongoose = require('mongoose');
// Get all rentals for owner's vehicles
exports.getAllRentalsForOwner = async (req, res) => {
  try {
    const rentals = await Rental.find({}).populate("customerId vehicleId");
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rentals for owner", error });
  }
};

// Add vehicle
exports.addVehicle = async (req, res) => {
  const { make, model, vinNumber, mileage, imageUrl, dailyPrice, insurance } = req.body;

  try {
    const vehicle = await Vehicle.create({ make, model, vinNumber, mileage, imageUrl, dailyPrice,insurance });
    res.status(201).json({ message: "Vehicle added successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to add vehicle", error });
  }
};

// Owner Login
exports.ownerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email, role: "owner" });

    if (!user) {
      return res.status(401).json({ message: "Owner not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Owner login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Owner login failed", error });
  }
};
exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;

  // Log the incoming parameters for debugging
  console.log(`Attempting to delete vehicle with ID: ${id}`);

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid vehicle ID format" });
  }

  // Use a try-catch block to handle potential errors during database operations
  try {
    // Delete the vehicle by its ID
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    // Check if the vehicle was found and deleted
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Respond with a success message if deletion was successful
    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    // Handle and log the error, then respond with a 500 status code
    console.error("Error deleting vehicle:", error);
    return res.status(500).json({ message: "Failed to delete vehicle", error: error.message });
  }
};
