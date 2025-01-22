from pydantic import BaseModel, field_validator
from datetime import datetime


class EventIn(BaseModel):
    """
    Represents the parameters needed to create a new event
    """
    name: str
    start_date_time: datetime
    end_date_time: datetime
    location: str
    description: str
    trip_id: int

    @field_validator("start_date_time", "end_date_time", mode="before")
    def truncate_microseconds(value: datetime) -> datetime:
        return value.replace(microsecond=0) if isinstance(value, datetime) else value

class EventOut(BaseModel):
    """
    Represents a event
    """
    id: int
    name: str
    start_date_time: datetime
    end_date_time: datetime
    location: str
    description: str
    trip_id: int

    @field_validator("start_date_time", "end_date_time", mode="before")
    def truncate_microseconds(value: datetime) -> datetime:
        return value.replace(microsecond=0) if isinstance(value, datetime) else value
