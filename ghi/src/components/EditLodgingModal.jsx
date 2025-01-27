import { useContext, useEffect, useState } from 'react'
import { ModalContext } from './ModalProvider'

function EditFlightModal() {
    const { toggleModal, activityId } = useContext(ModalContext)
    const [ formData, setFormData ] = useState({
        id: activityId,
        name: "",
        address: "",
        check_in: "",
        check_out: "",
        trip_id: ""
    })

    const fetchLodging = async (e) => {
        try {
            const response = await fetch(`http://localhost:8000/api/lodgings/${activityId}`, {
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
        fetchLodging() }, [])

    const handleFormChange = ({ target: { value, name } }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/api/lodgings/${activityId}`,
                {
                    method: "PUT",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify({
                        name:formData.name,
                        address: formData.address,
                        check_in: formData.check_in,
                        check_out: formData.check_out,
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
            name: "",
            address: "",
            check_in: "",
            check_out: "",
            trip_id: ""
        })
    }

    const { name, address, check_in, check_out } = formData

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20"
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
                        type="text"
                        name="address"
                        value={address}
                        onChange={handleFormChange}
                        placeholder="Update Address"
                    />
                    <input
                        type="datetime-local"
                        name="check_in"
                        value={check_in}
                        onChange={handleFormChange}
                        placeholder="Update Check In Time"
                    />
                    <input
                        type="datetime-local"
                        name="check_out"
                        value={check_out}
                        onChange={handleFormChange}
                        placeholder="Update Check Out Time"
                    />
                    <button type="submit">Update Lodging</button>
                </form>
            </div>
        </div>
    );
}

export default EditFlightModal
