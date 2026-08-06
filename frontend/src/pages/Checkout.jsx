import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { Clock, Calendar, Car, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form state
  const [vehicleNumber, setVehicleNumber] = useState('');
  
  const toLocalISOString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  // Set default times (start: next hour, end: start + 2 hours)
  const getDefaultTimes = () => {
    const start = new Date();
    start.setHours(start.getHours() + 1);
    start.setMinutes(0, 0, 0);
    
    const end = new Date(start);
    end.setHours(end.getHours() + 2);
    
    return {
      startTime: toLocalISOString(start),
      endTime: toLocalISOString(end)
    };
  };

  const [startTime, setStartTime] = useState(getDefaultTimes().startTime);
  const [endTime, setEndTime] = useState(getDefaultTimes().endTime);

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const response = await apiClient.get(`/spots/${spotId}`);
        setSpot(response.data);
      } catch (err) {
        setError('Failed to load spot details.');
      } finally {
        setLoading(false);
      }
    };
    fetchSpotDetails();
  }, [spotId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setBookingLoading(true);

    try {
      // Validate dates
      if (new Date(startTime) >= new Date(endTime)) {
        throw new Error('End time must be after start time');
      }

      await apiClient.post('/bookings', {
        spotId: parseInt(spotId),
        startTime: startTime,
        endTime: endTime,
        vehicleNumber
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-80px)]"><Loader2 className="w-10 h-10 animate-spin text-primary-500" /></div>;
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-emerald-500/20 p-4 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
        <p className="text-slate-400">Redirecting you to dashboard...</p>
      </div>
    );
  }

  // Calculate estimated price
  const calculatePrice = () => {
    if (!spot || !startTime || !endTime) return 0;
    const s = new Date(startTime);
    const e = new Date(endTime);
    if (s >= e) return 0;
    
    let hours = (e - s) / (1000 * 60 * 60);
    hours = Math.ceil(hours);
    if (hours < 1) hours = 1;
    
    return hours * 50; 
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-8">Complete Your Booking</h1>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      <div className="glass p-8">
        <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
          <div>
            <h3 className="text-xl font-bold text-emerald-400 mb-1">Spot {spot?.spotNumber}</h3>
            <p className="text-gray-400 text-sm capitalize">{spot?.type} Size • Floor {spot?.floor}</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-400 block">Est. Total</span>
            <span className="text-2xl font-bold text-white">₹{calculatePrice()}</span>
          </div>
        </div>

        <form onSubmit={handleBooking} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="input-label" htmlFor="startTime">Start Time</label>
              <input
                id="startTime"
                type="datetime-local"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input-field"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            
            <div>
              <label className="input-label" htmlFor="endTime">End Time</label>
              <input
                id="endTime"
                type="datetime-local"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input-field"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          <div>
            <label className="input-label" htmlFor="vehicleNumber">Vehicle Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Car className="h-5 w-5 text-slate-500" />
              </div>
              <input
                id="vehicleNumber"
                type="text"
                required
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="input-field pl-11 uppercase"
                placeholder="MH 01 AB 1234"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={bookingLoading}
              className="btn-primary w-full text-lg flex items-center justify-center gap-2 py-4"
            >
              {bookingLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>Confirm Booking & Pay <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              By clicking confirm, you agree to our terms of service and cancellation policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
