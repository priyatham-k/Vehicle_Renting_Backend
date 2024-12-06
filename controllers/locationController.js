const Location = require("../models/Location");

// Add a new location
exports.addLocation = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required" });
    }

    const newLocation = new Location({ name, address });
    const location = await newLocation.save();

    res.status(201).json({ message: "Location added successfully", location });
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ message: "Failed to add location", error });
  }
};

// Fetch all locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
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
    console.error("Error deleting location:", error);
    res.status(500).json({ message: "Failed to delete location", error });
  }
};

// Edit a location
exports.editLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required" });
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, address },
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
    console.error("Error updating location:", error);
    res.status(500).json({ message: "Failed to update location", error });
  }
};
