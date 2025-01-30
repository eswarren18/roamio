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

class NonEmptyTripsQueries:
    def get_all(self, user_id):
        return [
            {
                "id": 1,
                "title": "Test Trip 1",
                "country": "Country 1",
                "city": "City 1",
                "start_date": "2025-01-30",
                "end_date": "2025-02-05",
                "trip_image": "image1.png",
                "user_id": user_id
            }
        ]

def fake_get_jwt_user_data():
    return UserResponse(id=1, username="testuser")

def test_get_empty_trips():
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
        "city": "Test City",
        "start_date": "2025-01-30",
        "end_date": "2025-01-30",
        "trip_image": "string"
    }
    expected = {
            "id": 1,
            "title": "Test Trip Creation",
            "country": "Test Country",
            "city": "Test City",
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

def test_get_non_empty_trips():
    # Arrange
    app.dependency_overrides[TripsQueries] = NonEmptyTripsQueries
    app.dependency_overrides[try_get_jwt_user_data] = fake_get_jwt_user_data
    expected = [
        {
            "id": 1,
            "title": "Test Trip 1",
            "country": "Country 1",
            "city": "City 1",
            "start_date": "2025-01-30",
            "end_date": "2025-02-05",
            "trip_image": "image1.png",
            "user_id": 1
        }
    ]
    # Act
    response = client.get("/api/trips")
    # Clean-up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected
