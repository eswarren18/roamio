import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Accordion from './Accordion';

// function AccordionItem({title, content, isExpanded, onToggle}) {
//         return (
//             <div className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-20"}`}>
//                 <div className="flex justify-between items-start p-6 cursor-pointer" onClick={onToggle}>
//                 <div className="text-2xl font-bold">{title}</div>
//                 </div>

//             <div className={`px-5 pb-5 overflow-hidden transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
//                 <div>{content}</div>
//             </div>
//             </div>
//         )
// }

function Trip() {
    const { isLoggedIn } = useContext(AuthContext);
    const { tripId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [trip, setTrip] = useState({});
    const [flights, setFlights] = useState([]);
    const [lodgings, setLodgings] = useState([]);
    const [events, setEvents] = useState([]);
    const [tripDates, setTripDates] = useState([])

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

    const getTripDates = async () => {
        const startDate = new Date (trip.start_date); // Example start date
        const endDate = new Date (trip.end_date);   // Example end date

        const tripRange = []
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            tripRange.push(d.toISOString().split("T")[0]); // Prints YYYY-MM-DD format
        }
        setTripDates(tripRange)
    }

    useEffect(() => {
        navToHome();
        fetchTrip();
        fetchFlights();
        fetchLodgings();
        fetchEvents();
        getTripDates();
    },[location.pathname]);

    useEffect(() => {
        getTripDates();
    },[trip]);

    return (
        <div className="flex flex-row m-8">
            <div className="w-1/2">
                <div className="relative mb-4 h-60">
                    <img className="object-cover w-full h-full rounded-lg" src={trip.trip_image}></img>
                    <div className="text-cyan-900 absolute top-0 left-0 w-full h-full flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 rounded-t-lg rounded-b-lg overflow-hidden">
                        <h1 className="font-bold text-cyan-100 text-6xl">{trip.title}</h1>
                        <p className="text-cyan-100">{trip.start_date} - {trip.end_date}</p>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-cyan-100">
                    {tripDates.map((tripDate) => (
                        <Accordion
                            key={tripDate}
                            header={tripDate}
                            content="Insert event, flight, and lodging cards here!"
                        />
                    ))}
                </div>
            </div>
            <div className="text-cyan-100 w-1/2 p-8">
                Insert Google map here
            </div>
        </div>
    )
}

export default Trip;



        // <div>
        //     <h1 className="font-bold">Flights</h1>
        //     {flights.map((flight) => (
        //         <div key={flight.id}>
        //             <p>{flight.flight_number}</p>
        //         </div>
        //     ))}
        // </div>
        // <div>
        //     <h1 className="font-bold">Lodgings</h1>
        //     {lodgings.map((lodging) => (
        //         <div key={lodging.id}>
        //             <p>{lodging.name}</p>
        //         </div>
        //     ))}
        // </div>
        // <div>
        //     <h1 className="font-bold">Events</h1>
        //     {events.map((event) => (
        //         <div key={event.id}>
        //             <p>{event.name}</p>
        //         </div>
        //     ))}
        // </div>
