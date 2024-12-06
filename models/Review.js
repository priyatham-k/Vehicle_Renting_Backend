const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);
