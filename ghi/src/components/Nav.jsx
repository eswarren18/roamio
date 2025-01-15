import { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

import SignInModal from './SignInModal';


function Nav() {
    const { isLoggedIn, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formType, setFormType] = useState("");

    const toggleModal = (form = "") => {
        setFormType(form)
        setIsModalOpen((imo) => !imo);
    };

    const renderForm = () => {
        switch (formType) {
            // case "SettingsForm":
            //     return <SettingsForm toggleModal={() => toggleModal()} />;
            // case "TripForm":
            //     return <TripForm toggleModal={() => toggleModal()} />;
            case "SignInModal":
                return <SignInModal toggleModal={() => toggleModal()} />;
            default:
                return null;
        }
    };

    const handleLogOut = async () => {
        const deleteResource = "http://localhost:8000/api/auth/signout"
        const deleteOptions = {
            method: "DELETE",
            credentials: "include"
        }
        const getResource = "http://localhost:8000/api/auth/authenticate"
        try {
            const deleteResponse = await fetch(deleteResource, deleteOptions);
            if (deleteResponse) {
                setUser(undefined)
                navigate("/")
            }
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <>
            <nav id="nav" className="bg-blue-600 text-white py-4 px-6 shadow-md">
                <div className="mx-auto flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <div className="text-2xl font-bold">Roamio</div>
                        {isLoggedIn && (
                            <div className="flex px-4 space-x-4">
                                <a href="/" className="hover:underline">
                                    Home
                                </a>
                                <p
                                    className="hover:underline cursor-pointer"
                                    // onClick={() => toggleModal("TripForm")}
                                >
                                    Add a Trip
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                                onClick={handleLogOut}
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                                >
                                    Sign Up
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                                    onClick={() => toggleModal("SignInModal")}
                                >
                                    Log In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {/* Modal */}
            {isModalOpen && renderForm()}
        </>
    )
}

export default Nav



// import React, { useContext } from 'react';
// import { AuthContext } from './contexts/AuthProvider'; // Update the path as needed

// function ProfilePage() {
//   const { user, isLoggedIn, setUser } = useContext(AuthContext);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <h1>Welcome, {user?.name}</h1>
//           <button onClick={() => setUser(null)}>Log Out</button>
//         </div>
//       ) : (
//         <h1>Please log in</h1>
//       )}
//     </div>
//   );
// }
