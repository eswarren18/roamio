import { useContext, useState } from 'react'
import { ModalContext } from './ModalProvider'

function AddFlightModal() {
    const { toggleModal, activityId } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        flight_number:"",
        departure_time:"",
        arrival_time:"",
        trip_id: activityId
    })

    const handleFormChange = ({ target: { value, name } }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:8000/api/flights",
                {
                    method: "POST",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify(formData)
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
            flight_number:"",
            departure_time:"",
            arrival_time:"",
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
                        placeholder="Enter Flight Number"
                    />
                    <input
                        type="datetime-local"
                        name="departure_time"
                        value={departure_time}
                        onChange={handleFormChange}
                        placeholder="Enter Departure Time"
                    />
                    <input
                        type="datetime-local"
                        name="arrival_time"
                        value={arrival_time}
                        onChange={handleFormChange}
                        placeholder="Enter Arrival Time"
                    />
                    <button type="submit">Create Flight</button>
                </form>
            </div>
        </div>
    );
}

export default AddFlightModal
