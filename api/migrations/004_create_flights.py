steps = [
    [
        # "Up" SQL statement: Create the flights table
        """
        CREATE TABLE flights (
            id SERIAL PRIMARY KEY,
            flight_number VARCHAR(10) NOT NULL,
            departure_time TIMESTAMP NOT NULL,
            arrival_time TIMESTAMP NOT NULL,
            trip_id INTEGER NOT NULL,
            FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement: Drop the flights table
        """
        DROP TABLE flights;
        """
    ]
]
