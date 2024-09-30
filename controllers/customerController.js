const Vehicle = require("../models/vehicle");
const Rental = require("../models/Rental");

// Search for vehicles
exports.searchVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Vehicle search failed", error });
  }
};

// Rent a vehicle
exports.rentVehicle = async (req, res) => {
  const {
    make,
    model,
    customerId,
    vehicleId,
    pickupDate,
    returnDate,
    rentalDuration,
    pickupAddress,
    dropOffAddress,
    deposit,
    insurance,
    totalPrice,
    imageUrl,
    type,
    status,
    returnDeposit
  } = req.body;

  try {
    const rental = await Rental.create({
      customerId,
      vehicleId,
      rentalDuration,
      pickupAddress,
      dropOffAddress,
      deposit,
      insurance,
      totalPrice,
      imageUrl,
      make,
      model,
      pickupDate,
      returnDate,
      type,
      status,returnDeposit                                                                            
    });
    res.status(201).json({ message: "Vehicle rented successfully", rental });
  } catch (error) {
    res.status(500).json({ message: "Vehicle rental failed", error });
  }
};

// Get all rentals for a customer
exports.getCustomerRentals = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const rentals = await Rental.find({ customerId }).populate("vehicleId");
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rentals", error });
  }
};
exports.cancelRental = async (req, res) => {
  const rentalId = req.params.rentalId;
  console.log('Canceling rental with ID:', rentalId);

  try {
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      console.log('Rental not found');
      return res.status(404).json({ message: "Rental not found" });
    }

    rental.status = "Cancelled";
    await rental.save();

    console.log('Rental canceled successfully');
    res.status(200).json({ message: "Rental cancelled successfully", rental });
  } catch (error) {
    console.error('Error canceling rental:', error);
    res.status(500).json({ message: "Rental cancellation failed", error });
  }
};

// Drop off a vehicle
exports.dropOffVehicle = async (req, res) => {
  const rentalId = req.params.rentalId;

  try {
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }


    rental.status = "Completed"; // Update the status to Completed
    await rental.save();

    res.status(200).json({ message: "Vehicle drop-off completed successfully", rental });
  } catch (error) {
    res.status(500).json({ message: "Vehicle drop-off failed", error });
  }
};

