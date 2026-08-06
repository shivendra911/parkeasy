import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { MapPin, ArrowLeft, Loader2, Info } from 'lucide-react';

const SpotSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parking, setParking] = useState(null);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parkingRes, spotsRes] = await Promise.all([
          apiClient.get(`/parking/${id}`),
          apiClient.get(`/spots/parking/${id}`)
        ]);
        setParking(parkingRes.data);
        setSpots(spotsRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!parking) {
    return <div className="text-center py-20 text-slate-400">Parking lot not found.</div>;
  }

  const handleSpotSelect = (spotId) => {
    navigate(`/book/${spotId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button 
        onClick={() => navigate('/parkings')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Parkings
      </button>

      <div className="flex flex-col md:flex-row gap-10 mb-12 items-start">
        {parking.imageUrl && (
          <img 
            src={parking.imageUrl} 
            alt={parking.name} 
            className="w-full md:w-1/3 rounded-2xl shadow-lg border border-slate-700 object-cover aspect-video md:aspect-auto h-full"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-white mb-3">{parking.name}</h1>
          <div className="flex items-start gap-2 text-slate-400 text-lg mb-6">
            <MapPin className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />
            <span>{parking.address}, {parking.city}, {parking.state}</span>
          </div>
          
          <div className="glass-panel p-6 inline-block">
            <div className="flex gap-8 text-sm">
              <div>
                <span className="block text-slate-500 mb-1">Price</span>
                <span className="font-semibold text-white text-lg">₹{parking.pricePerHour} / hour</span>
              </div>
              <div>
                <span className="block text-slate-500 mb-1">Hours</span>
                <span className="font-semibold text-white text-lg">{parking.openTime} - {parking.closeTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Select a Spot</h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/50"></div>
            <span className="text-slate-300">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700"></div>
            <span className="text-slate-300">Occupied</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8">
        {spots.length === 0 ? (
          <div className="text-center py-10 text-slate-400 flex flex-col items-center">
            <Info className="w-10 h-10 mb-3 text-slate-500" />
            <p>No spots available at this location yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {spots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => handleSpotSelect(spot.id)}
                disabled={!spot.isAvailable}
                className={`
                  relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300
                  ${spot.isAvailable 
                    ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 hover:bg-emerald-500/20 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1' 
                    : 'border-slate-700 bg-slate-800 opacity-50 cursor-not-allowed'
                  }
                `}
              >
                <span className={`text-2xl font-bold mb-1 ${spot.isAvailable ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {spot.spotNumber}
                </span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {spot.type}
                </span>
                
                {!spot.isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-xl backdrop-blur-[1px]">
                    <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded shadow">Booked</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotSelection;
