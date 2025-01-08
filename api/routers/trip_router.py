from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status
)
from models.users import UserResponse
from models.trips import TripRequest, TripResponse
from queries.trip_queries import TripsQueries
from utils.authentication import try_get_jwt_user_data

router = APIRouter()

# Interacting with all Trips
@router.post("/api/users/{user_id}/trips", response_model=TripResponse)
async def create_trip(
    user_id: int,
    trip: TripRequest,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: TripsQueries = Depends()
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    new_trip = queries.create(trip, user_id)
    return new_trip


# @router.get("/api//trips")


# Interacting with specific Trip
# @router.get("/api/trip/{id:int}")

# @router.put("/api/trip/{id:int}")

# @router.delete("/api/trip/{id:int}")
