import { useState } from 'react'

// The AddFlightForm component handles the creation of a new flight entry
function AddFlightForm({ tripId, tripData, onClose }) {
    const initialFormData = {
        flight_number: '',
        departure_date: '',
        departure_time: '',
        arrival_date: '',
        arrival_time: '',
        trip_id: tripId,
    }
    const [formData, setFormData] = useState(initialFormData)

    // Handles form input changes with additional checks for date and time field validity
    const handleFormChange = ({ target }) => {
        const { value, name } = target

        setFormData((prevState) => {
            const newFormData = { ...prevState, [name]: value }
            const dates = Object.keys(tripData)

            if (newFormData.departure_date > dates[dates.length - 1]) {
                newFormData.departure_date = ''
            }
            if (
                newFormData.arrival_date < dates[0] ||
                newFormData.arrival_date > dates[dates.length - 1]
            ) {
                newFormData.arrival_date = ''
            }

            if (name === 'departure_date' || name === 'arrival_date') {
                if (newFormData.arrival_date < newFormData.departure_date) {
                    newFormData.arrival_date = ''
                }
                if (
                    newFormData.arrival_date === newFormData.departure_date &&
                    newFormData.arrival_time < newFormData.departure_time
                ) {
                    newFormData.arrival_time = ''
                }
                if (newFormData.arrival_time < newFormData.departure_time) {
                    newFormData.arrival_time = ''
                }
            }
            if (newFormData.departure_date === newFormData.arrival_date) {
                if (name === 'arrival_time' || name === 'departure_time') {
                    if (newFormData.arrival_time < newFormData.departure_time) {
                        newFormData.arrival_time = ''
                    }
                }
            }
            return newFormData
        })
    }

    // Handles the form submission to create a new flight entry
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        let departure_date_time = `${departure_date}T${departure_time}`
        let arrival_date_time = `${arrival_date}T${arrival_time}`
        try {
            const response = await fetch('http://localhost:8000/api/flights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    flight_number: formData.flight_number,
                    departure_time: departure_date_time,
                    arrival_time: arrival_date_time,
                    trip_id: tripId,
                }),
            })
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

    const {
        flight_number,
        departure_date,
        departure_time,
        arrival_date,
        arrival_time,
    } = formData

    return (
        <>
            <button onClick={onClose} className="flex justify-end">
                <img
                    src="/public/x-icon.svg"
                    alt="Cancel"
                    className="w-8 h-8"
                />
            </button>
            <div className="text-center text-4xl font-bold mb-6">
                Add Flight
            </div>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-4/5 mx-auto"
            >
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="flight_number"
                        maxLength="10"
                        name="flight_number"
                        onChange={handleFormChange}
                        placeholder=" "
                        type="text"
                        value={flight_number}
                        required
                    />
                    <label
                        htmlFor="flight_number"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Flight Number
                        <span className="text-red-500 text-xs">*</span>
                    </label>
                </div>
                <div className="flex items-center">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="departure_date"
                            name="departure_date"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="date"
                            value={departure_date}
                            required
                        />
                        <label
                            htmlFor="departure_date"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Departure Date
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <span className="mx-4 text-gray-500">at</span>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="departure_time"
                            name="departure_time"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="time"
                            value={departure_time}
                            required
                        />
                        <label
                            htmlFor="departure_time"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Time
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="arrival_date"
                            name="arrival_date"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="date"
                            value={arrival_date}
                            required
                        />
                        <label
                            htmlFor="arrival_date"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Arrival Date
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <span className="mx-4 text-gray-500">at</span>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="arrival_time"
                            name="arrival_time"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="time"
                            value={arrival_time}
                            required
                        />
                        <label
                            htmlFor="arrival_time"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Time
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                </div>
                <button className="hover:underline" type="submit">
                    Create
                </button>
            </form>
        </>
    )
}

export default AddFlightForm
