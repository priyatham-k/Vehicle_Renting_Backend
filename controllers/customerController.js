const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Customer
exports.registerCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      driverLicense,
      address1,
      address2,
      state,
      zipcode,
      password,
    } = req.body;

    // Check if email or driverLicense already exists
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { driverLicense }],
    });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Email or Driver License already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const customer = new Customer({
      firstName,
      lastName,
      email,
      phone,
      driverLicense,
      address1,
      address2,
      state,
      zipcode,
      password: hashedPassword,
    });
    await customer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    console.error("Error during customer registration:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login Customer
exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: customer._id,
        role: "customer", // Explicitly setting the role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Customer login successful",
      token,
      customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        driverLicense: customer.driverLicense,
      },
    });
  } catch (error) {
    console.error("Error during customer login:", error);
    res.status(500).json({ message: "Customer login failed", error });
  }
};
