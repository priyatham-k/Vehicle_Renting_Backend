const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
//router.post('/register', authController.registerUser);

// router.post('/rent', customerController.rentVehicle);
// router.get('/rentals/:customerId', customerController.getCustomerRentals);
// router.put("/cancel/:rentalId", customerController.cancelRental);
// router.put("/rentals/dropoff/:rentalId", customerController.dropOffVehicle);


router.post('/login', customerController.loginCustomer);
router.post('/register', customerController.registerCustomer);
module.exports = router;
