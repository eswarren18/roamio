import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

import Accordion from './Accordion';

function Trip() {
    const { isLoggedIn } = useContext(AuthContext);
    const { tripId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [trip, setTrip] = useState({});
    const [tripData, setTripData] = useState({});

    const fetchTripData = async () => {
        try {
            const [tripRes, flightsRes, lodgingsRes, eventsRes] = await Promise.all([
                fetch(`http://localhost:8000/api/trips/${tripId}`, { credentials: "include", headers: {"Content-Type": "application/json"} }),
                fetch(`http://localhost:8000/api/flights/${tripId}`, { credentials: "include", headers: {"Content-Type": "application/json"} }),
                fetch(`http://localhost:8000/api/lodgings/${tripId}`, { credentials: "include", headers: {"Content-Type": "application/json"} }),
                fetch(`http://localhost:8000/api/events/${tripId}`, { credentials: "include", headers: {"Content-Type": "application/json"} })
            ]);

            if (tripRes.ok && flightsRes.ok && lodgingsRes.ok && eventsRes.ok) {
                const [tripData, flightsData, lodgingsData, eventsData] = await Promise.all([
                    tripRes.json(),
                    flightsRes.json(),
                    lodgingsRes.json(),
                    eventsRes.json()
                ]);

                setTrip(tripData);
                setupAccordion(tripData, flightsData, lodgingsData, eventsData);
            } else {
                navigate("/404NotFound");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const navToHome = () => {
        if (!isLoggedIn) {
            navigate("/")
        }
    }

    const setupAccordion = (tripData, flights, lodgings, events) => {
        const startDate = new Date(tripData.start_date);
        const endDate = new Date(tripData.end_date);
        const tripAccordionData = {};

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split("T")[0];
            tripAccordionData[dateKey] = [];
        }

        const addDataToDate = (item, type, dateKey) => {
            tripAccordionData[dateKey].push({ ...item, type });
        };

        flights.forEach(flight => {
            const dateKey = flight.arrival_time.split("T")[0];
            addDataToDate(flight, 'flight', dateKey);
        });

        lodgings.forEach(lodging => {
            const checkInKey = lodging.check_in.split("T")[0];
            addDataToDate({ ...lodging, isCheckOut: false }, 'lodging_check_in', checkInKey);

            const checkOutKey = lodging.check_out.split("T")[0];
            if (checkOutKey !== checkInKey) {
                addDataToDate({ ...lodging, isCheckOut: true }, 'lodging_check_out', checkOutKey);
            }
        });

        events.forEach(event => {
            const dateKey = event.start_date_time.split("T")[0];
            addDataToDate(event, 'event', dateKey);
        });

        Object.keys(tripAccordionData).forEach(dateKey => {
            tripAccordionData[dateKey].sort((a, b) => {
                const aTime = new Date(a.arrival_time || (a.isCheckOut ? a.check_out : a.check_in) || a.start_date_time).getTime();
                const bTime = new Date(b.arrival_time || (b.isCheckOut ? b.check_out : b.check_in) || b.start_date_time).getTime();
                return aTime - bTime;
            });
        });

        setTripData(tripAccordionData);
    };

    useEffect(() => {
        navToHome();
        fetchTripData();
    },[location.pathname]);

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
                <div className="px-4 rounded-lg bg-cyan-100 text-cyan-900">
                    <div className="flex justify-between items-center">
                        <div className="py-4 font-bold text-4xl">
                            Trip Itinerary
                        </div>
                        <div
                            className="flex items-center bg-cyan-100 text-cyan-900 cursor-pointer"
                            onClick={() => {console.log("This should be a dropdown so users can either add a flight, event, or lodging")}}
                        >
                            <span className="text-3xl mr-1">+</span>
                            <span className="pt-1 hover:underline">Add an Activity</span>
                        </div>
                    </div>
                    {Object.entries(tripData).map(([date, activities]) => (
                        <Accordion
                            key={date}
                            header={date}
                            content={activities}
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



<button
    className="flex items-start bg-cyan-100 hover:bg-cyan-200 text-cyan-900 px-5 py-2 mt-3 border-2 border-cyan-900 rounded-full transition duration-200"
    onClick={(e) => {
        e.stopPropagation();
        console.log("Add a dropdown here that allows user to select adding a flight, event, or lodging");
    }}
>
    Add an Activity
</button>
