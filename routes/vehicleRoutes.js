const express = require("express");
const router = express.Router();
const { addVehicle,showAllvehicles,deleteVehicle,updatedVehicle } = require("../controllers/vehicleController");

router.post("/add", addVehicle);
router.get("/", showAllvehicles);
router.delete('/deleteVehicle/:id', deleteVehicle);
router.put("/update/:id", updatedVehicle);
module.exports = router;
