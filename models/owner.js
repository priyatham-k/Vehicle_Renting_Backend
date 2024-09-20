const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  vehicleDetails: [{
    make: String,
    model: String,
    vin: String,
    mileage: Number
  }]
});

module.exports = mongoose.model('Owner', OwnerSchema);
