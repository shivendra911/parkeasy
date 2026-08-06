import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, User, LogOut, LayoutDashboard, MapPin } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 rounded-none bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              ParkEasy
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/parkings" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800">
                Find Parking
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="bg-slate-800 p-1.5 rounded-full">
                        <User className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="font-medium text-slate-200">{user?.firstName}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4 ml-4">
                  <Link to="/login" className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
                    Log in
                  </Link>
                  <Link to="/register" className="btn-primary py-2.5 text-sm">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
