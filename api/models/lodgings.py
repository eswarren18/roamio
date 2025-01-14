from pydantic import BaseModel
from datetime import datetime


class LodgingIn(BaseModel):
    """
    Represents the parameters needed to create a new Lodging
    """
    name: str
    address: str
    check_in: datetime
    check_out: datetime
    trip_id: int

class LodgingOut(BaseModel):
    """
    Represents a Lodging
    """
    id: int
    name: str
    address: str
    check_in: datetime
    check_out: datetime
    trip_id: int
