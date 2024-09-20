const express = require('express');
const router = express.Router();
const Owner = require('../models/owner');

// Register a new owner
router.post('/register', async (req, res) => {
  const { fullName, email, password, vehicleDetails } = req.body;

  const ownerExists = await Owner.findOne({ email });
  if (ownerExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const newOwner = new Owner({ fullName, email, password, vehicleDetails });
  await newOwner.save();

  res.status(201).json({ message: 'Owner registered successfully' });
});

// Login an owner
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const owner = await Owner.findOne({ email });
  if (!owner || owner.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Owner login successful', user: { id: owner._id } });
});

module.exports = router;
