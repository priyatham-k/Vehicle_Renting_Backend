const express = require("express");
const router = express.Router();
const { addReview, getVehicleReviews,getAllReviews } = require("../controllers/reviewController");

router.post("/add", addReview);
router.get("/:vehicleId", getVehicleReviews);
router.get("/", getAllReviews);
module.exports = router;
