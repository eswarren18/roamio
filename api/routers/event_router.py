from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from typing import List
from models.users import UserResponse
from models.events import EventIn, EventOut
from queries.event_queries import EventsQueries
from utils.authentication import try_get_jwt_user_data

router = APIRouter(tags=["Events"], prefix="/api")


@router.post("/events", response_model=EventOut)
async def create_event(
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


@router.put("/events/{event_id}", response_model=EventOut)
async def update_event(
    event_id: int,
    event: EventIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: EventsQueries = Depends()
) -> EventOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    updated_event = queries.update(event_id, event, user.id)
    return updated_event


@router.delete("/events/{event_id}", response_model=bool)
async def delete_event(
    event_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: EventsQueries = Depends()
) -> bool:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    return queries.delete(event_id, user.id)


@router.get("/events/{event_id}", response_model=EventOut)
async def get_event(
    event_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: EventsQueries = Depends()
) -> EventOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    events = queries.get_for_event(event_id, user.id)
    return events
