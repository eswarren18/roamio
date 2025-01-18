import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { ModalContext } from './ModalProvider';


function Dashboard() {
    const { toggleModal } = useContext(ModalContext);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);

    const fetchTrips = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/trips", {credentials: "include", headers: {"Content-Type": "application/json"}});
            if (response.ok) {
                const data = await response.json();
                setTrips(data)
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
        fetchTrips();
    },[]);

    return (
            <div id="home" className="flex items-center mt-6">
                <div
                    id="profile"
                    className="flex items-center self-start rounded-lg border-2 border-black flex-col px-2 py-2 mx-6 md:px-4 md:py-4 md:mx-10"
                >
                    <div
                        id="picture"
                        className="text-2xl rounded-full border-2 border-black p-8 m-2 md:p-16 md:m-5"
                    >
                        Profile picture
                    </div>
                    <button
                        id="settings"
                        onClick={() => toggleModal("SettingsForm")}
                        className="bg-blue-500 text-white px-4 py-2 mx-5 mt-10 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Settings
                    </button>
                </div>
                <div className="flex items-center flex-col mx-10">
                    <img
                        id="map"
                        className="mx-auto border-4 border-black rounded-xl"
                        src="../public/google-maps-paris.png"
                        alt="Google Maps Paris"
                    />
                    <div
                        id="trip-cards"
                        className="flex flex-row flex-wrap justify-center"
                    >
                        {trips.map((trip) => (
                            <button
                                key={trip.id}
                                className="border border-black rounded-md w-1/4 m-4 p-2"
                                onClick={() => navigate(`/trip/${trip.id}`)}
                            >
                                <h1 className="font-bold"> {trip.title}</h1>
                                <p>{trip.city}, {trip.country}</p>
                                <p>{trip.start_date}</p>
                                <p>{trip.end_date}</p>
                            </button>
                        ))}
                        <button
                            className="border border-black rounded-md w-1/4 m-4 p-2"
                            onClick={() => toggleModal("AddTripModal")}
                        >
                            <h1 className="font-bold"> Create a Trip</h1>
                            <p>Trip City, Trip County</p>
                            <p>Start Date</p>
                            <p>End Date</p>
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default Dashboard;
