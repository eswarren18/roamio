import { useEffect, useState, useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api'

// The EditLodgingModal component handles the editing of lodging details
function EditLodgingModal({ activityId, tripData, onClose }) {
    const initialFormData = {
        id: activityId,
        name: '',
        address: '',
        check_in: '',
        check_out: '',
        trip_id: '',
    }
    const [formData, setFormData] = useState(initialFormData)

    // Reference to handle the autocomplete functionality for address input
    const addressAutocompleteRef = useRef(null)

    // Updates the address in formData when the address is updated in the input field
    const onAddressPlaceChanged = () => {
        const place = addressAutocompleteRef.current.getPlace()
        const address = place.formatted_address || ''

        setFormData((prevState) => ({
            ...prevState,
            address: address,
        }))
    }

    // Fetches the lodging data from the backend using the activityId
    const fetchLodging = async (e) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/lodgings/${activityId}`,
                {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            if (response.ok) {
                const data = await response.json()
                setFormData(data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchLodging()
    }, [])

    // Handles form input changes with additional checks for date field validity
    const handleFormChange = ({ target: { value, name } }) => {
        setFormData((prevData) => {
            const newFormData = { ...prevData, [name]: value }
            const dates = Object.keys(tripData)

            const newStartDate = newFormData.check_in.split('T')[0]
            const newStartTime = newFormData.check_in.split('T')[1]
            const newEndDate = newFormData.check_out.split('T')[0]
            const newEndTime = newFormData.check_out.split('T')[1]

            if (name === 'check_in') {
                if (
                    newStartDate < tripData.start_date ||
                    newStartDate > tripData.end_date
                ) {
                    newFormData.check_in = ''
                }
            }
            if (name === 'check_out') {
                if (
                    newFormData.check_out < tripData.start_date ||
                    newEndDate > tripData.end_date ||
                    newFormData.check_out < newFormData.check_in
                ) {
                    newFormData.check_out = ''
                }
            }
            if (name === 'check_in' || name === 'check_out') {
                if (newStartDate === newEndDate && newStartTime > newEndTime) {
                    newFormData.check_out = ''
                }
            }
            return newFormData
        })
    }

    // Handles the form submission to update the lodging details
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `http://localhost:8000/api/lodgings/${activityId}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: formData.name,
                        address: formData.address,
                        check_in: formData.check_in,
                        check_out: formData.check_out,
                        trip_id: formData.trip_id,
                    }),
                }
            )
            if (response.ok) {
                resetForm()
                onClose()
            }
        } catch (e) {
            console.error(e)
        }
    }

    const resetForm = () => {
        setFormData(initialFormData)
    }

    const { name, address, check_in, check_out } = formData

    return (
        <>
            <button onClick={onClose} className="flex justify-end mb-2">
                <img
                    src="/public/x-icon.svg"
                    alt="Cancel"
                    className="w-8 h-8"
                />
            </button>
            <div className="text-center text-4xl font-bold mb-6">
                Update Lodging
            </div>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-4/5 mx-auto"
            >
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleFormChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                         border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                         focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500
                         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                         peer-focus:left-0 peer-focus:text-blue-600
                         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                         peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Lodging Name
                        <span className="text-red-500 text-xs">*</span>
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <Autocomplete
                        onLoad={(ref) => (addressAutocompleteRef.current = ref)}
                        onPlaceChanged={onAddressPlaceChanged}
                    >
                        <div>
                            <input
                                type="text"
                                name="address"
                                value={address}
                                onChange={handleFormChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                            border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                            focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                        </div>
                    </Autocomplete>
                    <label
                        htmlFor="address"
                        className="peer-focus:font-medium absolute text-sm text-gray-500
                          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                          peer-focus:left-0 peer-focus:text-blue-600
                          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                          peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Address
                        <span className="text-red-500 text-xs">*</span>
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="datetime-local"
                        name="check_in"
                        value={check_in}
                        onChange={handleFormChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                           border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                           focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="check_in"
                        className="peer-focus:font-medium absolute text-sm text-gray-500
                           duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                           peer-focus:left-0 peer-focus:text-blue-600
                           peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                           peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Check-In
                        <span className="text-red-500 text-xs">*</span>
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="datetime-local"
                        name="check_out"
                        value={check_out}
                        onChange={handleFormChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                           border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                           focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="check_out"
                        className="peer-focus:font-medium absolute text-sm text-gray-500
                           duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                           peer-focus:left-0 peer-focus:text-blue-600
                           peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                           peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Check-Out
                        <span className="text-red-500 text-xs">*</span>
                    </label>
                </div>
                <button className="hover:underline" type="submit">
                    Update
                </button>
            </form>
        </>
    )
}

export default EditLodgingModal
