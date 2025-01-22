from pydantic import BaseModel, field_validator
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

    @field_validator("check_in", "check_out", mode="before")
    def truncate_microseconds(value: datetime) -> datetime:
        return value.replace(microsecond=0) if isinstance(value, datetime) else value

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

    @field_validator("check_in", "check_out", mode="before")
    def truncate_microseconds(value: datetime) -> datetime:
        return value.replace(microsecond=0) if isinstance(value, datetime) else value
