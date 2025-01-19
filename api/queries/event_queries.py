import os
from queries.pool import pool
from typing import List
from models.events import EventIn, EventOut
from psycopg.rows import class_row
from fastapi import HTTPException

class EventsQueries:
    def create(self, event: EventIn, user_id: int) -> EventOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(EventOut)) as cur:
                    cur.execute(
                        """
                        WITH trip_info AS
                        (
                            SELECT id
                            FROM trips
                            WHERE id = %s AND user_id = %s
                        )
                        INSERT INTO events
                            (name, start_date_time, end_date_time, location, description, trip_id)
                        SELECT
                            %s, %s, %s, %s, %s, trip_info.id
                        FROM trip_info
                        RETURNING *;
                        """,
                        [
                            event.trip_id,
                            user_id,
                            event.name,
                            event.start_date_time,
                            event.end_date_time,
                            event.location,
                            event.description,
                        ]
                    )
                    new_event = cur.fetchone()
                    print(new_event)
                    if new_event is None:
                        raise HTTPException(status_code=404, detail="Event not found")
                    return new_event
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def update(self, event_id: int, event: EventIn, user_id: int) -> EventOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(EventOut)) as cur:
                    cur.execute(
                        """
                        WITH trip_info AS
                        (
                            SELECT id
                            FROM trips
                            WHERE id = %s AND user_id = %s
                        )
                        UPDATE events
                        SET name = %s, start_date_time = %s, end_date_time = %s, location = %s, description = %s
                        FROM trip_info
                        WHERE events.id = %s AND events.trip_id = trip_info.id
                        RETURNING events.*;
                        """,
                        [
                            event.trip_id,
                            user_id,
                            event.name,
                            event.start_date_time,
                            event.end_date_time,
                            event.location,
                            event.description,
                            event_id
                        ]
                    )
                    updated_event = cur.fetchone()
                    if updated_event is None:
                        raise HTTPException(status_code=404, detail="Trip not found")
                    return updated_event
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def get_all(self, user_id: int) -> List[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(EventOut)) as cur:
                    cur.execute(
                        """
                        SELECT events.*
                        FROM events
                        JOIN trips ON events.trip_id = trips.id
                        WHERE trips.user_id = %s;
                        """,
                        [user_id]
                    )
                    events = cur.fetchall()
                    return events
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def delete(self, event_id: int, user_id: int) -> bool:
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
                        DELETE FROM events
                        USING trip_info
                        WHERE trip_info.id = events.trip_id AND events.id = %s
                        """,
                        [user_id, event_id]
                    )
                    if cur.rowcount == 0:
                        raise HTTPException(status_code=404, detail="Event not found")
                    return True
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def get_for_trip(self, trip_id: int, user_id: int) -> List[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(EventOut)) as cur:
                    cur.execute(
                        """
                        SELECT events.*
                        FROM events
                        JOIN trips ON events.trip_id = trips.id
                        WHERE trips.user_id = %s AND trips.id = %s;
                        """,
                        [user_id, trip_id]
                    )
                    events = cur.fetchall()
                    return events
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")
