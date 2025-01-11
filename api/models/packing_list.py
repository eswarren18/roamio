from pydantic import BaseModel


class PackingListIn(BaseModel):
    title: str
    template: bool = True

class PackingListOut(BaseModel):
    id: int
    title: str
    template: bool = True
    user_id: int
