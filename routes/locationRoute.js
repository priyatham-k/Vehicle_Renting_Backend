const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

// Add a location
router.post("/add", locationController.addLocation);

// Get all locations
router.get("/", locationController.getLocations);

// Delete a location
router.delete("/:id", locationController.deleteLocation);

// Edit a location
router.put("/:id", locationController.editLocation);

module.exports = router;
