import os
from queries.pool import pool
from typing import List, Optional, Union
from models.trips import TripRequest, TripResponse, Error

class TripsQueries:
    def create(self, trip: TripRequest, user_id: int) -> Union[TripResponse, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO trips
                            (title, country, city, start_date, end_date, trip_image, user_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            trip.title,
                            trip.country,
                            trip.city,
                            trip.start_date,
                            trip.end_date,
                            trip.trip_image,
                            trip.user_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.trip_request_to_response(id, trip)
        except Exception:
             return {"message": "Create did not work"}

    def trip_request_to_response(self, id: int, trip: TripRequest):
            old_data = trip.model_dump()
            return TripResponse(id=id, **old_data)
