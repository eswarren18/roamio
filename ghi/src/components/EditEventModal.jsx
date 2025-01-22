import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from './ModalProvider'

function EditEventModal() {
    const { toggleModal, requiredId } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        id: 0,
        name:"",
        start_date_time:"",
        end_date_time:"",
        location: "",
        description: "",
        trip_id: ""
    })
    const navigate = useNavigate()

    const handleFormChange = ({ target: { value, name } }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const fetchEvent = async (e) => {
        try {
            const response = await fetch(`http://localhost:8000/api/events/event/${requiredId}`, {credentials: "include", headers: {"Content-Type": "application/json"}});

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setFormData(data)
            }
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchEvent() }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:8000/api/events",
                {
                    method: "PUT",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify(formData)
                })
                if (response.ok) {
                    const responseData = await response.json()
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
                        placeholder="Update Name"
                    />
                    <input
                        type="datetime-local"
                        name="start_date_time"
                        value={start_date_time}
                        onChange={handleFormChange}
                        placeholder="Update Start Date"
                    />
                    <input
                        type="datetime-local"
                        name="end_date_time"
                        value={end_date_time}
                        onChange={handleFormChange}
                        placeholder="Update End Date"
                    />
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleFormChange}
                        placeholder="Update Location"
                    />
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleFormChange}
                        placeholder="Update Description"
                    />
                    <button type="submit">Update Event</button>
                </form>
            </div>
        </div>
    );
}

export default EditEventModal
