const Booking = require('../models/Booking');

// Helper function for calculating fare (similar to the original JS logic)
const calculateFare = (cabType, distance) => {
  const baseFares = {
    'mini': 5,
    'sedan': 8,
    'suv': 12
  };
  
  const ratePerMile = {
    'mini': 1.5,
    'sedan': 2,
    'suv': 2.5
  };
  
  const baseFare = baseFares[cabType];
  const distanceCharge = distance * ratePerMile[cabType];
  return baseFare + distanceCharge;
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { pickupLocation, dropLocation, date, time, cabType } = req.body;
    
    // Generate a random distance (in a real app, this would be calculated using a maps API)
    const distance = Math.floor(Math.random() * 20) + 5; // 5-25 miles
    
    // Calculate fare based on cab type and distance
    const fare = calculateFare(cabType, distance);
    
    const booking = new Booking({
      pickupLocation,
      dropLocation,
      date,
      time,
      cabType,
      fare
    });
    
    await booking.save();
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Only cancel if the booking is not already completed
    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed ride'
      });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'on the way', 'arrived', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    booking.status = status;
    await booking.save();
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}; 