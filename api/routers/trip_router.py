from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from models.users import UserResponse
from models.trips import TripIn, TripOut
from queries.trip_queries import TripsQueries
from utils.authentication import try_get_jwt_user_data

router = APIRouter()

# Interacting with all Trips
@router.post("/api/trips", response_model=TripOut)
async def create_trip(
    trip: TripIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TripsQueries = Depends()
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    new_trip = queries.create(trip, user.id)
    return new_trip


# Interact with a single trip instance
@router.get("/api/trip/{trip_id}", response_model=TripOut)
async def get_trip(
    trip_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TripsQueries = Depends()
) -> TripOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    trip = queries.get_one(trip_id)
    return trip








# Interacting with specific Trip
# @router.get("/api/trip/{id:int}")

# @router.put("/api/trip/{id:int}")

# @router.delete("/api/trip/{id:int}")
