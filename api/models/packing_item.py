from pydantic import BaseModel
from typing import Optional

class PackingItemIn(BaseModel):
    name: str
    category: Optional[str]
    notes: Optional[str]
    packed: bool = False
    purchase: bool = False

class PackingItemOut(BaseModel):
    id: int
    name: str
    category: Optional[str]
    notes: Optional[str]
    packed: bool = False
    purchase: bool = False
    packing_list_id: int
