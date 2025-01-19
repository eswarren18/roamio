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
                    className="flex items-center self-start rounded-lg border-2 border-cyan-100 flex-col px-2 py-2 m-8"
                >
                    <div
                        id="picture"
                        className="text-2xl text-cyan-100 rounded-full border-2 border-cyan-100 p-8 m-2 md:p-16 md:m-5"
                    >
                        Profile picture
                    </div>
                    <button
                        id="settings"
                        onClick={() => toggleModal("SettingsForm")}
                        className="bg-cyan-100 hover:bg-cyan-200 text-cyan-900 px-5 py-2 border-2 border-cyan-900 rounded-full transition duration-200"
                    >
                        Settings
                    </button>
                </div>
                <div className="flex items-center flex-col mx-10">
                    <img
                        id="map"
                        className="mx-auto border-4 border-cyan-100 rounded-xl m-4"
                        src="/public/google-maps-paris.png"
                        alt="Google Maps Paris"
                    />

                    <div
                        id="trip-cards"
                        className="flex flex-wrap justify-center w-full"
                    >
                        {trips.map((trip) => (
                            <button
                                key={trip.id}
                                className="flex flex-col justify-between text-cyan-900 bg-cyan-100 rounded-lg w-1/4 m-4 h-60 transform hover:bg-cyan-200 hover:scale-105 hover:ring-2 hover:ring-cyan-500 hover:origin-center hover:rotate-1 transition-all duration-200"
                                onClick={() => navigate(`/trip/${trip.id}`)}
                            >
                                <div className="w-full h-1/3">
                                    <img className="object-cover w-full h-full rounded-t-lg" src={trip.trip_image}></img>
                                </div>
                                <div className="flex flex-col items-center justify-center w-full h-2/3 px-2">
                                    <h1 className="font-bold text-2xl"> {trip.title}</h1>
                                    <p className="pt-2">{trip.city}, {trip.country}</p>
                                </div>
                                <div className="flex flex-col justify-center w-full px-2">
                                    <div className="border-t border-black w-3/4 mx-auto justify-center"></div>
                                    <p className="my-2">{trip.start_date} - {trip.end_date}</p>
                                </div>
                            </button>
                        ))}
                        <button
                            className="flex flex-col justify-between text-cyan-900 bg-cyan-100 rounded-lg w-1/4 m-4 h-60 transform hover:bg-cyan-200 hover:scale-105 hover:ring-2 hover:ring-cyan-500 hover:origin-center hover:rotate-1 transition-all duration-200"
                            onClick={() => toggleModal("AddTripModal")}
                        >
                            <div className="w-full h-1/3">
                                <img className="object-cover w-full h-full rounded-t-lg" src="/public/passport-stamps.png"></img>
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
            </div>
    )
}

export default Dashboard;
