const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route for getting all bookings and creating a new booking
router.route('/')
  .get(bookingController.getBookings)
  .post(bookingController.createBooking);

// Route for getting, updating status, and cancelling a specific booking
router.route('/:id')
  .get(bookingController.getBooking)
  .delete(bookingController.cancelBooking);

// Route for updating booking status
router.route('/:id/status')
  .patch(bookingController.updateBookingStatus);

module.exports = router; 