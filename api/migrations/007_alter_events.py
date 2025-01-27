steps = [
    [

        """
        ALTER TABLE events
        RENAME COLUMN location TO address;

        ALTER TABLE events
        ALTER COLUMN address TYPE VARCHAR(200);
        """,

        """
        ALTER TABLE events
        RENAME COLUMN address TO location;

        ALTER TABLE events
        ALTER COLUMN location TYPE VARCHAR(100);
        """
    ]
]
