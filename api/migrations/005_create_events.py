steps = [
    [
        # "Up" SQL statement: Create the events table
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            start_date_time TIMESTAMP NOT NULL,
            end_date_time TIMESTAMP NOT NULL,
            location VARCHAR(100) NOT NULL,
            description VARCHAR(1000),
            trip_id INTEGER NOT NULL,
            FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement: Drop the events table
        """
        DROP TABLE events;
        """
    ]
]
