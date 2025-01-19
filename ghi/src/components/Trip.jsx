import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

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
    const [tripAccordion, setTripAccordion] = useState([])

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
            addDataToDate({ ...lodging, isCheckOut: false }, 'lodging', checkInKey);

            const checkOutKey = lodging.check_out.split("T")[0];
            if (checkOutKey !== checkInKey) {
                addDataToDate({ ...lodging, isCheckOut: true }, 'lodging', checkOutKey);
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


        console.log(tripAccordionData)
        setTripAccordion(tripAccordionData);
    };


    useEffect(() => {
        navToHome();
        fetchTripData();
    },[location.pathname]);


    return (
        <div>
            <div className="flex">
                <h1 className="font-bold">{trip.title}</h1>
                <p>{trip.city}, {trip.country}</p>
            </div>
        </div>
    )
}

export default Trip;
