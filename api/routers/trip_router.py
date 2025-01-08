from fastapi import APIRouter, HTTPException, Depends
from database import get_db
from models.trips import TripRequest, TripResponse

router = APIRouter()

# Interacting with all Trips
@router.post("/api/users/{user_id}/trips", response_model=TripResponse)
def create_trip(trip: TripRequest, db=Depends(get_db)):
    query = """
        INSERT INTO trips (title, country, city, start_date, end_date, trip_image, user_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id, title, country, city, start_date, end_date, trip_image, user_id;
    """
    values = (trip.title, trip.country, trip.city, trip.start_date, trip.end_date, trip.user_id)
    try:
        db.execute(query, values)
        new_trip = db.fetchone()
        return new_trip
    except psycopg2.IntegrityError:
        raise HTTPException(status_code=400, detail="User not found.")


# @router.get("/api//trips")


# Interacting with specific Trip
# @router.get("/api/trip/{id:int}")

# @router.put("/api/trip/{id:int}")

# @router.delete("/api/trip/{id:int}")
