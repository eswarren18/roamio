import { useContext, useEffect, useState } from 'react'
import { ModalContext } from './ModalProvider'

function EditFlightModal() {
    const { toggleModal, activityId } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        id: activityId,
        flight_number: "",
        departure_time: "",
        arrival_time: "",
        trip_id: ""
    })

    const fetchFlight = async (e) => {
        try {
            const response = await fetch(`http://localhost:8000/api/flights/${activityId}`, {
                credentials: "include",
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                const data = await response.json();
                setFormData(data)
            }
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchFlight() }, [])

    const handleFormChange = ({ target: { value, name } }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/api/flights/${activityId}`,
                {
                    method: "PUT",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify({
                        flight_number:formData.flight_number,
                        departure_time: formData.departure_time,
                        arrival_time: formData.arrival_time,
                        trip_id: formData.trip_id
                    })
                })
                if (response.ok) {
                    resetForm()
                    toggleModal("", null, "")
                }
        } catch (e) {
            console.error(e)
        }
    }

    const resetForm = () => {
        setFormData({
            id: "",
            flight_number: "",
            departure_time: "",
            arrival_time: "",
            trip_id: ""
        })
    }

    const { flight_number, departure_time, arrival_time } = formData

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            onClick={toggleModal}
        >
            {/* Modal content */}
            <div
                className="flex flex-col bg-white rounded-lg shadow-lg w-1/3 p-8"
                onClick={(e) => e.stopPropagation()} // Prevent click outside from closing modal
            >
                <button
                    onClick={toggleModal}
                    className="flex justify-end"
                >
                    <img src="/public/x-icon.svg" alt="Cancel" className="w-8 h-8" />
                </button>
                <div className="text-center text-4xl font-bold mb-6">Add a Flight</div>
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col w-4/5 mx-auto"
                >
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="flight_number"
                            maxLength="10"
                            name="flight_number"
                            onChange={handleFormChange}
                            placeholder="Update Flight Number"
                            type="text"
                            value={flight_number}
                            required
                        />
                        <label
                            htmlFor="flight_number"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Flight Number
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="departure_time"
                            maxLength="10"
                            name="departure_time"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="text"
                            value={departure_time}
                            required
                        />
                        <label
                            htmlFor="departure_time"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Departure
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="arrival_time"
                            maxLength="10"
                            name="arrival_time"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="text"
                            value={arrival_time}
                            required
                        />
                        <label
                            htmlFor="arrival_time"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Arrival
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <button type="submit">Add Flight</button>
                </form>
            </div>
        </div>
    );
}

export default EditFlightModal
