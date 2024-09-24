const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.get('/rentals', ownerController.getAllRentalsForOwner);
router.post('/vehicles', ownerController.addVehicle);
router.post('/login', ownerController.ownerLogin);
router.delete('/deleteVehicle/:id', ownerController.deleteVehicle);
module.exports = router;
