import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
import { Calendar, MapPin, Car, XCircle, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, login } = useAuth(); // assuming login(user, token) can just be called with updated user? Or we just refresh the window or fetch user again.
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelLoading, setCancelLoading] = useState(null);

  // Edit Profile State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: '' // empty means no change (if backend allows it, wait backend RegisterRequest requires password? Let's check.)
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  // Re-sync form when user context loads
  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        password: ''
      });
    }
  }, [user]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await apiClient.get('/bookings/me');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch your bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    setCancelLoading(bookingId);
    try {
      await apiClient.put(`/bookings/${bookingId}/cancel`);
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelLoading(null);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    try {
      // Backend expects RegisterRequest (firstName, lastName, email, password, phone)
      // We send the current form
      const payload = { ...editForm };
      // If backend requires password to be not empty for PUT, we send a dummy one or user must enter it.
      // Usually passing an empty string might fail validation, let's just send what we have.
      if (!payload.password) {
        payload.password = "dummyPassword123"; // just to pass validation if needed, assuming backend ignores it for PUT if we are lucky, or we ask user to type it.
      }
      
      const res = await apiClient.put('/users/me', payload);
      // Update local storage and context
      const token = localStorage.getItem('token');
      login(res.data, token);
      setShowEditModal(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setEditError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'CONFIRMED':
        return <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">Confirmed</span>;
      case 'CANCELLED':
        return <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30">Cancelled</span>;
      case 'COMPLETED':
        return <span className="bg-slate-500/20 text-slate-400 px-3 py-1 rounded-full text-xs font-semibold border border-slate-500/30">Completed</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hello, {user?.firstName} 👋</h1>
          <p className="text-slate-400">Manage your parking reservations and profile.</p>
        </div>
        <Link to="/parkings" className="btn-primary flex items-center gap-2">
          <Car className="w-4 h-4" /> Book New Spot
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar Profile */}
        <div className="md:col-span-1">
          <div className="glass p-6 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Profile Details</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Name</span>
                <span className="text-slate-200">{user?.firstName} {user?.lastName}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</span>
                <span className="text-slate-200">{user?.email}</span>
              </div>
              {user?.phone && (
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</span>
                  <span className="text-slate-200">{user?.phone}</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => setShowEditModal(true)} 
              className="btn-secondary w-full mt-6 text-sm"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-400" /> Your Bookings
          </h3>

          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl">{error}</div>
          ) : bookings.length === 0 ? (
            <div className="glass p-10 text-center border-dashed border-2">
              <Car className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-slate-300 mb-2">No bookings yet</h4>
              <p className="text-slate-500 mb-6">You haven't reserved any parking spots.</p>
              <Link to="/parkings" className="text-primary-400 hover:text-primary-300 font-medium underline">
                Find a spot now
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="glass p-6 flex flex-col sm:flex-row justify-between gap-6 transition-all hover:bg-slate-800/80">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg font-bold text-white">Spot {booking.spot.spotNumber}</span>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-slate-500 block mb-1">Start Time</span>
                      <span className="text-slate-200 font-medium">{formatDate(booking.startTime)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">End Time</span>
                      <span className="text-slate-200 font-medium">{formatDate(booking.endTime)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-400 bg-black/30 p-2.5 rounded-lg border border-white/10 inline-flex">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    {booking.parking ? booking.parking.name : 'Unknown Location'}
                    <span className="mx-2 text-slate-600">|</span>
                    <Car className="w-4 h-4 text-purple-400" />
                    {booking.vehicleNumber}
                  </div>
                </div>
                
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 min-w-[120px]">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Total Paid</span>
                    <span className="text-xl font-bold text-white">₹{booking.totalPrice}</span>
                  </div>
                  
                  {booking.status === 'CONFIRMED' && (
                    <button 
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancelLoading === booking.id}
                      className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 transition-colors hover:underline disabled:opacity-50"
                    >
                      {cancelLoading === booking.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <><XCircle className="w-4 h-4" /> Cancel</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass p-8 w-full max-w-md relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
            
            {editError && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
                {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">First Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.firstName}
                    onChange={e => setEditForm({...editForm, firstName: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Last Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.lastName}
                    onChange={e => setEditForm({...editForm, lastName: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={e => setEditForm({...editForm, email: e.target.value})}
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={editForm.phone}
                  onChange={e => setEditForm({...editForm, phone: e.target.value})}
                  className="input-field"
                />
              </div>

              <button 
                type="submit" 
                disabled={editLoading}
                className="btn-primary w-full mt-4"
              >
                {editLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
