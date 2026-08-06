import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { MapPin, Clock, IndianRupee, Loader2, Car, Search } from 'lucide-react';

const Parkings = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchParkings = async () => {
      try {
        const response = await apiClient.get('/parking');
        setParkings(response.data);
      } catch (err) {
        setError('Failed to load parking locations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchParkings();
  }, []);

  const filteredParkings = parkings
    .filter(p =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') return (a.pricePerHour || 0) - (b.pricePerHour || 0);
      return (a.name || '').localeCompare(b.name || '');
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your <span className="gradient-text">Perfect Spot</span>
        </h1>
        <p className="text-xl text-gray-400">
          Select a location to view available spots and book instantly.
        </p>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search by city, name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-11"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field appearance-none"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <option value="name" className="bg-gray-900">Name</option>
              <option value="price" className="bg-gray-900">Price (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredParkings.map((parking) => (
          <Link 
            key={parking.id} 
            to={`/parkings/${parking.id}`}
            className="group block"
          >
            <div className="glass overflow-hidden h-full flex flex-col card-hover rounded-2xl">
              <div className="h-48 overflow-hidden relative">
                {parking.imageUrl ? (
                  <img 
                    src={parking.imageUrl} 
                    alt={parking.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 text-sm font-semibold text-white shadow-lg">
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                  {parking.pricePerHour}/hr
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {parking.name}
                  </h3>
                  <div className="flex items-start gap-2 text-gray-400 text-sm mb-4">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{parking.address}, {parking.city}, {parking.state}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4 text-primary-400" />
                    <span>{parking.openTime} - {parking.closeTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Car className="w-4 h-4 text-accent-400" />
                    <span>
                      {parking.availableSpots !== undefined 
                        ? <><span className="text-emerald-400 font-bold">{parking.availableSpots}</span> / {parking.totalSpots} Available</>
                        : `${parking.totalSpots} Spots`}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full btn-primary text-center justify-center flex items-center">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredParkings.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">No parking spots found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

export default Parkings;
