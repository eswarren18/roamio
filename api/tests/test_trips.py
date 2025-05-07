from fastapi import HTTPException
from fastapi.testclient import TestClient
from main import app
from queries.trip_queries import TripsQueries
from models.trips import TripOut
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data
from datetime import date

client = TestClient(app)


class EmptyTripsQueries:
    def get_all(self, user_id):
        return []


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


class MockTripsQueries:
    def get_one(self, trip_id: int, user_id: int):
        return TripOut(
            id=1,
            title="Mock Trip",
            country="Mock Country",
            city="Mock City",
            start_date=date(2025, 5, 1),
            end_date=date(2025, 5, 15),
            trip_image="mock_image.png",
            user_id=1
        )

    def update(self, trip_id: int, trip_in, user_id: int):
        return TripOut(
            id=trip_id,
            title=trip_in.title,
            country=trip_in.country,
            city=trip_in.city,
            start_date=trip_in.start_date,
            end_date=trip_in.end_date,
            trip_image=trip_in.trip_image,
            user_id=user_id
        )


class TrueDeleteQueries:
    def delete(self, trip_id, user_id):
        return True


class FalseDeleteQueries:
    def delete(self, trip_id, user_id):
        raise HTTPException(status_code=404, detail="Trip not found")


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


def test_get_one():
    # Arrange
    app.dependency_overrides[TripsQueries] = MockTripsQueries
    trip_id = 1
    user_id = 1
    # Act
    trip = MockTripsQueries().get_one(trip_id, user_id)
    # Assert
    assert trip.id == 1
    assert trip.title == "Mock Trip"
    assert trip.country == "Mock Country"
    assert trip.city == "Mock City"
    assert trip.start_date == date(2025, 5, 1)
    assert trip.end_date == date(2025, 5, 15)
    assert trip.trip_image == "mock_image.png"
    assert trip.user_id == 1


def test_update_trip():
    # Arrange
    app.dependency_overrides[try_get_jwt_user_data] = fake_get_jwt_user_data
    app.dependency_overrides[TripsQueries] = MockTripsQueries
    json = {
        "title": "Updated Trip",
        "country": "Updated Country",
        "city": "Updated City",
        "start_date": "2025-02-01",
        "end_date": "2025-02-07",
        "trip_image": "updated.jpg"
    }
    expected = {
        "id": 1,
        "title": "Updated Trip",
        "country": "Updated Country",
        "city": "Updated City",
        "start_date": "2025-02-01",
        "end_date": "2025-02-07",
        "trip_image": "updated.jpg",
        "user_id": 1
    }

    # Act
    response = client.put("/api/trips/1", json=json)
    # Clean-up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_delete_trip_true():
    # Arrange
    trip_id = 1
    app.dependency_overrides[try_get_jwt_user_data] = fake_get_jwt_user_data
    app.dependency_overrides[TripsQueries] = TrueDeleteQueries

    # Act
    response = client.delete(f"/api/trips/{trip_id}")

    # Clean-up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() is True


def test_delete_trip_false():
    # Arrange
    trip_id = 1
    app.dependency_overrides[try_get_jwt_user_data] = fake_get_jwt_user_data
    app.dependency_overrides[TripsQueries] = FalseDeleteQueries
    expected = {"detail": "Trip not found"}

    # Act
    response = client.delete(f"/api/trips/{trip_id}")

    # Clean-up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 404
    assert response.json() == expected
