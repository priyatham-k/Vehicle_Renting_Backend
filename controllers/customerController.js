const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
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
    res.status(500).json({ message: "Customer login failed", error });
  }
};


exports.bothLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    let user, userRole;

    // Check if the user is an admin
    user = await Admin.findOne({ email });
    if (user) {
      userRole = "admin";
    } else {
      // Check if the user is a customer
      user = await Customer.findOne({ email });
      if (user) {
        userRole = "customer";
      } else {
        // User not found in either collection
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: userRole,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Prepare user data for the response
    const userData =
      userRole === "admin"
        ? { id: user._id, name: user.name, email: user.email }
        : {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            driverLicense: user.driverLicense,
          };

    res.status(200).json({
      message: `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} login successful`,
      token,
      [userRole]: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
