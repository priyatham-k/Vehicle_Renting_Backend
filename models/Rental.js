const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  rentalDuration: { type: Number, required: true },
  pickupAddress: { type: String, required: true },
  dropOffAddress: { type: String, required: true },
  deposit: { type: Number, required: true },
  insurance: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  imageUrl: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  pickupDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  returnDeposit: { type: String, required: true }
});

module.exports = mongoose.model("Rental", rentalSchema);
