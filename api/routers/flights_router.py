from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from typing import List
from models.users import UserResponse
from models.flights import FlightIn, FlightOut
from queries.flights_queries import FlightsQueries
from utils.authentication import try_get_jwt_user_data

router = APIRouter(tags=["Flights"], prefix="/api/flights")

@router.post("", response_model=FlightOut)
async def create_flight(
    flight: FlightIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: FlightsQueries = Depends()
) -> FlightOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    new_flight = queries.create(flight)
    return new_flight
