import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { ModalContext } from './ModalProvider';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
const apiKey = import.meta.env.GOOGLE_API_KEY;

// The Dashboard component displays all the user's trips
function Dashboard() {
    const { toggleModal } = useContext(ModalContext);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [selectedTrips, setSelectedTrips] = useState([]);
    const [activeButton, setActiveButton] = useState(localStorage.getItem('activeButton') || 'upcoming');
    const [mapMarkers, setMapMarkers] = useState([]);


    const navToHome = () => {if (!isLoggedIn) {navigate("/")}}

    // Fetches all the users trips from the db
    const fetchTrips = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/trips", {credentials: "include", headers: {"Content-Type": "application/json"}});
            if (response.ok) {
                const data = await response.json();
                setTrips(data);
            }
        } catch(e) {
            console.error(e)
        }
    }

    // Fetches latitude and longitude information for each trip from Google's Geocoding API
    const fetchLatLng = async () => {
        try {
            const markers = []
            for (let trip of trips) {
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${trip.city},${trip.country}&key=${apiKey}`)
                if (response.ok) {
                    const data = await response.json();
                    markers.push(data.results[0].geometry.location)
                }
            }
            setMapMarkers(markers);
        } catch(e) {
            console.error(e)
        }
    }

    // Filters the trip cards visible on the page
    const handleTripSelection = (selection) => {
        const todaysDate = new Date().toISOString().split('T')[0];
        let filteredTrips = [];
        switch (selection) {
            case "upcoming":
                filteredTrips = trips.filter(trip => trip.end_date >= todaysDate);
                setActiveButton("upcoming")
                setSelectedTrips(filteredTrips);
                break;
            case "past":
                filteredTrips = trips.filter(trip => trip.end_date < todaysDate);
                setActiveButton("past")
                setSelectedTrips(filteredTrips);
                break;
            default:
                setActiveButton("all")
                setSelectedTrips(trips);
        }
        localStorage.setItem('activeButton', selection);
    }

    useEffect(() => {
        navToHome();
    }, [isLoggedIn]);

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        handleTripSelection(activeButton);
    }, [trips, activeButton]);

    useEffect(() => {
        if (trips.length > 0) {
            fetchLatLng();
        }
    }, [trips]);

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] w-full">
            {/* Google map with trip markers */}
            <div id="map" className="w-full h-[50vh]">
                <APIProvider apiKey={apiKey}>
                    <Map
                        style={{ width: "100%", height: "100%" }}
                        defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
                        defaultZoom={3}
                    >
                        {mapMarkers.map((mapMarker, index) => {
                            return (
                                <Marker key={index} position={mapMarker} />
                            )
                        })}
                    </Map>
                </APIProvider>
            </div>

            <div className="mt-2">
                {/* Filter tabs for trip cards */}
                <div className="flex flex-col items-center top-0 w-full z-10">
                    <div
                        id="filter"
                        className="flex flex-wrap content-start mb-2 w-1/8 text-xl font-medium text-cyan-100 border-b border-cyan-100"
                    >
                        <button
                            className={`mx-2 inline-block px-4 py-2 rounded-t-lg ${activeButton === "all"
                                ? "text-cyan-900 bg-cyan-100 active"
                                : "bg-cyan-900 text-cyan-100 hover:bg-cyan-800"
                            }`}
                            onClick={() => handleTripSelection("all")}
                        >
                            All
                        </button>
                        <button
                            className={`mx-2 inline-block px-4 py-2 rounded-t-lg ${activeButton === "upcoming"
                                ? "text-cyan-900 bg-cyan-100 active"
                                : "bg-cyan-900 text-cyan-100 hover:bg-cyan-800"
                            }`}
                            onClick={() => handleTripSelection("upcoming")}
                        >
                            Upcoming
                        </button>
                        <button
                            className={`mx-2 inline-block px-4 py-2 rounded-t-lg ${activeButton === "past"
                                ? "text-cyan-900 bg-cyan-100 active"
                                : "bg-cyan-900 text-cyan-100 hover:bg-cyan-800"
                            }`}
                            onClick={() => handleTripSelection("past")}
                        >
                            Past
                        </button>
                    </div>
                </div>
                {/* Trip cards */}
                <div className="scrollbar-hidden flex flex-col items-center w-full h-[calc(100vh-4rem-50vh)] overflow-y-scroll">
                    <div
                        id="trip-cards"
                        className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full"
                    >
                        {selectedTrips.map((trip) => (
                            <button
                                key={trip.id}
                                className="flex flex-col relative text-cyan-100 rounded-lg m-4 transform
                                hover:bg-cyan-200 hover:scale-105 hover:ring-2 hover:ring-cyan-500
                                transition-all duration-200 h-60"
                                onClick={() => navigate(`/trip/${trip.id}`)}
                            >
                                <img className="object-cover w-full h-full rounded-lg" src={trip.trip_image}></img>
                                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end rounded-lg bg-gradient-to-t from-black/90 to-transparent drop-shadow">
                                    <div className="flex flex-col items-center justify-center w-full h-2/3 px-2">
                                        <h1 className="font-bold text-2xl">{trip.title}</h1>
                                        <p className="pt-2">
                                            {trip.city}, {trip.country}
                                        </p>
                                    </div>
                                    <div className="flex flex-col absolute justify-center w-full px-2">
                                        <div className="border-t border-cyan-100 w-3/4 mx-auto justify-center"></div>
                                        <p className="my-2">
                                            {trip.start_date} - {trip.end_date}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                        <button
                            className="flex flex-col relative text-cyan-100 rounded-lg m-4 transform
                            hover:bg-cyan-200 hover:scale-105 hover:ring-2 hover:ring-cyan-500
                            transition-all duration-200 h-60"
                            onClick={() => toggleModal({ form: "AddTripModal" })}
                        >
                            <img className="object-cover w-full h-full rounded-lg" src="/passport-stamps.png" alt="Passport Stamps Stock Image"></img>
                            <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end rounded-lg bg-gradient-to-t from-black/90 to-transparent drop-shadow">
                                <div className="flex flex-col items-center justify-center w-full h-2/3 px-2">
                                    <h1 className="font-bold text-2xl pb-8">Add a Trip</h1>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    export default Dashboard;
