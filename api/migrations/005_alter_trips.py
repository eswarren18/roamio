steps = [
    [
        # "Up" SQL statement: Modify the foreign key to add ON DELETE CASCADE
        """
        ALTER TABLE trips
        DROP CONSTRAINT fk_user;

        ALTER TABLE trips
        ADD CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE;
        """,
        # "Down" SQL statement: Revert to the original foreign key without ON DELETE CASCADE
        """
        ALTER TABLE trips
        DROP CONSTRAINT fk_user;

        ALTER TABLE trips
        ADD CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id);
        """
    ],
]
