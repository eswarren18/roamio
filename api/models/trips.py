from pydantic import BaseModel, field_validator
from datetime import date
from typing import Dict, List
from models.flights import FlightOut
from models.lodgings import LodgingOut
from models.events import EventOut


class TripIn(BaseModel):
    """
    Represents a the parameters needed to create a new trip
    """
    title: str
    country: str
    city: str
    start_date: date
    end_date: date
    trip_image: str

    @field_validator("trip_image", mode="before")
    def set_default_trip_image(cls, value):
        if not value:
            return "/passport-stamps.png"
        return value


class TripOut(BaseModel):
    """
    Represents a trip
    """
    id: int
    title: str
    country: str
    city: str
    start_date: date
    end_date: date
    trip_image: str
    user_id: int


class TripDetailsOut(BaseModel):
    """
    Represents a trip with its details (flights, events, lodgings)
    """
    id: int
    title: str
    country: str
    city: str
    start_date: date
    end_date: date
    trip_image: str
    user_id: int
    details: Dict[str, List[FlightOut | EventOut | LodgingOut]]
