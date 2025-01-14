from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from typing import List
from models.users import UserResponse
from models.events import EventIn, EventOut
from api.queries.event_queries import EventsQueries
from utils.authentication import try_get_jwt_user_data

router = APIRouter(tags=["Events"], prefix="/api/events")

@router.post("", response_model=EventOut)
async def create_flight(
    event: EventIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: EventsQueries = Depends()
) -> EventOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    new_event = queries.create(event, user.id)
    return new_event

# @router.put("/{flight_id}", response_model=FlightOut)
# async def update_flight(
#     flight_id: int,
#     flight: FlightIn,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     queries: FlightsQueries = Depends()
# ) -> FlightOut:
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
#         )
#     updated_flight = queries.update(flight_id, flight, user.id)
#     return updated_flight

# @router.get("", response_model=List[FlightOut])
# async def get_flights(
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     queries: FlightsQueries = Depends()
# ) -> List[FlightOut]:
#     flights = queries.get_all(user.id)
#     return flights

# @router.delete("/{flight_id}", response_model=bool)
# async def delete_flight(
#     flight_id: int,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     queries: FlightsQueries = Depends()
# ) -> bool:
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
#         )
#     return queries.delete(flight_id, user.id)
