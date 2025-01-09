import os
from queries.pool import pool
from typing import List, Optional, Union, Annotated
from models.trips import TripOut, TripIn, Error
from psycopg.rows import class_row
from fastapi import HTTPException


class TripsQueries:
    def create(self, trip: TripIn, user_id: int) -> TripOut:
        print(user_id)
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(TripOut)) as cur:
                    cur.execute(
                        """
                        INSERT INTO trips
                            (title, country, city, start_date, end_date, trip_image, user_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            trip.title,
                            trip.country,
                            trip.city,
                            trip.start_date,
                            trip.end_date,
                            trip.trip_image,
                            user_id
                        ]
                    )
                    trip = cur.fetchone()
                    return trip
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Create did not work")

    def get_one(self, trip_id: int) -> Optional[TripOut]:
        print(trip_id)
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(TripOut)) as cur:
                    cur.execute(
                        """
                        SELECT id, title, country, city, start_date, end_date, trip_image
                        FROM trips
                        WHERE id = %s

                        """,
                        [trip_id]
                    )
                    print(cur)
                    trip = cur.fetchone()
                    return trip
        except Exception as e:
            print(e)
            return {"message": "Could not find trip"}
