steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            trip_image VARCHAR(1000) NOT NULL,
            user_id INTEGER NOT NULL,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE trips;
        """
    ],
]
