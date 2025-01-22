import { useContext, useEffect, useState } from 'react'
import { ModalContext } from './ModalProvider'

function EditTripModal() {
    const { toggleModal, activityData } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        id: activityData,
        title: "",
        country: "",
        city: "",
        start_date: "",
        end_date: "",
        trip_image: "",
        user_id: ""
    })

    const fetchTrip = async (e) => {
        try {
            const response = await fetch(`http://localhost:8000/api/trips/${activityData}`, {
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
        fetchTrip() }, [])

    const handleFormChange = ({ target: { value, name } }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/api/events/${activityData}`,
                {
                    method: "PUT",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify({
                        title: formData.title,
                        country:formData.county,
                        city: formData.city,
                        start_date: formData.start_date,
                        end_date: formData.end_date,
                        trip_image: formData.trip_image,
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
            title: "",
            country: "",
            city: "",
            start_date: "",
            end_date: "",
            trip_image: "",
            user_id: ""
        })
    }

    const { title, country, city, start_date, end_date, trip_image } = formData

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
                        name="title"
                        value={title}
                        onChange={handleFormChange}
                        placeholder="Update Title"
                    />
                    <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={handleFormChange}
                        placeholder="Update Country"
                    />
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleFormChange}
                        placeholder="Update City"
                    />
                    <input
                        type="date"
                        name="start_date"
                        value={start_date}
                        onChange={handleFormChange}
                        placeholder="Update Start Date"
                    />
                    <input
                        type="date"
                        name="end_date"
                        value={end_date}
                        onChange={handleFormChange}
                        placeholder="Update End Date"
                    />
                    <input
                        type="text"
                        name="trip_image"
                        value={trip_image}
                        onChange={handleFormChange}
                        placeholder="Update Trip Image"
                    />
                    <button type="submit">Update Trip</button>
                </form>
            </div>
        </div>
    );
}

export default EditTripModal
