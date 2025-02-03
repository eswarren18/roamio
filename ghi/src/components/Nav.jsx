import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthProvider'
import { ModalContext } from './ModalProvider'
import { useNavigate } from 'react-router-dom'

// The Nav component is a naviation bar displayed once the user is signed in
function Nav() {
    const { isLoggedIn, setUser } = useContext(AuthContext)
    const { toggleModal } = useContext(ModalContext)
    const navigate = useNavigate()

    // Logs out the user when the click the log out button
    const handleLogOut = async () => {
        const deleteResource = 'http://localhost:8000/api/auth/signout'
        const deleteOptions = {
            method: 'DELETE',
            credentials: 'include',
        }
        try {
            const deleteResponse = await fetch(deleteResource, deleteOptions)
            if (deleteResponse) {
                setUser(undefined)
                navigate('/')
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {}, [isLoggedIn])

    return (
        isLoggedIn && (
            <nav
                id="nav"
                className="fixed top-0 left-0 w-full bg-cyan-100 text-cyan-900 py-4 px-6 shadow-2xl font-sans z-20"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo and navigation links on the left */}
                    <div className="flex items-center">
                        <div className="flex justify-center items-center">
                            <img
                                src="/public/globe-900.svg"
                                alt="Logo"
                                className="w-10 h-10"
                            />
                            <div className="text-2xl font-bold text-cyan-900 tracking-tight ml-2 mr-10">
                                Roamio
                            </div>
                        </div>
                        <div className="hidden md:flex space-x-6 text-lg">
                            <a
                                href="/"
                                className="hover:text-cyan-500 transition duration-200"
                            >
                                Home
                            </a>
                            <button
                                className="hover:text-cyan-500 transition duration-200"
                                onClick={() =>
                                    toggleModal({ form: 'AddTripModal' })
                                }
                            >
                                Add a Trip
                            </button>
                        </div>
                    </div>
                    {/* Logout on the right */}
                    <div className="flex space-x-4">
                        <button
                            className="bg-cyan-900 hover:bg-cyan-700 text-cyan-100 px-5 py-2 rounded-full transition duration-200"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
        )
    )
}

export default Nav
