import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


function Dashboard() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const navToHome = () => {
        if (!isLoggedIn) {
            navigate("/")
        }
    }

    useEffect(() => {navToHome()},[]);

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
                    <div id="trip-cards">Trip Cards</div>
                </div>
            </div>

    )
}

export default Dashboard;
