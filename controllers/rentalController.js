const Vehicle = require("../models/vehicle");
const Rental = require("../models/Rental");
const Payment = require("../models/Payment");

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
    returnDeposit,
    cardNumber, // Payment details
    expiryDate,
    cvv,
  } = req.body;

  try {
    // Step 1: Create the rental record
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
      status,
      returnDeposit,
    });

    // Step 2: Update the vehicle status to 'rented'
    const vehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      { status: "rented" },
      { new: true } // Return the updated document
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Step 3: Save payment details
    const payment = await Payment.create({
      payBy: customerId,
      paymentDate: new Date(),
      amount: totalPrice,
      rentalId: rental._id,
      paymentMethod: "Credit Card", // Assuming payment is via credit card
    });

    res.status(201).json({
      message: "Vehicle rented successfully",
      rental,
      payment,
      vehicle, // Include updated vehicle details
    });
  } catch (error) {
    console.error("Error renting vehicle:", error);
    res.status(500).json({ message: "Vehicle rental failed", error });
  }
};
// Get all rentals for a customer
exports.getCustomerRentals = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    // Fetch rentals and populate both vehicle and customer details
    const rentals = await Rental.find({ customerId })
      .populate("vehicleId") // Populate vehicle details
      .populate("customerId", "firstName lastName email phone driverLicense"); // Populate selected customer fields

    res.status(200).json(rentals);
  } catch (error) {
    console.error("Error fetching customer rentals:", error);
    res.status(500).json({ message: "Failed to fetch rentals", error });
  }
};
exports.getAllRentals = async (req, res) => {
  try {
    // Fetch all rentals and populate both vehicle and customer details
    const rentals = await Rental.find()
      .populate("vehicleId") // Populate vehicle details
      .populate("customerId", "firstName lastName email phone driverLicense"); // Populate selected customer fields

    res.status(200).json(rentals);
  } catch (error) {
    console.error("Error fetching all rentals:", error);
    res.status(500).json({ message: "Failed to fetch rentals", error });
  }
};

exports.cancelRental = async (req, res) => {
  const rentalId = req.params.rentalId;
  console.log("Canceling rental with ID:", rentalId);

  try {
    // Find the rental record by ID
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      console.log("Rental not found");
      return res.status(404).json({ message: "Rental not found" });
    }

    // Update rental status to "Cancelled"
    rental.status = "Cancelled";
    await rental.save();

    // Find the associated vehicle and update its status to "available"
    const vehicle = await Vehicle.findById(rental.vehicleId);
    if (vehicle) {
      vehicle.status = "available";
      await vehicle.save();
    } else {
      console.log("Vehicle associated with rental not found");
    }

    console.log("Rental canceled successfully and vehicle status updated");
    res.status(200).json({
      message: "Rental cancelled successfully and vehicle status updated",
      rental,
    });
  } catch (error) {
    console.error("Error canceling rental:", error);
    res.status(500).json({ message: "Rental cancellation failed", error });
  }
};
exports.dropOffVehicle = async (req, res) => {
  const rentalId = req.params.rentalId;
  const { totalCharge, newOdometer } = req.body;

  try {
    const rental = await Rental.findById(rentalId).populate("vehicleId");
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    if (rental.status !== "active") {
      return res
        .status(400)
        .json({ message: "Only active rentals can be dropped off" });
    }

    // Update the rental status and total price
    rental.status = "Completed";
    rental.totalPrice = totalCharge;
    await rental.save();

    // Update the vehicle's odometer and status
    const vehicle = rental.vehicleId;
    vehicle.currentOdoMeter = newOdometer;
    vehicle.status = "available";
    await vehicle.save();

    res
      .status(200)
      .json({ message: "Vehicle drop-off completed successfully", rental });
  } catch (error) {
    console.error("Error during vehicle drop-off:", error);
    res.status(500).json({ message: "Vehicle drop-off failed", error });
  }
};

