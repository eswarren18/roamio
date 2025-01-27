
from queries.pool import pool
from typing import List
from models.lodgings import LodgingIn, LodgingOut
from psycopg.rows import class_row
from fastapi import HTTPException


class LodgingsQueries:
    def create(self, lodging: LodgingIn, user_id: int) -> LodgingOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(LodgingOut)) as cur:
                    cur.execute(
                        """
                        WITH trip_info AS
                        (
                            SELECT id
                            FROM trips
                            WHERE id = %s AND user_id = %s
                        )
                        INSERT INTO lodgings
                            (name, address, check_in, check_out, trip_id)
                        SELECT
                            %s, %s, %s, %s, trip_info.id
                        FROM trip_info
                        RETURNING *;
                        """,
                        [
                            lodging.trip_id,
                            user_id,
                            lodging.name,
                            lodging.address,
                            lodging.check_in,
                            lodging.check_out,
                        ]
                    )
                    new_lodging = cur.fetchone()
                    print(new_lodging)
                    if new_lodging is None:
                        raise HTTPException(
                            status_code=404,
                            detail="Trip not found"
                        )
                    return new_lodging
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )

    def update(self, lodging_id: int, lodging: LodgingIn, user_id: int) -> LodgingOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(LodgingOut)) as cur:
                    cur.execute(
                        """
                        WITH trip_info AS
                        (
                            SELECT id
                            FROM trips
                            WHERE id = %s AND user_id = %s
                        )
                        UPDATE lodgings
                        SET name = %s, address = %s, check_in = %s, check_out = %s
                        FROM trip_info
                        WHERE lodgings.id = %s AND lodgings.trip_id = trip_info.id
                        RETURNING lodgings.*;
                        """,
                        [
                            lodging.trip_id,
                            user_id,
                            lodging.name,
                            lodging.address,
                            lodging.check_in,
                            lodging.check_out,
                            lodging_id
                        ]
                    )
                    updated_lodging = cur.fetchone()
                    if updated_lodging is None:
                        raise HTTPException(
                            status_code=404,
                            detail="Trip not found"
                        )
                    return updated_lodging
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )

    def delete(self, lodging_id: int, user_id: int) -> bool:
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
                        DELETE FROM lodgings
                        USING trip_info
                        WHERE trip_info.id = lodgings.trip_id AND lodgings.id = %s
                        """,
                        [user_id, lodging_id]
                    )
                    if cur.rowcount == 0:
                        raise HTTPException(
                            status_code=404,
                            detail="Lodging not found"
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

    def get_for_trip(self, trip_id: int, user_id: int) -> List[LodgingOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(LodgingOut)) as cur:
                    cur.execute(
                        """
                        SELECT lodgings.*
                        FROM lodgings
                        JOIN trips ON lodgings.trip_id = trips.id
                        WHERE trips.user_id = %s AND trips.id = %s;
                        """,
                        [user_id, trip_id]
                    )
                    lodgings = cur.fetchall()
                    return lodgings
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )

    def get_for_lodging(self, lodging_id: int, user_id: int) -> LodgingOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(LodgingOut)) as cur:
                    cur.execute(
                        """
                        SELECT lodgings.*
                        FROM lodgings
                        JOIN trips ON lodgings.trip_id = trips.id
                        WHERE trips.user_id = %s AND lodgings.id = %s;
                        """,
                        [user_id, lodging_id]
                    )
                    lodging = cur.fetchone()
                    if lodging is None:
                        raise HTTPException(
                            status_code=404,
                            detail="Lodging not found"
                        )
                    return lodging
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )
