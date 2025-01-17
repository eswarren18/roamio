import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


function Trip() {
    const { isLoggedIn } = useContext(AuthContext);
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState([]);
    const [flights, setFlights] = useState([]);
    const [lodgings, setLodgings] = useState([]);
    const [events, setEvents] = useState([]);

    const fetchTrip = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/trips/${tripId}`, {credentials: "include", headers: {"Content-Type": "application/json"}});
            if (response.ok) {
                const data = await response.json();
                setTrip(data)
            } else {
                navigate("/404NotFound")
            }
        } catch(e) {
            console.error(e)
        }
    }

    const fetchFlights = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/flights", {credentials: "include", headers: {"Content-Type": "application/json"}});
            if (response.ok) {
                const allFlights = await response.json();
                const tripFlights = []
                for (let flight of allFlights) {
                    if (flight.trip_id == tripId) {
                        tripFlights.push(flight)
                    }
                }
                setFlights(tripFlights)
            }
        } catch(e) {
            console.error(e)
        }
    }

    const fetchLodgings = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/lodgings", {credentials: "include", headers: {"Content-Type": "application/json"}});
            if (response.ok) {
                const allLodgings = await response.json();
                const tripLodgings = []
                for (let lodging of allLodgings) {
                    if (lodging.trip_id == tripId) {
                        tripLodgings.push(lodging)
                    }
                }
                setLodgings(tripLodgings)
            }
        } catch(e) {
            console.error(e)
        }
    }

    const fetchEvents = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/events`, {credentials: "include", headers: {"Content-Type": "application/json"}});
            if (response.ok) {
                const allEvents = await response.json();
                const tripEvents = []
                for (let event of allEvents) {
                    if (event.trip_id == tripId) {
                        tripEvents.push(event)
                    }
                }
                setEvents(tripEvents)
            }
        } catch(e) {
            console.error(e)
        }
    }

    const navToHome = () => {
        if (!isLoggedIn) {
            navigate("/")
        }
    }

    useEffect(() => {
        navToHome();
        fetchTrip();
        fetchFlights();
        fetchLodgings();
        fetchEvents();
    },[]);

    return (
        <div>
        <div className="flex">
            <h1 className="font-bold">{trip.title}</h1>
            <p>{trip.city}, {trip.country}</p>
        </div>
        <div>
            <h1 className="font-bold">Flights</h1>
            {flights.map((flight) => (
                <div key={flight.id}>
                    <p>{flight.flight_number}</p>
                </div>
            ))}
        </div>
        <div>
            <h1 className="font-bold">Lodgings</h1>
            {lodgings.map((lodging) => (
                <div key={lodging.id}>
                    <p>{lodging.name}</p>
                </div>
            ))}
        </div>
        <div>
            <h1 className="font-bold">Events</h1>
            {events.map((event) => (
                <div key={event.id}>
                    <p>{event.name}</p>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Trip;
