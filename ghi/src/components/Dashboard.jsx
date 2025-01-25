import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { ModalContext } from './ModalProvider';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React from 'react';

function Dashboard() {
    const { toggleModal } = useContext(ModalContext);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [selectedTrips, setSelectedTrips] = useState([]);
    const [activeButton, setActiveButton] = useState("upcoming");
    const [mapMarkers, setMapMarkers] = useState([]);

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
   // console.log(apiKey);
    //console.log('All env variables:', import.meta.env);
    // const GoogleMap = () => {
    //     const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    const fetchTrips = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/trips", {credentials: "include", headers: {"Content-Type": "application/json"}});
            if (response.ok) {
                const data = await response.json();
                setTrips(data);
                setMapMarkers(data.flatMap(trip => trip.locations || []));
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
    }

    useEffect(() => {
        navToHome();
        fetchTrips();
    }, []);

    useEffect(() => {
        handleTripSelection("upcoming");
    }, [trips]);

    return (
        <div className="flex flex-col items-center m-8">
            <div
                id="map"
                className="w-full"
            >
                <APIProvider apiKey={apiKey}>
                    <Map
                        style={{ width: '100%', height: '400px' }}
                        defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
                        defaultZoom={10}
                    />
                    </APIProvider>

                    {/* <APIProvider apiKey={apiKey}>
                        <Map
                            style={{ width: "100%", height: "100%", borderRadius: "0.75rem" }}
                            defaultCenter={{ lat: 40.6993, lng: -99.0817 }}
                            defaultZoom={3}
                            gestureHandling={"greedy"}
                            disableDefaultUI={true}
                        />
                    </APIProvider> */}
            </div>

            <div
                id="filter"
                className="flex flex-wrap content-start mt-8 mb-2 w-1/8 text-2xl font-medium text-cyan-100 border-b border-cyan-100"
            >
                <button
                    className={`mr-2 inline-block p-4 rounded-t-lg ${activeButton === "all"
                        ? "text-cyan-900 bg-cyan-100 active"
                        : "bg-cyan-900 text-cyan-100 hover:bg-cyan-800"
                    }`}
                    onClick={() => handleTripSelection("all")}
                >
                    All
                </button>
                <button
                    className={`mr-2 inline-block p-4 rounded-t-lg ${activeButton === "upcoming"
                        ? "text-cyan-900 bg-cyan-100 active"
                        : "bg-cyan-900 text-cyan-100 hover:bg-cyan-800"
                    }`}
                    onClick={() => handleTripSelection("upcoming")}
                >
                    Upcoming
                </button>
                <button
                    className={`mr-2 inline-block p-4 rounded-t-lg ${activeButton === "past"
                        ? "text-cyan-900 bg-cyan-100 active"
                        : "bg-cyan-900 text-cyan-100 hover:bg-cyan-800"
                    }`}
                    onClick={() => handleTripSelection("past")}
                >
                    Past
                </button>
            </div>

            <div
                id="trip-cards"
                className="flex flex-wrap justify-center w-full"
            >
                {selectedTrips.map((trip) => (
                    <button
                        key={trip.id}
                        className="flex flex-col justify-between text-cyan-900 bg-cyan-100 rounded-lg w-96 m-4 h-60 transform hover:bg-cyan-200 hover:scale-105 hover:ring-2 hover:ring-cyan-500 hover:origin-center hover:rotate-1 transition-all duration-200"
                        onClick={() => navigate(`/trip/${trip.id}`)}
                    >
                        <div className="w-full h-1/3">
                            <img className="object-cover w-full h-full rounded-t-lg" src={trip.trip_image}></img>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full h-2/3 px-2">
                            <h1 className="font-bold text-2xl"> {trip.title}</h1>
                            <p className="pt-2">
                                {trip.city}, {trip.country}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center w-full px-2">
                            <div className="border-t border-black w-3/4 mx-auto justify-center"></div>
                            <p className="my-2">
                                {trip.start_date} - {trip.end_date}
                            </p>
                        </div>
                    </button>
                ))}
                <button
                    className="flex flex-col justify-between text-cyan-900 bg-cyan-100 rounded-lg w-96 m-4 h-60 transform hover:bg-cyan-200 hover:scale-105 hover:ring-2 hover:ring-cyan-500 hover:origin-center hover:rotate-1 transition-all duration-200"
                    onClick={() => toggleModal({ form: "AddTripModal" })}
                >
                    <div className="w-full h-1/3">
                        <img className="object-cover w-full h-full rounded-t-lg" src="/passport-stamps.png" alt="Passport Stamps Stock Image"></img>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-2/3">
                        <h1 className="font-bold text-2xl mb-7">Add a Trip</h1>
                    </div>
                    <div className="flex flex-col justify-center w-full">
                        <div className="border-t border-black w-3/4 mx-auto justify-center mb-10"></div>
                    </div>
                </button>
            </div>
        </div>

    );
}
export default Dashboard;
