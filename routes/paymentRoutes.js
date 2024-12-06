const express = require('express');
const router = express.Router();
const {
  getPaymentsForCustomer,
  getAllPaymentsForOwner,
} = require('../controllers/paymentController');

// Get payments for a specific customer
router.get('/customer/:customerId', getPaymentsForCustomer);

// Get all payments for the owner
router.get('/owner', getAllPaymentsForOwner);

module.exports = router;
