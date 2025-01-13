import os
from queries.pool import pool
from typing import List
from models.flights import FlightIn, FlightOut
from psycopg.rows import class_row
from fastapi import HTTPException

class FlightsQueries:
    def create(self, flight: FlightIn) -> FlightOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(FlightOut)) as cur:
                    cur.execute(
                        """
                        INSERT INTO flights
                            (flight_number, departure_time, arrival_time, trip_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            flight.flight_number,
                            flight.departure_time,
                            flight.arrival_time,
                            flight.trip_id
                        ]
                    )
                    new_flight = cur.fetchone()
                    return new_flight
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")
