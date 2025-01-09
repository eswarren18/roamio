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
            return "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

class Error(BaseModel):
    message: str
