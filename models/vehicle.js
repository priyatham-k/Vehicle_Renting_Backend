const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  vinNumber: { type: String, required: true },
  imageUrl: { type: String }, // For image of the vehicle
  dailyPrice: { type: Number, required: true },
  insurance: { type: Number, required: true },
  mileage: { type: Number, required: true },
  type: { type: String, required: true},
  pricePerDay: { type: String, required: true},
  currentOdoMeter:{type: String, required: true}
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
