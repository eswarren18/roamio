from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from typing import List
from models.users import UserResponse
from models.trips import TripIn, TripOut
from queries.trip_queries import TripsQueries
from utils.authentication import try_get_jwt_user_data
