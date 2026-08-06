import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Shield, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center px-4 py-20 overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-blue-500/30 text-blue-300 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Smart Parking Solution
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Find your spot in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              seconds, not minutes.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Reserve premium parking spaces across the city instantly. Skip the endless driving around and secure your spot with ParkEasy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/parkings" className="btn-primary w-full sm:w-auto text-lg px-8 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" /> Find Parking Now
            </Link>
            <Link to="/register" className="btn-secondary w-full sm:w-auto text-lg px-8">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why choose ParkEasy?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">We've completely reimagined the parking experience to save you time, money, and stress.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-panel p-8 glass-panel-hover">
              <div className="bg-blue-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                <MapPin className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-200">Prime Locations</h3>
              <p className="text-slate-400 leading-relaxed">Access hundreds of premium parking spots in the busiest parts of the city.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-panel p-8 glass-panel-hover">
              <div className="bg-purple-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                <Clock className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-200">Instant Booking</h3>
              <p className="text-slate-400 leading-relaxed">Reserve your spot in real-time. No waiting, no uncertainty. Just park and go.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-panel p-8 glass-panel-hover">
              <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <Shield className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-200">Guaranteed Space</h3>
              <p className="text-slate-400 leading-relaxed">Your booked spot is protected against double-booking with our smart lock system.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
