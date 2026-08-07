import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
import { Car, Mail, Lock, User, Phone, ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await apiClient.post('/auth/register', formData);
      login(response.data.user);
      navigate('/parkings');
    } catch (err) {
      if (err.response?.data && typeof err.response.data === 'object') {
        const errors = Object.values(err.response.data);
        setError(errors[0] || 'Registration failed');
      } else {
        setError('An error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-3 rounded-2xl shadow-lg shadow-purple-500/30">
            <Car className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400 mb-6">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Log in here
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="glass-panel py-8 px-4 sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="input-label" htmlFor="firstName">First name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input id="firstName" name="firstName" type="text" required minLength={2} maxLength={50} pattern="^[a-zA-Z\s\-]+$" title="Only letters, spaces, and hyphens are allowed" value={formData.firstName} onChange={handleChange} className="input-field pl-11" placeholder="John" />
                </div>
              </div>

              <div>
                <label className="input-label" htmlFor="lastName">Last name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input id="lastName" name="lastName" type="text" required minLength={2} maxLength={50} pattern="^[a-zA-Z\s\-]+$" title="Only letters, spaces, and hyphens are allowed" value={formData.lastName} onChange={handleChange} className="input-field pl-11" placeholder="Doe" />
                </div>
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="email">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="input-field pl-11" placeholder="john@example.com" />
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="phone">Phone number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-500" />
                </div>
                <input id="phone" name="phone" type="text" required pattern="^\+?[0-9]{10,15}$" title="Must be a valid 10 to 15 digit phone number" value={formData.phone} onChange={handleChange} className="input-field pl-11" placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input id="password" name="password" type="password" required minLength={8} pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$" title="At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character" value={formData.password} onChange={handleChange} className="input-field pl-11" placeholder="Strong password" />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-500/30 hover:shadow-purple-500/50">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>Create Account <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
