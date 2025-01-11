import os
from queries.pool import pool
from typing import List, Optional, Union, Annotated
from models.trips import TripOut, TripIn, Error
from psycopg.rows import class_row
from fastapi import HTTPException, status


class TripsQueries:
    def create(self, trip: TripIn, user_id: int) -> TripOut:
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

    def update(self, trip_id: int, trip: TripIn, user_id: int) -> TripOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(TripOut)) as cur:
                    cur.execute(
                        """
                        UPDATE trips
                        SET id = %s, title = %s, country = %s, city = %s, start_date = %s, end_date = %s, trip_image = %s, user_id = %s
                        WHERE id = %s AND user_id = %s
                        RETURNING *;
                        """,
                        [
                            trip_id,
                            trip.title,
                            trip.country,
                            trip.city,
                            trip.start_date,
                            trip.end_date,
                            trip.trip_image,
                            user_id,
                            trip_id,
                            user_id
                        ]
                    )
                    updated_trip = cur.fetchone()
                    if updated_trip is None:
                        raise HTTPException(status_code=404, detail="Trip not found")
                    return updated_trip
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def get_all(self, user_id: int) -> List[TripOut]:
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

    def get_one(self, trip_id: int, user_id: int) -> TripOut:
            try:
                with pool.connection() as conn:
                    with conn.cursor(row_factory=class_row(TripOut)) as cur:
                        cur.execute(
                            """
                            SELECT id, title, country, city, start_date, end_date, trip_image, user_id
                            FROM trips
                            WHERE id = %s AND user_id = %s
                            """,
                            [trip_id, user_id]
                        )
                        trip = cur.fetchone()
                        if trip is None:
                            raise HTTPException(status_code=404, detail="Trip not found")
                        return trip
            except HTTPException as http_exc:
                raise http_exc
            except Exception as e:
                print(f"Error: {e}")
                raise HTTPException(status_code=500, detail="Internal Server Error")

    def delete(self, trip_id: int, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM trips
                        WHERE id = %s AND user_id = %s
                        """,
                        [trip_id, user_id]
                    )
                    if cur.rowcount == 0:
                        raise HTTPException(status_code=404, detail="Trip not found")
                    else:
                        return True
        except HTTPException as http_exc:
                raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")
