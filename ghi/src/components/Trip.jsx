import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { ModalContext } from './ModalProvider';
import Accordion from './Accordion';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
const apiKey = import.meta.env.GOOGLE_API_KEY;

function Trip() {
    const { isLoggedIn } = useContext(AuthContext);
    const { tripId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [trip, setTrip] = useState({});
    const [tripData, setTripData] = useState({});
    const { toggleModal } = useContext(ModalContext);
    const [mapMarkers, setMapMarkers] = useState([]);
    const [defaultCenter, setDefaultCenter] = useState();
    const [defaultZoom, setDefaultZoom] = useState();

    const navToHome = () => {if (!isLoggedIn) {navigate("/")}}

    const fetchTripData = async () => {
        try {
            const [tripRes, flightsRes, lodgingsRes, eventsRes] = await Promise.all([
                fetch(`http://localhost:8000/api/trips/${tripId}`, { credentials: "include", headers: {"Content-Type": "application/json"} }),
                fetch(`http://localhost:8000/api/trips/${tripId}/flights`, { credentials: "include", headers: {"Content-Type": "application/json"} }),
                fetch(`http://localhost:8000/api/trips/${tripId}/lodgings`, { credentials: "include", headers: {"Content-Type": "application/json"} }),
                fetch(`http://localhost:8000/api/trips/${tripId}/events`, { credentials: "include", headers: {"Content-Type": "application/json"} })
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
                const combinedLatLngData = [...lodgingsData, ...eventsData];

                let markers;
                if (combinedLatLngData.length > 0) {
                    markers = await Promise.all(combinedLatLngData.map( (activity)=> {
                        return fetchLatLng(activity)
                    }));
                } else {
                    const marker = fetchLatLng({ address: `${tripData.city}, ${tripData.country}` });
                    markers = [marker]
                }
                setMapMarkers(markers)
                findCenterAndZoom(markers)
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fetchLatLng = async (activity) => {
        try {
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${activity.address}&key=${apiKey}`)
                if (response.ok) {
                    const data = await response.json();
                    return data.results[0].geometry.location;
                }
            } catch(e) {
            console.error(e)
        }
    }

    const findCenterAndZoom = (markers) => {
        if (markers.length === 0) {
            setDefaultCenter({lat: 33.8, lng: -97.7});
            return;
        }

        const center = markers.reduce((acc, marker) => ({
            lat: acc.lat + marker.lat,
            lng: acc.lng + marker.lng
        }), { lat: 0, lng: 0 });

        center.lat /= markers.length;
        center.lng /= markers.length;
        setDefaultCenter(center);
        setDefaultZoom(10);
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
            if (tripAccordionData[dateKey]) {
                tripAccordionData[dateKey].push({ ...item, type });
            }
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

    useEffect(() => {navToHome()},[isLoggedIn]);

    useEffect(() => {fetchTripData()},[location.pathname, toggleModal]);

    return (
        <div className="flex flex-row m-8">
            <div className="w-1/2">
                <div className="relative mb-4 h-60 group">
                    <img className="object-cover w-full h-full rounded-lg" src={trip.trip_image}></img>
                    <div className="flex flex-row justify-between">
                        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent p-4 rounded-t-lg rounded-b-lg overflow-hidden">
                            <div className="flex flex-col text-cyan-100">
                                <h1 className="font-bold text-6xl">{trip.title}</h1>
                                <p className="text-cyan-100">{trip.start_date} - {trip.end_date}</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => toggleModal({form:"EditTripModal", data:tripData, id:tripId})}
                                >
                                    <img src="/public/edit-icon-100.svg" alt="Edit" className="w-10 h-10" />
                                </button>
                                <button
                                    onClick={() => toggleModal({form:"DeleteActivityModal", id:tripId, type:"trips"})}
                                >
                                    <img src="/public/delete-icon-100.svg" alt="Delete" className="w-10 h-10" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 rounded-lg bg-cyan-100 text-cyan-900">
                    <div className="flex justify-between items-center">
                        <div className="py-4 font-bold text-4xl">
                            Trip Itinerary
                        </div>
                        <div className="relative inline-block group z-10">
                            <div className="flex items-center bg-cyan-100 text-cyan-900 cursor-pointer">
                                <span className="text-3xl mr-1">+</span>
                                <span className="pt-1 hover:underline">Add an Activity</span>
                            </div>
                            <div className="absolute w-48 bg-white border rounded-lg shadow-lg opacity-0 pointer-events-none
                                group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => toggleModal({form:"AddEventModal", id:tripId, data:tripData })}
                                >
                                    Add Event
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => toggleModal({form:"AddFlightModal", id:tripId, data:tripData })}
                                >
                                    Add Flight
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => toggleModal({form:"AddLodgingModal", id:tripId, data:tripData })}
                                >
                                    Add Lodging
                                </button>
                            </div>
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
            <div className="w-1/2 pl-8">
            {defaultCenter && (
                <APIProvider apiKey={apiKey}>
                    <Map
                        style={{ width: '100%', height: '100%'}}
                        defaultCenter={defaultCenter}
                        defaultZoom={defaultZoom}
                    >
                    { }
                        {mapMarkers.map((mapMarker, index) => {
                            return (
                                <Marker key={index} position={mapMarker} />
                            )
                        })}
                    </Map>
                </APIProvider>
            )}
            </div>
        </div>
    )
}

export default Trip;
