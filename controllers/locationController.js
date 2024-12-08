const Location = require("../models/Location");

// Add a new location
exports.addLocation = async (req, res) => {
  try {
    const { name, address, city, zipCode, state } = req.body;

    // Validation
    if (!name || !address || !city || !zipCode || !state) {
      return res.status(400).json({
        message: "Name, address, city, zip code, and state are required",
      });
    }

    // Create and save the new location
    const newLocation = new Location({ name, address, city, zipCode, state });
    const location = await newLocation.save();

    res
      .status(201)
      .json({ message: "Location added successfully", location });
  } catch (error) {
    res.status(500).json({ message: "Failed to add location", error });
  }
};


// Fetch all locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch locations", error });
  }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const location = await Location.findByIdAndDelete(id);

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete location", error });
  }
};

// Edit a location
exports.editLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, zipCode, state } = req.body;

    // Validation
    if (!name || !address || !city || !zipCode || !state) {
      return res.status(400).json({
        message: "Name, address, city, zip code, and state are required",
      });
    }

    // Update the location
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, address, city, zipCode, state },
      { new: true } // Return the updated document
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({
      message: "Location updated successfully",
      location: updatedLocation,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update location", error });
  }
};

