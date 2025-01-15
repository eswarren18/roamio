function Nav() {
    return (
        <>
            {/* Navbar */}
            <nav id="nav" className="bg-blue-600 text-white py-4 px-6 shadow-md">
                <div className="mx-auto flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <div className="text-2xl font-bold">Roamio</div>
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
                    </div>
                    <div>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            {/* Modal */}
            {/* {isModalOpen && renderForm()} */}
        </>
    )
}

export default Nav
