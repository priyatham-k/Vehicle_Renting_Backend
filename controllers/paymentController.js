const Payment = require("../models/Payment");

exports.getPaymentsForCustomer = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const payments = await Payment.find({ payBy: customerId })
      .populate("rentalId", "pickupDate returnDate totalPrice make model") // Populate rental details
      .populate("payBy", "firstName lastName email"); // Populate customer details

    if (!payments.length) {
      return res
        .status(404)
        .json({ message: "No payments found for this customer." });
    }

    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch payments for customer.", error });
  }
};
exports.getAllPaymentsForOwner = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate("rentalId", "pickupDate returnDate totalPrice") // Populate rental details
      .populate("payBy", "firstName lastName email"); // Populate customer details

    if (!payments.length) {
      return res.status(404).json({ message: "No payments found." });
    }

    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch payments for owner.", error });
  }
};
