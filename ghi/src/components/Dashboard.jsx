import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


function Dashboard() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);

    const fetchTrips = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/trips", {credentials: "include", headers: {"Content-Type": "application/json"}});
            if (response.ok) {
                const data = await response.json();
                setTrips(data)
                console.log(data)
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
                    <div className="flex flex-wrap justify-between" id="trip-cards">
                        {trips.map((trip) => (
                            <div className="w-full md:w-1/3 p-4">
                                <h2> {trip.title}</h2>
                                <h3>{trips.country}</h3>
                                <h3>{trip.city}</h3>
                                <h3>{trip.start_date}</h3>
                                <h3>{trip.end_date}</h3>
                            </div>
                        )

                        )}
                    </div>
                </div>
            </div>

    )
}

export default Dashboard;
