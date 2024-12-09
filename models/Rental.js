const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
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
  pickupDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  returnDeposit: { type: String, required: true },
  reviewAdded: { type: Boolean, default: false },
  cardLastFour: { type: String, required: true }, 
  cardExpiry: { type: String, required: true }, 
  cardType: { type: String, required: true },
  currentOdoMeter: { type: String, required: true },
  fuelType: { 
    type: String, 
    enum: ['ev', 'gas'], // Fuel types: Electric Vehicle (EV) or Gas
    required: true 
  },
  color: { type: String, required: true }, // Color of the vehicle
  startingOdometer: { type: Number, required: false },
  fuelLevel: { type: String, enum: ["Full", "Half", "Almost Empty"], required: false },
  pickupTime: { type: Date, required: false },
  status: { type: String, enum: ["Waiting For Approval", "active", "Cancelled", "Completed"] },
});

module.exports = mongoose.model("Rental", rentalSchema);
