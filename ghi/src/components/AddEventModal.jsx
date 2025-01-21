import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ModalContext } from './ModalProvider'

function AddEventModal({tripId}) {
   // const { tripId } = useParams()
    const { toggleModal } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        name:"",
        start_date_time:"",
        end_date_time:"",
        location: "",
        description: "",
        trip_id: tripId
    })
    const navigate = useNavigate()

    const handleFormChange = ({ target: { value, name } }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:8000/api/events",
                {
                    method: "POST",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify(formData)
                })
                if (response.ok) {
                    const responseData = await response.json()
                    const tripId = responseData.id
                    resetForm()
                    toggleModal("")
                    navigate(`/trip/${tripId}`)
                }
        } catch (e) {
            console.error(e)
        }
    }

    const resetForm = () => {
        setFormData({
            name:"",
            start_date_time:"",
            end_date_time:"",
            location: "",
            description: "",
            trip_id: 0
        })
    }

    const { name, start_date_time, end_date_time, location, description } = formData

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
                        name="name"
                        value={name}
                        onChange={handleFormChange}
                        placeholder="Enter Name"
                    />
                    <input
                        type="datetime-local"
                        name="start_date_time"
                        value={start_date_time}
                        onChange={handleFormChange}
                        placeholder="Enter Start Date"
                    />
                    <input
                        type="datetime-local"
                        name="end_date_time"
                        value={end_date_time}
                        onChange={handleFormChange}
                        placeholder="Enter End Date"
                    />
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleFormChange}
                        placeholder="Enter Location"
                    />
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleFormChange}
                        placeholder="Enter Description of Event"
                    />
                    <button type="submit">Create Trip</button>
                </form>
            </div>
        </div>
    );
}

export default AddEventModal
