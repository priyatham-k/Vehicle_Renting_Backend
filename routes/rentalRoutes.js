const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");

// Route to rent a vehicle
router.post("/rent", rentalController.rentVehicle);

// Route to fetch all rentals for a customer
router.get("/customer/:customerId", rentalController.getCustomerRentals);

// Route to fetch all rentals for the owner (optional, if needed)
router.get("/owner", rentalController.getAllRentals);

// Route to cancel a rental
router.put("/cancel/:rentalId", rentalController.cancelRental);

// Route to drop off a vehicle and finalize rental
router.put("/dropoff/:rentalId", rentalController.dropOffVehicle);

module.exports = router;
