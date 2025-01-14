from pydantic import BaseModel
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
