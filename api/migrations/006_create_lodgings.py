steps = [
    [
        # "Up" SQL statement: Create the lodgings table
        """
        CREATE TABLE lodgings (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(500) NOT NULL,
            check_in TIMESTAMP NOT NULL,
            check_out TIMESTAMP NOT NULL,
            trip_id INTEGER NOT NULL,
            FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement: Drop the lodgings table
        """
        DROP TABLE lodgings;
        """
    ]
]
