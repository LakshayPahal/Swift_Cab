import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// Create context
const BookingContext = createContext();

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/bookings`);
      setBookings(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
      toast.error(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  // Create a new booking
  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData);
      setBookings([response.data.data, ...bookings]);
      setError(null);
      toast.success('Ride booked successfully!');
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book ride');
      toast.error(err.response?.data?.message || 'Failed to book ride');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cancel a booking
  const cancelBooking = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/bookings/${id}`);
      
      // Update bookings state
      setBookings(bookings.map(booking => 
        booking._id === id ? response.data.data : booking
      ));
      
      setError(null);
      toast.success('Ride cancelled successfully!');
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel ride');
      toast.error(err.response?.data?.message || 'Failed to cancel ride');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, status) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${API_URL}/bookings/${id}/status`, { status });
      
      // Update bookings state
      setBookings(bookings.map(booking => 
        booking._id === id ? response.data.data : booking
      ));
      
      setError(null);
      toast.success(`Ride status updated to ${status}!`);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update ride status');
      toast.error(err.response?.data?.message || 'Failed to update ride status');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Calculate fare based on cab type and locations
  const calculateFare = (cabType, distance = null) => {
    // If distance is not provided, generate a random one
    const rideDistance = distance || Math.floor(Math.random() * 20) + 5; // 5-25 miles
    
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
    const distanceCharge = rideDistance * ratePerMile[cabType];
    const totalFare = baseFare + distanceCharge;
    
    return {
      baseFare: baseFare.toFixed(2),
      distanceCharge: distanceCharge.toFixed(2),
      totalFare: totalFare.toFixed(2),
      distance: rideDistance
    };
  };

  // Get booking by ID
  const getBookingById = (id) => {
    return bookings.find(booking => booking._id === id) || null;
  };

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        fetchBookings,
        createBooking,
        cancelBooking,
        updateBookingStatus,
        calculateFare,
        getBookingById
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the booking context
export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}; 