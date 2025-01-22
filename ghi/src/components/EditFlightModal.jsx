import { useContext, useEffect, useState } from 'react'
import { ModalContext } from './ModalProvider'

function EditFlightModal() {
    const { toggleModal, activityData } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        id: activityData,
        flight_number: "",
        departure_time: "",
        arrival_time: "",
        trip_id: ""
    })

    const fetchFlight = async (e) => {
        try {
            const response = await fetch(`http://localhost:8000/api/flights/${activityData}`, {
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
            const response = await fetch(`http://localhost:8000/api/flights/${activityData}`,
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
                className="bg-white rounded-lg shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()} // Prevent click outside from closing modal
            >
                <button onClick={toggleModal}>X</button>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        name="flight_number"
                        maxLength="10"
                        value={flight_number}
                        onChange={handleFormChange}
                        placeholder="Update Flight Number"
                    />
                    <input
                        type="datetime-local"
                        name="departure_time"
                        value={departure_time}
                        onChange={handleFormChange}
                        placeholder="Update Departure Time"
                    />
                    <input
                        type="datetime-local"
                        name="arrival_time"
                        value={arrival_time}
                        onChange={handleFormChange}
                        placeholder="Update Arrival Time"
                    />
                    <button type="submit">Update Flight</button>
                </form>
            </div>
        </div>
    );
}

export default EditFlightModal
