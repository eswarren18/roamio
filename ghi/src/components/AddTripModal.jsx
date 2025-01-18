import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from './ModalProvider'


function AddTripModal() {
        const { toggleModal } = useContext(ModalContext)
        const [ formData, setFormData ] = useState({
            title:"",
            country:"",
            city:"",
            start_date: "",
            end_date: "",
            trip_image: ""
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
                const response = await fetch("http://localhost:8000/api/trips",
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
                title:"",
                country:"",
                city:"",
                start_date: "",
                end_date: "",
                trip_image: ""
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
                        placeholder="Enter Title"
                    />
                    <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={handleFormChange}
                        placeholder="Enter Country"
                    />
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleFormChange}
                        placeholder="Enter City"
                    />
                    <input
                        type="date"
                        name="start_date"
                        value={start_date}
                        onChange={handleFormChange}
                        placeholder="Enter Start Date"
                    />
                    <input
                        type="date"
                        name="end_date"
                        value={end_date}
                        onChange={handleFormChange}
                        placeholder="Enter End Date"
                    />
                    <input
                        type="text"
                        name="trip_image"
                        value={trip_image}
                        onChange={handleFormChange}
                        placeholder="Enter Image URL"
                    />
                    <button type="submit">Create Trip</button>
                </form>
            </div>
        </div>
    );
}

export default AddTripModal
