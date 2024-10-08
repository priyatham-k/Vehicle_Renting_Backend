const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/vehicles', customerController.searchVehicles);
router.post('/rent', customerController.rentVehicle);
router.get('/rentals/:customerId', customerController.getCustomerRentals);
router.put("/cancel/:rentalId", customerController.cancelRental);
router.put("/rentals/dropoff/:rentalId", customerController.dropOffVehicle);
module.exports = router;
