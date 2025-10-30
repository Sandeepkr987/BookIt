
const express = require('express');
const router = express.Router();
const Booking = require('../models/BookModel');

// POST /api/bookings 
router.post('/', async (req, res) => {
  try {
    //refId
     const refId =
      'HXD' +
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      '&' +
      Math.random().toString(36).substring(2, 4).toUpperCase();
    const newBooking = new Booking({...req.body, refId});
    await newBooking.save();
    res.status(201).json({ message: 'Booking confirmed', booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while saving booking' });
  }
});

// GET /api/bookings 
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
