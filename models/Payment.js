const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    rentalId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Rental', 
        required: true 
    }, // Linked Rental
    payBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    }, // Customer making the payment
    amount: { 
        type: Number, 
        required: true 
    }, // Payment amount
    paymentDate: { 
        type: Date, 
        default: Date.now 
    }, // Date of payment
    paymentMethod: { 
        type: String, 
        enum: ['Credit Card', 'Debit Card', 'Cash'], 
        required: true 
    }, // Payment method used
    status: { 
        type: String, 
        enum: ['Paid', 'Refunded'], 
        default: 'Paid' 
    }, // Status of payment
});

module.exports = mongoose.model('Payment', PaymentSchema);
