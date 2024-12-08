const Vehicle = require("../models/vehicle");
const mongoose = require('mongoose');
exports.addVehicle = async (req, res) => {
  const {
    make,
    model,
    vinNumber,
    mileage,
    imageUrl,
    dailyPrice,
    insurance,
    type,
    pricePerDay,
    currentOdoMeter,
    capacity,
    fuelType,
    color
  } = req.body;

  // Validation
  if (
    !make ||
    !model ||
    !vinNumber ||
    !mileage ||
    !dailyPrice ||
    !insurance ||
    !type ||
    !pricePerDay ||
    !currentOdoMeter ||
    !capacity ||
    !fuelType ||
    !color
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate `fuelType`
  if (!['ev', 'gas'].includes(fuelType)) {
    return res.status(400).json({ message: "Invalid fuel type. Must be 'ev' or 'gas'" });
  }

  try {
    // Check if vinNumber is unique
    const existingVehicle = await Vehicle.findOne({ vinNumber });
    if (existingVehicle) {
      return res.status(400).json({ message: "VIN number must be unique" });
    }

    // Create the new vehicle
    const vehicle = await Vehicle.create({
      make,
      model,
      vinNumber,
      mileage,
      imageUrl,
      dailyPrice,
      insurance,
      type,
      pricePerDay,
      currentOdoMeter,
      capacity,
      fuelType,
      color
    });

    res.status(201).json({ message: "Vehicle added successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to add vehicle", error });
  }
};

exports.showAllvehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Vehicle search failed", error });
  }
};
exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
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
    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete vehicle", error: error.message });
  }
};
exports.updatedVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: "Failed to update vehicle", error });
  }
};
