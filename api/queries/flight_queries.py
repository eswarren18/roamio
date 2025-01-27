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
                    print(new_flight)
                    if new_flight is None:
                        raise HTTPException(
                            status_code=404,
                            detail="Trip not found"
                        )
                    return new_flight
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )

    def update(self, flight_id: int, flight: FlightIn, user_id: int) -> FlightOut:
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
                        UPDATE flights
                        SET flight_number = %s, departure_time = %s, arrival_time = %s
                        FROM trip_info
                        WHERE flights.id = %s AND flights.trip_id = trip_info.id
                        RETURNING flights.*;
                        """,
                        [
                            flight.trip_id,
                            user_id,
                            flight.flight_number,
                            flight.departure_time,
                            flight.arrival_time,
                            flight_id
                        ]
                    )
                    updated_flight = cur.fetchone()
                    if updated_flight is None:
                        raise HTTPException(
                            status_code=404,
                            detail="Trip not found"
                        )
                    return updated_flight
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )

    def delete(self, flight_id: int, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        WITH trip_info AS
                        (
                            SELECT id
                            FROM trips
                            WHERE user_id = %s
                        )
                        DELETE FROM flights
                        USING trip_info
                        WHERE trip_info.id = flights.trip_id AND flights.id = %s
                        """,
                        [user_id, flight_id]
                    )
                    if cur.rowcount == 0:
                        raise HTTPException(
                            status_code=404,
                            detail="Flight not found"
                        )
                    return True
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )

    def get_for_trip(self, trip_id: int, user_id: int) -> List[FlightOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(FlightOut)) as cur:
                    cur.execute(
                        """
                        SELECT flights.*
                        FROM flights
                        JOIN trips ON flights.trip_id = trips.id
                        WHERE trips.user_id = %s AND trips.id = %s;
                        """,
                        [user_id, trip_id]
                    )
                    flights = cur.fetchall()
                    return flights
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )

    def get_for_flight(self, flight_id: int, user_id: int) -> FlightOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(FlightOut)) as cur:
                    cur.execute(
                        """
                        SELECT flights.*
                        FROM flights
                        JOIN trips ON flights.trip_id = trips.id
                        WHERE trips.user_id = %s AND flights.id = %s;
                        """,
                        [user_id, flight_id]
                    )
                    flight = cur.fetchone()
                    if flight is None:
                        raise HTTPException(
                            status_code=404,
                            detail="Flight not found"
                        )
                    return flight
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )
