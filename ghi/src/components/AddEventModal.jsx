import { useContext, useState } from 'react'
import { ModalContext } from './ModalProvider'

function AddEventModal() {
    const { toggleModal, requiredId } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        name:"",
        start_date_time:"",
        end_date_time:"",
        location: "",
        description: "",
        trip_id: requiredId
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
            const response = await fetch("http://localhost:8000/api/events",
                {
                    method: "POST",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify(formData)
                })
                if (response.ok) {
                    resetForm()
                    toggleModal("")
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
            trip_id: ""
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
                    <button type="submit">Create Event</button>
                </form>
            </div>
        </div>
    );
}

export default AddEventModal
