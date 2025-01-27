from pydantic import BaseModel, validator
from datetime import date


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

    @validator("trip_image", pre=True, always=True)
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
