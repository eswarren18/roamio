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

router = APIRouter()

@router.post("/api/trips", response_model=TripOut)
async def create_trip(
    trip: TripIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TripsQueries = Depends()
) -> TripOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    new_trip = queries.create(trip, user.id)
    return new_trip

@router.get("/api/trips", response_model=List[TripOut])
async def get_trips(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TripsQueries = Depends()
) -> List[TripOut]:
    trips = queries.get_all(user.id)
    return trips

@router.get("/api/trips/{trip_id}", response_model=TripOut)
async def get_trip(
    trip_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TripsQueries = Depends()
) -> TripOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    trip = queries.get_one(trip_id, user.id)
    return trip

@router.delete("/api/trips/{id:int}", response_model=bool)
async def delete_trip(
    id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TripsQueries = Depends()
) -> bool:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    return queries.delete(id)








# Interacting with specific Trip
# @router.get("/api/trip/{id:int}")

# @router.put("/api/trip/{id:int}")
