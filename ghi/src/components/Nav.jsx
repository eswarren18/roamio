import { useContext } from 'react';
import { AuthContext } from './AuthProvider';


function Nav() {
    const { isLoggedIn } = useContext(AuthContext);

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
                                >
                                    Log In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {/* Modal */}
            {/* {isModalOpen && renderForm()} */}
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
