from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from typing import List
from models.users import UserResponse
from models.packing_list import PackingListIn, PackingListOut
from queries.packing_list_queries import PackingListQueries
from utils.authentication import try_get_jwt_user_data

router = APIRouter(tags=["Packing List"], prefix="/api/packing_list")

@router.post("", response_model=PackingListOut)
async def create_trip(
    packing_list: PackingListIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PackingListQueries = Depends()
) -> PackingListOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    new_packing_list = queries.create(packing_list, user.id)
    return new_packing_list
