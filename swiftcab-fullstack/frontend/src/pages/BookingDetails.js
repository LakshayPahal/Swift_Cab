import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { toast } from 'react-toastify';

// Format date helper function
const formatDateTime = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return 'Invalid date format';
  }
};

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    bookings, 
    loading, 
    error, 
    fetchBookings, 
    getBookingById, 
    cancelBooking, 
    updateBookingStatus 
  } = useBookings();
  
  const [booking, setBooking] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, action: null });
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get booking from context or fetch it
  useEffect(() => {
    const loadBooking = async () => {
      let foundBooking = getBookingById(id);
      
      if (!foundBooking) {
        // If booking not in context, fetch all bookings
        await fetchBookings();
        foundBooking = getBookingById(id);
        
        // If still not found, redirect to bookings page with a toast
        if (!foundBooking) {
          toast.error("Booking not found");
          navigate('/bookings');
          return;
        }
      }
      
      setBooking(foundBooking);
    };
    
    loadBooking();
  }, [id, bookings, getBookingById, fetchBookings, navigate]);
  
  // Open confirmation dialog
  const openConfirmDialog = (action) => {
    setConfirmDialog({ isOpen: true, action });
  };
  
  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, action: null });
  };
  
  // Handle actions like cancellation or status updates
  const handleAction = async () => {
    setIsProcessing(true);
    
    try {
      let updatedBooking;
      
      if (confirmDialog.action === 'cancel') {
        updatedBooking = await cancelBooking(id);
        if (updatedBooking) {
          toast.success("Booking cancelled successfully");
          setBooking(updatedBooking);
        }
      } else if (confirmDialog.action) {
        // Handle status updates
        updatedBooking = await updateBookingStatus(id, confirmDialog.action);
        if (updatedBooking) {
          toast.success(`Ride status updated to ${confirmDialog.action}`);
          setBooking(updatedBooking);
        }
      }
    } catch (err) {
      toast.error("Operation failed. Please try again.");
    } finally {
      setIsProcessing(false);
      closeConfirmDialog();
    }
  };
  
  // Loading state
  if (loading || !booking) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray">Loading booking details...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-error text-xl mb-4">
          <i className="fas fa-exclamation-circle mr-2"></i>
          Error loading booking details
        </div>
        <p className="text-gray mb-6">{error}</p>
        <button 
          onClick={() => fetchBookings()}
          className="btn btn-primary"
        >
          <i className="fas fa-sync-alt mr-2"></i> Try Again
        </button>
      </div>
    );
  }
  
  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-pending';
      case 'on the way':
        return 'badge-onway';
      case 'arrived':
        return 'badge-arrived';
      case 'completed':
        return 'badge-completed';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-pending';
    }
  };
  
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/bookings" className="text-primary flex items-center hover:underline">
              <i className="fas fa-arrow-left mr-2"></i> Back to Bookings
            </Link>
          </div>
          
          <div className="card">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
              <h1 className="text-2xl font-bold mb-2 sm:mb-0 text-dark">
                Booking #{booking.bookingId}
              </h1>
              <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-dark border-b pb-2">Ride Details</h3>
                
                <div className="mb-4">
                  <div className="text-sm text-gray mb-1">Pickup Location</div>
                  <div className="font-medium">{booking.pickupLocation}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray mb-1">Drop Location</div>
                  <div className="font-medium">{booking.dropLocation}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray mb-1">Date & Time</div>
                  <div className="font-medium">
                    {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'} at {booking.time || 'N/A'}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray mb-1">Cab Type</div>
                  <div className="font-medium capitalize">{booking.cabType}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-dark border-b pb-2">Booking Information</h3>
                
                <div className="mb-4">
                  <div className="text-sm text-gray mb-1">Booking ID</div>
                  <div className="font-medium">{booking.bookingId}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray mb-1">Booked On</div>
                  <div className="font-medium">{formatDateTime(booking.createdAt)}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray mb-1">Fare</div>
                  <div className="font-medium">${booking.fare ? booking.fare.toFixed(2) : '0.00'}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray mb-1">Status</div>
                  <div className="font-medium capitalize">{booking.status}</div>
                </div>
              </div>
            </div>
            
            {/* Status Timeline */}
            <div className="border-t border-b py-6 mb-6">
              <h3 className="text-lg font-semibold mb-6 text-dark">Ride Status</h3>
              
              <div className="flex items-center mb-8">
                <div className={`timeline-dot ${booking.status !== 'cancelled' ? 'bg-primary' : 'bg-gray-medium'}`}></div>
                <div className={`timeline-line ${(booking.status === 'on the way' || booking.status === 'arrived' || booking.status === 'completed') 
                  ? 'bg-primary' : 'bg-gray-medium'}`}></div>
                <div className={`timeline-dot ${(booking.status === 'on the way' || booking.status === 'arrived' || booking.status === 'completed') 
                  ? 'bg-primary' : 'bg-gray-medium'}`}></div>
                <div className={`timeline-line ${(booking.status === 'arrived' || booking.status === 'completed') 
                  ? 'bg-primary' : 'bg-gray-medium'}`}></div>
                <div className={`timeline-dot ${(booking.status === 'arrived' || booking.status === 'completed') 
                  ? 'bg-primary' : 'bg-gray-medium'}`}></div>
                <div className={`timeline-line ${booking.status === 'completed' ? 'bg-primary' : 'bg-gray-medium'}`}></div>
                <div className={`timeline-dot ${booking.status === 'completed' 
                  ? 'bg-primary' : 'bg-gray-medium'}`}></div>
              </div>
              
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="font-medium text-sm">Booked</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">On the Way</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">Arrived</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">Completed</div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-end">
              {/* Demo controls for status updates - in a real app this would be driver-controlled */}
              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                <div className="flex flex-wrap gap-2 mr-auto">
                  <div className="text-sm text-gray mr-2 self-center">Demo Controls:</div>
                  
                  {booking.status === 'pending' && (
                    <button 
                      onClick={() => openConfirmDialog('on the way')} 
                      className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-lg"
                    >
                      <i className="fas fa-car mr-1"></i> Set On the Way
                    </button>
                  )}
                  
                  {booking.status === 'on the way' && (
                    <button 
                      onClick={() => openConfirmDialog('arrived')} 
                      className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-lg"
                    >
                      <i className="fas fa-map-marker-alt mr-1"></i> Set Arrived
                    </button>
                  )}
                  
                  {booking.status === 'arrived' && (
                    <button 
                      onClick={() => openConfirmDialog('completed')} 
                      className="px-3 py-1 bg-success/10 text-success text-sm rounded-lg"
                    >
                      <i className="fas fa-check mr-1"></i> Complete Ride
                    </button>
                  )}
                </div>
              )}
              
              <Link 
                to="/bookings" 
                className="px-4 py-2 bg-gray-light text-dark rounded-lg hover:bg-gray-medium transition-colors flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back
              </Link>
              
              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                <button 
                  onClick={() => openConfirmDialog('cancel')}
                  className="px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors flex items-center"
                  disabled={isProcessing}
                >
                  <i className="fas fa-ban mr-2"></i> Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              {confirmDialog.action === 'cancel' ? 'Cancel Booking' : 'Update Status'}
            </h3>
            <p className="mb-6">
              {confirmDialog.action === 'cancel' 
                ? 'Are you sure you want to cancel this booking? This action cannot be undone.'
                : `Are you sure you want to update the ride status to "${confirmDialog.action}"?`
              }
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={closeConfirmDialog}
                className="px-4 py-2 bg-gray-light text-dark rounded-lg hover:bg-gray-medium transition-colors"
                disabled={isProcessing}
              >
                No, Cancel
              </button>
              <button 
                onClick={handleAction}
                className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center ${
                  confirmDialog.action === 'cancel' ? 'bg-error hover:bg-error/80' : 'bg-primary hover:bg-dark'
                }`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    Processing...
                  </>
                ) : (
                  <>Yes, Proceed</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails; 