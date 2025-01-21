import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from './ModalProvider'

function AddLodgingModal() {
    const { toggleModal, tripId } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        name:"",
        address:"",
        check_in:"",
        check_out:"",
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
            const response = await fetch("http://localhost:8000/api/lodgings",
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
                }
        } catch (e) {
            console.error(e)
        }
    }

    const resetForm = () => {
        setFormData({
            name:"",
            address:"",
            check_in:"",
            check_out:"",
            trip_id: tripId
        })
    }

    const { name, address, check_in, check_out, trip_id } = formData

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
                        placeholder="Enter Lodging Name"
                    />
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={handleFormChange}
                        placeholder="Enter Address"
                    />
                    <input
                        type="datetime-local"
                        name="check_in"
                        value={check_in}
                        onChange={handleFormChange}
                        placeholder="Enter Check In Time"
                    />
                    <input
                        type="datetime-local"
                        name="check_out"
                        value={check_out}
                        onChange={handleFormChange}
                        placeholder="Enter Check Out Time"
                    />
                    <button type="submit">Create Lodging</button>
                </form>
            </div>
        </div>
    );
}

export default AddLodgingModal
