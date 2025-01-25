from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from typing import List
from models.users import UserResponse
from models.lodgings import LodgingIn, LodgingOut
from queries.lodging_queries import LodgingsQueries
from utils.authentication import try_get_jwt_user_data

router = APIRouter(tags=["Lodgings"], prefix="/api")

@router.post("/lodgings", response_model=LodgingOut)
async def create_lodging(
    lodging: LodgingIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: LodgingsQueries = Depends()
) -> LodgingOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    new_lodging = queries.create(lodging, user.id)
    return new_lodging

@router.put("/lodgings/{lodging_id}", response_model=LodgingOut)
async def update_lodging(
    lodging_id: int,
    lodging: LodgingIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: LodgingsQueries = Depends()
) -> LodgingOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    updated_lodging = queries.update(lodging_id, lodging, user.id)
    return updated_lodging

@router.delete("/lodgings/{lodging_id}", response_model=bool)
async def delete_lodging(
    lodging_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: LodgingsQueries = Depends()
) -> bool:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    return queries.delete(lodging_id, user.id)

@router.get("/trips/{trip_id}/lodgings", response_model=List[LodgingOut])
async def get_lodgings(
    trip_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: LodgingsQueries = Depends()
) -> List[LodgingOut]:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    lodgings = queries.get_for_trip(trip_id, user.id)
    return lodgings

@router.get("/lodgings/{lodging_id}", response_model=LodgingOut)
async def get_lodging(
    lodging_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: LodgingsQueries = Depends()
) -> LodgingOut:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    lodgings = queries.get_for_lodging(lodging_id, user.id)
    return lodgings
