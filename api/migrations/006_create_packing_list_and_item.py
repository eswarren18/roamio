steps = [
    [
        """
        CREATE TABLE packing_list (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(100) NOT NULL,
            template BOOLEAN DEFAULT true
            user_id INTEGER NOT NULL,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
        );
        """,
        """
        DROP TABLE packing_list;
        """
    ],
    [
        """
        CREATE TABLE packing_item (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            category VARCHAR(100),
            location VARCHAR(100),
            packed BOOLEAN DEFAULT false,
            purchased BOOLEAN DEFAULT true,
            notes VARCHAR(500),
            packing_list_id INTEGER NOT NULL,
            CONSTRAINT fk_packing_list FOREIGN KEY (packing_list_id) REFERENCES packing_list (id)
        );
        """,
        """
        DROP TABLE packing_item;
        """
    ]
]
