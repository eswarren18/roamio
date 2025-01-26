import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { ModalContext } from './ModalProvider';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const { isLoggedIn, setUser } = useContext(AuthContext);
    const { toggleModal } = useContext(ModalContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        const deleteResource = "http://localhost:8000/api/auth/signout"
        const deleteOptions = {
            method: "DELETE",
            credentials: "include"
        }
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

    useEffect(() => {},[isLoggedIn]);

    return (
        <nav id="nav" className="bg-cyan-100 text-gray-900 py-4 px-6 shadow-md font-sans">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left side: Logo and Navigation Links */}
                <div className="flex items-center space-x-6">
                    <div className="text-2xl font-bold tracking-tight">Roamio</div>
                    {isLoggedIn && (
                        <div className="hidden md:flex space-x-6 text-lg">
                            <a href="/" className="hover:text-cyan-500 transition duration-200">
                                Home
                            </a>
                            <button
                                className="hover:text-cyan-500 transition duration-200"
                                onClick={() => toggleModal({form:"AddTripModal"})}
                            >
                                Add a Trip
                            </button>
                        </div>
                    )}
                </div>

                {/* Right side: Auth buttons */}
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <button
                            className="bg-cyan-900 hover:bg-cyan-700 text-cyan-100 px-5 py-2 rounded-full transition duration-200"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    ) : (
                        <>
                            <button
                                className="bg-cyan-100 hover:bg-cyan-200 text-cyan-900 px-5 py-2 border-2 border-cyan-900 rounded-full transition duration-200"
                                onClick={() => toggleModal({form:"SignInModal"})}
                            >
                                Log In
                            </button>
                            <button
                                className="bg-cyan-900 hover:bg-cyan-700 text-cyan-100 px-5 py-2 rounded-full transition duration-200"
                                onClick={() => toggleModal({form:"SignUpModal"})}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav;
