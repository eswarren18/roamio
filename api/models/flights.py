from pydantic import BaseModel, field_validator
from datetime import datetime


class FlightIn(BaseModel):
    """
    Represents the parameters needed to create a new flight
    """
    flight_number: str
    departure_time: datetime
    arrival_time: datetime
    trip_id: int

    @field_validator("departure_time", "arrival_time", mode="before")
    def truncate_microseconds(value: datetime) -> datetime:
        return (value.replace(microsecond=0)
                if isinstance(value, datetime)
                else value)


class FlightOut(BaseModel):
    """
    Represents a flight
    """
    id: int
    flight_number: str
    departure_time: datetime
    arrival_time: datetime
    trip_id: int

    @field_validator("departure_time", "arrival_time", mode="before")
    def truncate_microseconds(value: datetime) -> datetime:
        return (value.replace(microsecond=0)
                if isinstance(value, datetime)
                else value)
