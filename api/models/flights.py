from pydantic import BaseModel
from datetime import datetime


class FlightIn(BaseModel):
    """
    Represents the parameters needed to create a new flight
    """
    flight_number: str
    departure_time: datetime
    arrival_time: datetime
    trip_id: int

class FlightOut(BaseModel):
    """
    Represents a flight
    """
    id: int
    flight_number: str
    departure_time: datetime
    arrival_time: datetime
    trip_id: int
