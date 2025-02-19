import { useEffect, useState } from 'react'
import { FormErrorAlert, validateForm } from './FormErrorAlert'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { format, parseISO } from 'date-fns'

// The EditFlightModal component handles the editing of flight details
function FlightForm({ activityId, tripId, onClose, action }) {
    const initialFormData = {
        flight_number: '',
        departure_time: '',
        arrival_time: '',
        trip_id: tripId,
    }
    const [formData, setFormData] = useState(initialFormData)
    const [formErrors, setFormErrors] = useState([])

    // Fetches the flight data from the backend based on the activityId
    const fetchFlight = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/flights/${activityId}`,
                {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            if (response.ok) {
                const data = await response.json()
                const departure_time = parseISO(data.departure_time)
                const arrival_time = parseISO(data.arrival_time)
                setFormData((prevState) => ({
                    ...prevState,
                    flight_number: data.flight_number,
                    departure_time: departure_time,
                    arrival_time: arrival_time,
                }))
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (action === 'editFlight') {
            fetchFlight()
        }
    }, [])

    // Handles form input changes with additional checks for date field validity
    const handleFormChange = ({ target }) => {
        const { value, name } = target

        setFormData((prevState) => {
            const newFormData = { ...prevState, [name]: value }
            return newFormData
        })
    }

    // Handles the form submission to update the flight details
    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const errors = validateForm({
            requiredFields: {
                flight_number: flight_number,
                departure_time: departure_time,
                arrival_time: arrival_time,
            },
        })

        if (errors.length > 0) {
            setFormErrors(errors)
            return
        }

        const formattedData = {
            ...formData,
            departure_time: departure_time
                ? format(departure_time, "yyyy-MM-dd'T'HH:mm:ss")
                : '',
            arrival_time: arrival_time
                ? format(arrival_time, "yyyy-MM-dd'T'HH:mm:ss")
                : '',
        }

        try {
            const response = await fetch(
                `http://localhost:8000/api/flights/${activityId}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        ...formattedData,
                    }),
                }
            )
            if (response.ok) {
                setFormData(initialFormData)
                onClose()
            }
        } catch (e) {
            console.error(e)
        }
    }

    // Handles form changes for start_date and end_date
    const handleDateTimeChange = (date, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }))
        console.log(date)
    }

    const {
        flight_number,
        departure_time,
        arrival_time,
    } = formData

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-4/5 mx-auto"
            >
                <h1 className="text-gray-800 font-bold text-2xl mb-4">
                    {action === 'editFlight'
                        ? 'Update Your Flight!'
                        : 'Start logging your Flight!'}
                </h1>
                <FormErrorAlert errors={formErrors} />
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                    </svg>
                    <input
                        className="pl-2 outline-none border-none"
                        id="flight_number"
                        name="flight_number"
                        onChange={handleFormChange}
                        placeholder="Flight Number*"
                        type="text"
                        value={flight_number}
                    />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                    </svg>
                    <DatePicker
                        selected={departure_time}
                        onChange={(date) =>
                            handleDateTimeChange(date, 'departure_time')
                        }
                        showTimeSelect
                        timeIntervals={15}
                        excludeTimes={[
                            setHours(setMinutes(new Date(), 0), 17),
                            setHours(setMinutes(new Date(), 30), 18),
                            setHours(setMinutes(new Date(), 30), 19),
                            setHours(setMinutes(new Date(), 30), 17),
                        ]}
                        dateFormat="MMMM d h:mm aa"
                    />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                    </svg>
                    <DatePicker
                        selected={arrival_time}
                        onChange={(date) =>
                            handleDateTimeChange(date, 'arrival_time')
                        }
                        showTimeSelect
                        timeIntervals={15}
                        excludeTimes={[
                            setHours(setMinutes(new Date(), 0), 17),
                            setHours(setMinutes(new Date(), 30), 18),
                            setHours(setMinutes(new Date(), 30), 19),
                            setHours(setMinutes(new Date(), 30), 17),
                        ]}
                        dateFormat="MMMM d h:mm aa"
                    />
                </div>
                <button
                    type="submit"
                    className="block w-full bg-cyan-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                    {action === 'editFlight' ? 'Update' : 'Create'}
                </button>
            </form>
        </>
    )
}

export default FlightForm
