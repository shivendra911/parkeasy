import apiClient from './apiClient';

// --- Auth ---
export const login = (credentials) => apiClient.post('/auth/login', credentials);
export const register = (data) => apiClient.post('/auth/register', data);

// --- User ---
export const getProfile = () => apiClient.get('/users/me');
export const updateProfile = (data) => apiClient.put('/users/me', data);

// --- Parking ---
export const getParkingLots = () => apiClient.get('/parking');
export const getParkingLot = (id) => apiClient.get(`/parking/${id}`);

// --- Spots ---
export const getSpots = (parkingId) => apiClient.get(`/parking/${parkingId}/spots`);
export const getSpot = (id) => apiClient.get(`/spots/${id}`);

// --- Bookings ---
export const createBooking = (data) => apiClient.post('/bookings', data);
export const getMyBookings = () => apiClient.get('/bookings/me');
export const getBooking = (id) => apiClient.get(`/bookings/${id}`);
export const cancelBooking = (id) => apiClient.put(`/bookings/${id}/cancel`);
