function SignInModal({ toggleModal }) {
    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            onClick={toggleModal}
        >
            {/* Modal content */}
            <div
                className="bg-white rounded-lg shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()} // Prevent click outside from closing modal
            >
                <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Trip Form</h1>
                    <p className="text-gray-600 mb-6">Here is my trip form. Please fill in the necessary details and submit your input.</p>
                    <div className="border-t pt-4 flex justify-end space-x-4">
                        <button
                            onClick={toggleModal}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={toggleModal}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInModal
