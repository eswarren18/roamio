from fastapi.testclient import TestClient
from main import app
from queries.trip_queries import TripsQueries
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data

client = TestClient(app)

class EmptyTripsQueries:
    def get_all(self, user_id):
        return []

class CreateTripsQueries:
    def create(self, trip, user_id):
        result = {
            "id": 1,
            "title": "string",
            "country": "string",
            "city": "string",
            "start_date": "2025-01-30",
            "end_date": "2025-01-30",
            "trip_image": "string",
            "user_id": user_id
        }
        result.update(trip)
        return result

def fake_get_jwt_user_data():
    return UserResponse(id=1, username="testuser")

def test_get_trips():
    # Arrange
    app.dependency_overrides[TripsQueries] = EmptyTripsQueries
    app.dependency_overrides[try_get_jwt_user_data] = fake_get_jwt_user_data
    # Act
    response = client.get("/api/trips")
    # Clean-up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == []

def test_create_trips():
    # Arrange
    app.dependency_overrides[TripsQueries] = CreateTripsQueries
    app.dependency_overrides[try_get_jwt_user_data] = fake_get_jwt_user_data
    json = {
        "title": "Test Trip Creation",
        "country": "Test Country",
        "city": "string",
        "start_date": "2025-01-30",
        "end_date": "2025-01-30",
        "trip_image": "string"
    }
    expected = {
            "id": 1,
            "title": "Test Trip Creation",
            "country": "Test Country",
            "city": "string",
            "start_date": "2025-01-30",
            "end_date": "2025-01-30",
            "trip_image": "string",
            "user_id": 1
    }
    # Act
    response = client.post("/api/trips", json=json)
    # Clean-up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected
