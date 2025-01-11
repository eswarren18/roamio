import os
from queries.pool import pool
from typing import List, Optional, Union, Annotated
from models.packing_list import PackingListIn, PackingListOut
from psycopg.rows import class_row
from fastapi import HTTPException, status


class PackingListQueries:
    def create(self, packing_list: PackingListIn, user_id: int) -> PackingListOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(PackingListOut)) as cur:
                    cur.execute(
                        """
                        INSERT INTO packing_list
                            (title, user_id)
                        VALUES
                            (%s, %s)
                        RETURNING *;
                        """,
                        [
                            packing_list.title,
                            user_id
                        ]
                    )
                    new_packing_list = cur.fetchone()
                    return new_packing_list
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")
