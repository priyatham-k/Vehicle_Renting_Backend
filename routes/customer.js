const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Register a new customer
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  const customerExists = await Customer.findOne({ email });
  if (customerExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const newCustomer = new Customer({ fullName, email, password });
  await newCustomer.save();

  res.status(201).json({ message: 'Customer registered successfully' });
});

// Login a customer
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const customer = await Customer.findOne({ email });
  if (!customer || customer.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Customer login successful', user: { id: customer._id } });
});

module.exports = router;
