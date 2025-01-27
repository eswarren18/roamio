from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from typing import List
from models.users import UserResponse
from models.flights import FlightIn, FlightOut
from queries.flight_queries import FlightsQueries
from utils.authentication import try_get_jwt_user_data

router = APIRouter(tags=["Flights"], prefix="/api")


@router.post("/flights", response_model=FlightOut)
async def create_flight(
    flight: FlightIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: FlightsQueries = Depends()
) -> FlightOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    new_flight = queries.create(flight, user.id)
    return new_flight


@router.put("/flights/{flight_id}", response_model=FlightOut)
async def update_flight(
    flight_id: int,
    flight: FlightIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: FlightsQueries = Depends()
) -> FlightOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    updated_flight = queries.update(flight_id, flight, user.id)
    return updated_flight


@router.delete("/flights/{flight_id}", response_model=bool)
async def delete_flight(
    flight_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: FlightsQueries = Depends()
) -> bool:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    return queries.delete(flight_id, user.id)


@router.get("/trips/{trip_id}/flights", response_model=List[FlightOut])
async def get_flights(
    trip_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: FlightsQueries = Depends()
) -> List[FlightOut]:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    flights = queries.get_for_trip(trip_id, user.id)
    return flights


@router.get("/flights/{flight_id}", response_model=FlightOut)
async def get_flight(
    flight_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: FlightsQueries = Depends()
) -> FlightOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    flights = queries.get_for_flight(flight_id, user.id)
    return flights
