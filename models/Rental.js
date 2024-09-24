const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  rentalDuration: { type: Number, required: true },
  pickupAddress: { type: String, required: true },
  dropOffAddress: { type: String, required: true },
  deposit: { type: Number, required: true },
  insurance: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Rental', rentalSchema);
