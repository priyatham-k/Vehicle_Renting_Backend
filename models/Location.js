const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the location
  address: { type: String, required: true }, // Street address
});

module.exports = mongoose.model("Location", locationSchema);
