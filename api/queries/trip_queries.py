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
                    new_trip = cur.fetchone()
                    return new_trip
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
                        SELECT id, title, country, city, start_date, end_date, trip_image, user_id
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

    def get_all(self, user_id: id) -> List[TripOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(TripOut)) as cur:
                    cur.execute(
                        """
                            SELECT *
                            FROM trips
                            WHERE user_id = %s
                            ORDER BY start_date
                        """,
                        [user_id]
                    )
                    trips = cur.fetchall()
                    return trips
        except Exception as e:
            print(e)
            return {"message": "Could not find trips"}
