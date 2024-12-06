const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // Customer's first name
  lastName: { type: String, required: true },  // Customer's last name
  email: { type: String, required: true, unique: true }, // Unique email for login
  phone: { type: String, required: true }, // Contact number
  driverLicense: { type: String, required: true, unique: true }, // Unique driver license number
  address1: { type: String, required: true }, // First line of address
  address2: { type: String }, // Optional second line of address
  state: { type: String, required: true }, // State or region
  zipcode: { type: String, required: true }, // Postal code
  password: { type: String, required: true }, // Hashed password for secure login
  createdAt: { type: Date, default: Date.now }, // Record creation timestamp
  paymentMethods: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }
  ], // Reference to Payment model for payment methods
});

module.exports = mongoose.model("Customer", CustomerSchema);
