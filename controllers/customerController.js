const Vehicle = require('../models/vehicle');
const Rental = require('../models/Rental');

// Search for vehicles
exports.searchVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Vehicle search failed', error });
  }
};

// Rent a vehicle
exports.rentVehicle = async (req, res) => {
  const { customerId, vehicleId, rentalDuration, pickupAddress, dropOffAddress, deposit, insurance, totalPrice, paymentMethod } = req.body;
  
  if (paymentMethod !== 'credit card') {
    return res.status(400).json({ message: 'Only credit card payments are allowed' });
  }
  
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
      paymentMethod,
    });
    res.status(201).json({ message: 'Vehicle rented successfully', rental });
  } catch (error) {
    res.status(500).json({ message: 'Vehicle rental failed', error });
  }
};

// Get all rentals for a customer
exports.getCustomerRentals = async (req, res) => {
  const customerId = req.params.customerId;
  
  try {
    const rentals = await Rental.find({ customerId }).populate('vehicleId');
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rentals', error });
  }
};
