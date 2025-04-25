import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { toast } from 'react-toastify';

// Status badge component
const StatusBadge = ({ status }) => {
  let badgeClass = 'badge-';
  
  switch (status) {
    case 'pending':
      badgeClass += 'pending';
      break;
    case 'on the way':
      badgeClass += 'onway';
      break;
    case 'arrived':
      badgeClass += 'arrived';
      break;
    case 'completed':
      badgeClass += 'completed';
      break;
    case 'cancelled':
      badgeClass += 'cancelled';
      break;
    default:
      badgeClass += 'pending';
  }
  
  return <span className={`badge ${badgeClass}`}>{status}</span>;
};

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

const Bookings = () => {
  const { bookings, loading, error, fetchBookings, cancelBooking } = useBookings();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });
  
  useEffect(() => {
    // Refresh bookings when component mounts
    refreshBookings();
  }, []);
  
  const refreshBookings = async () => {
    setIsRefreshing(true);
    try {
      await fetchBookings();
      toast.success("Bookings refreshed successfully");
    } catch (err) {
      toast.error("Failed to refresh bookings");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const openConfirmDialog = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };
  
  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, id: null });
  };
  
  const handleCancelBooking = async () => {
    if (confirmDialog.id) {
      await cancelBooking(confirmDialog.id);
      closeConfirmDialog();
    }
  };
  
  if (loading || isRefreshing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray">Loading bookings...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-error text-xl mb-4">
          <i className="fas fa-exclamation-circle mr-2"></i>
          Error loading bookings
        </div>
        <p className="text-gray mb-6">{error}</p>
        <button 
          onClick={refreshBookings} 
          className="btn btn-primary"
        >
          <i className="fas fa-sync-alt mr-2"></i> Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="section-title">My Bookings</h1>
            <p className="text-gray mb-2">View and manage your ride bookings</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={refreshBookings} 
              className="px-4 py-2 bg-gray-light hover:bg-gray-medium text-dark rounded-lg transition-colors flex items-center"
              disabled={isRefreshing}
            >
              <i className="fas fa-sync-alt mr-2"></i> Refresh
            </button>
            <Link to="/book" className="btn btn-primary flex items-center">
              <i className="fas fa-plus mr-2"></i> Book a New Ride
            </Link>
          </div>
        </div>
        
        {bookings && bookings.length === 0 ? (
          <div className="text-center py-16 bg-gray-light rounded-xl shadow-md">
            <div className="text-6xl text-gray mb-6">
              <i className="fas fa-car"></i>
            </div>
            <h2 className="text-2xl font-bold mb-3">No bookings yet</h2>
            <p className="text-gray mb-8 max-w-md mx-auto">You haven't made any bookings yet. Book your first ride now for a comfortable journey.</p>
            <Link to="/book" className="btn btn-primary">
              <i className="fas fa-taxi mr-2"></i> Book Your First Ride
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings && bookings.map((booking) => (
              <div key={booking._id} className="card border border-gray-200 hover:border-primary/20 transition-colors">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-grow p-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-dark">
                          Booking #{booking.bookingId || 'N/A'}
                        </h3>
                        <p className="text-sm text-gray">
                          {formatDateTime(booking.createdAt || new Date())}
                        </p>
                      </div>
                      <StatusBadge status={booking.status || 'pending'} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4">
                          <div className="text-sm text-gray">Pickup Location</div>
                          <div className="font-medium">{booking.pickupLocation}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray">Drop Location</div>
                          <div className="font-medium">{booking.dropLocation}</div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <div className="text-sm text-gray">Date & Time</div>
                          <div className="font-medium">
                            {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'} at {booking.time || 'N/A'}
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="text-sm text-gray">Cab Type</div>
                          <div className="font-medium capitalize">{booking.cabType}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray">Fare</div>
                          <div className="font-medium">${booking.fare ? booking.fare.toFixed(2) : '0.00'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t p-4 flex flex-wrap gap-2 justify-end">
                  <Link 
                    to={`/bookings/${booking._id}`} 
                    className="px-4 py-2 bg-gray-light text-dark rounded-lg hover:bg-gray-medium transition-colors flex items-center"
                  >
                    <i className="fas fa-eye mr-2"></i> View Details
                  </Link>
                  
                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <button 
                      onClick={() => openConfirmDialog(booking._id)}
                      className="px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors flex items-center"
                    >
                      <i className="fas fa-ban mr-2"></i> Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Confirmation Dialog */}
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Cancel Booking</h3>
              <p className="mb-6">Are you sure you want to cancel this booking? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={closeConfirmDialog}
                  className="px-4 py-2 bg-gray-light text-dark rounded-lg hover:bg-gray-medium transition-colors"
                >
                  No, Keep It
                </button>
                <button 
                  onClick={handleCancelBooking}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/80 transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings; 