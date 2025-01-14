-- cd into the roamio directory where this file is located
-- run the following command:
-- docker exec -i {docker-container-name-that-contains-the-db} psql -U {POSTGRES_USER} -d {POSTGRES_DB} < seed_data.sql

-- Delete all existing data to avoid duplicates
TRUNCATE TABLE trips RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Insert Users
INSERT INTO users (username, password) VALUES
('Woody', '$2b$12$Vvqz1Xojv8TtFZGkX0xG5.9MaIYoxuDJKyFDYw78URjczEYIQiY2e'), -- Plain password: Woody
('BuzzLightyear', '$2b$12$h5/ZmJDqFEEbjcy0WQKtDe/n26H5RfVcPwiY5n7KgDDxP.Jj.4Ckm'), -- Plain password: BuzzLightyear
('Jessie', '$2b$12$6of4zDMdNj3k.7YHFCJKhu.pK9k/ltAZsEAlWaE09zN4uwJ.GNsmi'), -- Plain password: Jessie
('LightningMcQueen', '$2b$12$9PhD7Pz8V8zydoztpSoWR.PW3IAC5VqsVXP7RA3EQKo7UuIfa.0aa'), -- Plain password: LightningMcQueen
('Mater', '$2b$12$85Tgn2cF3yeoedv39qYXSuBV11zhHh5sAbKD7U6phE4aMlN2ypc9W'), -- Plain password: Mater
('Sulley', '$2b$12$FQVoCmAamNTPONRjMzVWZe1ZDAEMy.J8pWo6UZAGVxrSmtqqFGDxe'), -- Plain password: Sulley
('MikeWazowski', '$2b$12$GWiUVcSTWVrxWUn2obixF.JlbmUg3LPBRbMDgyBMZjjt9a.g.oVlK'), -- Plain password: MikeWazowski
('Remy', '$2b$12$s9Y0nG/Fd3ZjDnxHHTd7NOqFIlt2ry6Pv1JlpO5DgGxOOb7wRQqUO'), -- Plain password: Remy
('WallE', '$2b$12$ytzqUXVZbzRWJir7R.6ZKeVPhElhbicxYSpCeVq6XYDPdsxEUa8RO'), -- Plain password: WallE
('Merida', '$2b$12$IjIT0UV9LRLxEvqPXzpu3eV/Xc5nMC3NGr7BBUDF0UpIBUtTAqT4a'); -- Plain password: Merida

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
