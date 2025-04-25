import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { toast } from 'react-toastify';

const BookingForm = () => {
  const navigate = useNavigate();
  const { createBooking, calculateFare } = useBookings();
  
  // Form state
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
    cabType: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Fare estimation state
  const [fareEstimate, setFareEstimate] = useState(null);
  const [showFareBreakdown, setShowFareBreakdown] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    // Clear fare estimate when form changes
    if (showFareBreakdown && (name === 'pickupLocation' || name === 'dropLocation' || name === 'cabType')) {
      setShowFareBreakdown(false);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }
    
    if (!formData.dropLocation.trim()) {
      newErrors.dropLocation = 'Drop location is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Cannot book for a past date';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.cabType) {
      newErrors.cabType = 'Please select a cab type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Estimate fare
  const handleEstimateFare = () => {
    if (!formData.pickupLocation || !formData.dropLocation || !formData.cabType) {
      const newErrors = {};
      
      if (!formData.pickupLocation) {
        newErrors.pickupLocation = 'Required for fare estimation';
      }
      
      if (!formData.dropLocation) {
        newErrors.dropLocation = 'Required for fare estimation';
      }
      
      if (!formData.cabType) {
        newErrors.cabType = 'Please select a cab type';
      }
      
      setErrors({...errors, ...newErrors});
      return;
    }
    
    setIsEstimating(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const estimatedFare = calculateFare(formData.cabType);
        setFareEstimate(estimatedFare);
        setShowFareBreakdown(true);
        setIsEstimating(false);
      } catch (err) {
        toast.error('Error estimating fare. Please try again.');
        setIsEstimating(false);
      }
    }, 800);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    setIsSubmitting(true);
    
    // If fare wasn't estimated, calculate it now
    let fare = fareEstimate;
    if (!fare) {
      fare = calculateFare(formData.cabType);
      setFareEstimate(fare);
    }
    
    // Create booking object
    const bookingData = {
      ...formData,
      fare: parseFloat(fare.totalFare)
    };
    
    try {
      // Send booking to API
      const newBooking = await createBooking(bookingData);
      
      if (newBooking) {
        // Navigate to bookings page on success
        toast.success('Ride booked successfully!');
        navigate('/bookings');
      }
    } catch (err) {
      toast.error('Failed to book ride. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="section-title mx-auto">Book Your Cab</h1>
            <p className="text-gray">Fill in the details to book your ride with SwiftCab</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="card">
                <div className="form-group">
                  <label htmlFor="pickupLocation" className="form-label">Pickup Location</label>
                  <div className="relative">
                    <i className="fas fa-map-marker-alt input-icon text-primary"></i>
                    <input
                      type="text"
                      id="pickupLocation"
                      name="pickupLocation"
                      className={`form-input input-with-icon ${errors.pickupLocation ? 'border-error' : ''}`}
                      placeholder="Enter pickup address"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.pickupLocation && (
                    <p className="text-error text-sm mt-1">{errors.pickupLocation}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="dropLocation" className="form-label">Drop Location</label>
                  <div className="relative">
                    <i className="fas fa-map-marker-alt input-icon text-error"></i>
                    <input
                      type="text"
                      id="dropLocation"
                      name="dropLocation"
                      className={`form-input input-with-icon ${errors.dropLocation ? 'border-error' : ''}`}
                      placeholder="Enter destination address"
                      value={formData.dropLocation}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.dropLocation && (
                    <p className="text-error text-sm mt-1">{errors.dropLocation}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="date" className="form-label">Date</label>
                    <div className="relative">
                      <i className="fas fa-calendar input-icon"></i>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className={`form-input input-with-icon ${errors.date ? 'border-error' : ''}`}
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]} // Set min date to today
                      />
                    </div>
                    {errors.date && (
                      <p className="text-error text-sm mt-1">{errors.date}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="time" className="form-label">Time</label>
                    <div className="relative">
                      <i className="fas fa-clock input-icon"></i>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        className={`form-input input-with-icon ${errors.time ? 'border-error' : ''}`}
                        value={formData.time}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.time && (
                      <p className="text-error text-sm mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="cabType" className="form-label">Cab Type</label>
                  <div className="relative">
                    <i className="fas fa-car input-icon"></i>
                    <select
                      id="cabType"
                      name="cabType"
                      className={`form-input input-with-icon ${errors.cabType ? 'border-error' : ''}`}
                      value={formData.cabType}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select a cab type</option>
                      <option value="mini">Mini (4 seater)</option>
                      <option value="sedan">Sedan (4 seater)</option>
                      <option value="suv">SUV (6 seater)</option>
                    </select>
                  </div>
                  {errors.cabType && (
                    <p className="text-error text-sm mt-1">{errors.cabType}</p>
                  )}
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    type="button" 
                    className="btn btn-secondary flex-1 flex items-center justify-center"
                    onClick={handleEstimateFare}
                    disabled={isEstimating}
                  >
                    {isEstimating ? (
                      <>
                        <span className="inline-block animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-2"></span>
                        Estimating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-calculator mr-2"></i> Estimate Fare
                      </>
                    )}
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary flex-1 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-taxi mr-2"></i> Book Now
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            <div>
              <div className="card h-fit sticky top-24">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b">Fare Estimate</h3>
                {isEstimating ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
                    <p className="text-gray">Calculating fare estimate...</p>
                  </div>
                ) : !showFareBreakdown ? (
                  <div className="text-gray py-4">
                    <p className="mb-4">
                      Enter pickup and drop locations along with cab type to see the estimated fare.
                    </p>
                    <div className="bg-gray-light p-4 rounded-lg text-sm">
                      <p className="mb-2 font-medium">Fare Information:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Base fare varies by vehicle type</li>
                        <li>Additional charge per mile traveled</li>
                        <li>No hidden charges</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="flex justify-between mb-3 pb-2 border-b">
                      <span className="text-gray">Base Fare:</span>
                      <span className="font-medium">${fareEstimate.baseFare}</span>
                    </div>
                    <div className="flex justify-between mb-3 pb-2 border-b">
                      <span className="text-gray">Distance ({fareEstimate.distance} miles):</span>
                      <span className="font-medium">${fareEstimate.distanceCharge}</span>
                    </div>
                    <div className="bg-gray-light p-4 rounded-lg flex justify-between items-center mt-6">
                      <span className="font-bold">Total Estimate:</span>
                      <span className="text-xl font-bold text-primary">${fareEstimate.totalFare}</span>
                    </div>
                    <p className="text-sm text-gray mt-4">
                      This is an estimated fare. Actual fare may vary based on the exact route taken.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm; 