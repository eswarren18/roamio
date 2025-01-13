import os
from queries.pool import pool
from typing import List
from models.flights import FlightIn, FlightOut
from psycopg.rows import class_row
from fastapi import HTTPException

class FlightsQueries:
    def create(self, flight: FlightIn, user_id: int) -> FlightOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(FlightOut)) as cur:
                    cur.execute(
                        """
                        WITH trip_info AS
                        (
                            SELECT id
                            FROM trips
                            WHERE id = %s AND user_id = %s
                        )
                        INSERT INTO flights
                            (flight_number, departure_time, arrival_time, trip_id)
                        SELECT
                            %s, %s, %s, trip_info.id
                        FROM trip_info
                        RETURNING *;
                        """,
                        [
                            flight.trip_id,
                            user_id,
                            flight.flight_number,
                            flight.departure_time,
                            flight.arrival_time,
                        ]
                    )
                    new_flight = cur.fetchone()
                    if new_flight is None:
                        raise HTTPException(status_code=404, detail="Trip not found")
                    return new_flight
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def update(self, flight_id: int, flight: FlightIn) -> FlightOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(FlightOut)) as cur:
                    cur.execute(
                        """
                        UPDATE flights
                        SET id = %s, flight_number = %s, departure_time = %s, arrival_time = %s, trip_id = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [
                            flight_id,
                            flight.flight_number,
                            flight.departure_time,
                            flight.arrival_time,
                            flight.trip_id,
                            flight_id
                        ]
                    )
                    updated_flight = cur.fetchone()
                    return updated_flight
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def get_all(self, user_id: int) -> List[FlightOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(FlightOut)) as cur:
                    cur.execute(
                        """
                        SELECT f.*
                        FROM flights f
                        JOIN trips t ON f.trip_id = t.id
                        WHERE t.user_id = %s;
                        """,
                        [user_id]
                    )
                    flights = cur.fetchall()
                    return flights
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def get_one(self, flight_id: int, user_id: int) -> FlightOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(FlightOut)) as cur:
                    cur.execute(
                        """
                        SELECT f.id, f.departure_time, f.arrival_time,
                           f.trip_id, f.flight_number
                        FROM flights f
                        JOIN trips t ON f.trip_id = t.id
                        WHERE f.id = %s AND t.user_id = %s;
                        """,
                        [flight_id, user_id]
                    )
                    flight = cur.fetchone()
                    if flight is None:
                        raise HTTPException(status_code=404, detail="Flight not found")
                    return flight
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def delete(self, flight_id: int, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM flights f
                        USING trips t
                        WHERE f.trip_id = t.id
                        """,
                       # [flight_id, user_id]
                    )
                    if cur.rowcount == 0:
                        raise HTTPException(status_code=404, detail="Flight not found")
                    return True
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")
