-- cd into the roamio directory where this file is located
-- run the following command:
-- docker exec -i {docker-container-name-that-contains-the-db} psql -U {POSTGRES_USER} -d {POSTGRES_DB} < seed_data.sql

-- Delete all existing data to avoid duplicates
TRUNCATE TABLE trips RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Insert Users
INSERT INTO users (username, password) VALUES
('Woody', 'Woody'),
('BuzzLightyear', 'BuzzLightyear'),
('Jessie', 'Jessie'),
('LightningMcQueen', 'LightningMcQueen'),
('Mater', 'Mater'),
('Sulley', 'Sulley'),
('MikeWazowski', 'MikeWazowski'),
('Remy', 'Remy'),
('WallE', 'WallE'),
('Merida', 'Merida');

-- Insert Trips
INSERT INTO trips (title, country, city, start_date, end_date, trip_image, user_id) VALUES
-- Trips for Woody
('Broadway Adventure', 'USA', 'New York', '2025-01-01', '2025-01-10', '', 1),
('Niagara Falls Escape', 'Canada', 'Toronto', '2025-02-01', '2025-02-05', '', 1),
-- Trips for BuzzLightyear
('Cherry Blossom Getaway', 'Japan', 'Tokyo', '2025-03-01', '2025-03-15', '', 2),
-- Trips for Nemo
('Berlin History Tour', 'Germany', 'Berlin', '2025-04-01', '2025-04-10', '', 3),
('Mumbai Street Food Safari', 'India', 'Mumbai', '2025-05-01', '2025-05-07', '', 3),
('Windy City Weekend', 'USA', 'Chicago', '2025-06-01', '2025-06-12', '', 3),
-- No trips for Dory
-- Trips for Sulley
('Parisian Summer Escape', 'France', 'Paris', '2025-07-01', '2025-07-10', '', 5),
-- Trips for MikeWazowski
('Roman Holiday', 'Italy', 'Rome', '2025-08-01', '2025-08-05', '', 6),
-- No trips for LightningMcQueen
-- No trips for Mater
-- Trips for Remy
('Madrid Art and Tapas Tour', 'Spain', 'Madrid', '2025-09-01', '2025-09-10', '', 9),
('Lisbon Coastline Adventure', 'Portugal', 'Lisbon', '2025-10-01', '2025-10-07', '', 9),
-- Trips for WallE
('Carnival Extravaganza', 'Brazil', 'Rio de Janeiro', '2025-11-01', '2025-11-15', '', 10);
