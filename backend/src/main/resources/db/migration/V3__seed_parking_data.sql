-- Insert a sample parking lot
INSERT INTO parkings (id, name, address, city, state, latitude, longitude, total_spots, price_per_hour, open_time, close_time, image_url)
VALUES 
(1, 'Central Plaza Parking', '123 Main St, Central District', 'Mumbai', 'Maharashtra', 18.9220, 72.8347, 50, 40.00, '06:00:00', '23:00:00', 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=800'),
(2, 'Tech Park East', 'Sector 5, Electronics City', 'Bangalore', 'Karnataka', 12.8452, 77.6602, 100, 30.00, '00:00:00', '23:59:59', 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=800'),
(3, 'Airport Long Term', 'Terminal 2, IGI Airport', 'New Delhi', 'Delhi', 28.5562, 77.1000, 200, 50.00, '00:00:00', '23:59:59', 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&q=80&w=800');

-- Insert spots for Parking 1 (Central Plaza)
INSERT INTO spots (spot_number, floor, type, is_available, parking_id) VALUES 
('A1', 1, 'REGULAR', true, 1),
('A2', 1, 'REGULAR', true, 1),
('A3', 1, 'COMPACT', true, 1),
('B1', 2, 'LARGE', true, 1),
('B2', 2, 'LARGE', true, 1);

-- Insert spots for Parking 2 (Tech Park)
INSERT INTO spots (spot_number, floor, type, is_available, parking_id) VALUES 
('T1', 1, 'REGULAR', true, 2),
('T2', 1, 'REGULAR', true, 2),
('T3', 1, 'REGULAR', true, 2),
('T4', 1, 'REGULAR', true, 2);

-- Insert spots for Parking 3 (Airport)
INSERT INTO spots (spot_number, floor, type, is_available, parking_id) VALUES 
('L1', 1, 'LARGE', true, 3),
('L2', 1, 'LARGE', true, 3),
('L3', 1, 'LARGE', true, 3);
