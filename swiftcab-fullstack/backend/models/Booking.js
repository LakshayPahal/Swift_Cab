const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required']
  },
  dropLocation: {
    type: String,
    required: [true, 'Drop location is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  cabType: {
    type: String,
    enum: ['mini', 'sedan', 'suv'],
    required: [true, 'Cab type is required']
  },
  status: {
    type: String,
    enum: ['pending', 'on the way', 'arrived', 'completed', 'cancelled'],
    default: 'pending'
  },
  fare: {
    type: Number,
    required: [true, 'Fare is required']
  },
  bookingId: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    // Generate a booking ID like "SC12345"
    this.bookingId = 'SC' + Math.floor(10000 + Math.random() * 90000);
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 