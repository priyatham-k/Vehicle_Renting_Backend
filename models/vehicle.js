const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true }, // Manufacturer name
  model: { type: String, required: true }, // Vehicle model
  vinNumber: { type: String, required: true, unique: true }, // Unique Vehicle Identification Number
  imageUrl: { type: String }, // Optional: URL to the vehicle image
  dailyPrice: { type: Number, required: true }, // Daily rental price
  insurance: { type: Number, required: true }, // Insurance cost
  mileage: { type: Number, required: true }, // Mileage of the vehicle
  type: { type: String, required: true }, // Type (e.g., Sedan, SUV, Truck)
  pricePerDay: { type: Number, required: true }, // Price per day for rental
  currentOdoMeter: { type: Number, required: true }, // Current odometer reading
  capacity:{ type: String, required: true },
  status: {
    type: String,
    enum: ['available', 'rented'], // Available statuses
    default: 'available', // Default status is 'available'
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Vehicle', vehicleSchema);
