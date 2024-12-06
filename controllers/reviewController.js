const Review = require("../models/Review");
const Rental = require("../models/Rental");

exports.addReview = async (req, res) => {
    const { rentalId, comment } = req.body;
  
    try {
      const rental = await Rental.findById(rentalId).populate("customerId vehicleId");
  
      if (!rental) {
        return res.status(404).json({ message: "Rental not found" });
      }
  
      if (rental.status !== "Completed") {
        return res.status(400).json({ message: "You can only review completed rentals." });
      }
  
      if (rental.reviewAdded) {
        return res.status(400).json({ message: "You have already reviewed this rental/vehicle." });
      }
  
      // Create the review
      const review = await Review.create({
        customer: rental.customerId._id,
        vehicle: rental.vehicleId._id,
        comment,
      });
  
      // Update the rental to mark review as added
      rental.reviewAdded = true;
      await rental.save();
  
      res.status(201).json({ message: "Review added successfully.", review });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Failed to add review.", error });
    }
  };
  
exports.getVehicleReviews = async (req, res) => {
    const { vehicleId } = req.params;

    try {
        const reviews = await Review.find({ vehicle: vehicleId })
            .populate("customer", "firstName lastName")
            .sort({ date: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Failed to fetch reviews", error });
    }
};
exports.getAllReviews = async (req, res) => {
    const { vehicleId, customerId } = req.query;
  
    try {
      let filter = {};
      if (vehicleId) filter.vehicle = vehicleId; // Filter by vehicle ID
      if (customerId) filter.customer = customerId; // Filter by customer ID
  
      const reviews = await Review.find(filter)
        .populate("customer", "firstName lastName email") // Populate customer details
        .populate("vehicle", "make model"); // Populate vehicle details
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews", error });
    }
  };