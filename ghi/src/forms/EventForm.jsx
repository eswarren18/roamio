import { useEffect, useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Autocomplete } from '@react-google-maps/api'
import { format, parseISO } from 'date-fns'

import { FormErrorAlert, validateForm } from './FormErrorAlert'

// The EventForm component handles the editing of event details
function EventForm({ activityId, tripData, tripId, onClose, action }) {
    const [isMultipleDays, setIsMultipleDays] = useState(false)
    const initialFormData = {
        name: '',
        start_date_time: '',
        end_date_time: '',
        address: '',
        description: '',
        trip_id: tripId,
    }
    const [formData, setFormData] = useState(initialFormData)
    const [formErrors, setFormErrors] = useState([])

    // Fetches the event data from the backend based on the activityId
    const fetchEvent = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/events/${activityId}`,
                {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            if (response.ok) {
                const data = await response.json()
                const start_date = data.start_date_time.split('T')[0]
                const start_time = data.start_date_time.split('T')[1]
                const end_date = data.end_date_time.split('T')[0]
                const end_time = data.end_date_time.split('T')[1]

                if (start_date !== end_date) {
                    setIsMultipleDays(true)
                }
                setFormData((prevState) => ({
                    ...prevState,
                    name: data.name,
                    start_date: start_date,
                    end_date: end_date,
                    start_time: start_time,
                    end_time: end_time,
                    address: data.address,
                    description: data.description,
                    trip_id: data.trip_id,
                }))
            }
        } catch (e) {
            console.error(e)
        }
    }

    // Reference to handle the autocompelte functionality for the address input field
    const addressAutocompleteRef = useRef(null)

    // Updates the address in formData when the place changes in t he address autocomplete field
    const onAddressPlaceChanged = () => {
        const place = addressAutocompleteRef.current.getPlace()
        const address = place.formatted_address || ''

        setFormData((prevState) => ({
            ...prevState,
            address: address,
        }))
    }

    // Handles form input changes with additional checks for date and time field validity
    const handleFormChange = ({ target }) => {
        const { value, name } = target

        setFormData((prevState) => {
            const newFormData = { ...prevState, [name]: value }
            return newFormData
        })
    }

    // Handles form changes for start_date and end_date
    const handleDateTimeChange = (date, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }))
    }

    // Handles the form submission to update the event details
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const errors = validateForm({
            requiredFields: {
                name: name,
                start_date_time: start_date_time,
                end_date_time: end_date_time,
                address: address,
            },
        })

        if (errors.length > 0) {
            setFormErrors(errors)
            return
        }

        const formattedData = {
            ...formData,
            start_date_time: start_date_time
                ? format(start_date_time, "yyyy-MM-dd'T'HH:mm:ss")
                : '',
            end_date_time: end_date_time
                ? format(end_date_time, "yyyy-MM-dd'T'HH:mm:ss")
                : '',
        }

        const url =
            action === 'editEvent'
                ? `http://localhost:8000/api/events/${activityId}`
                : 'http://localhost:8000/api/trips'
        const method = action === 'editEvent' ? 'PUT' : 'POST'
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formattedData),
            })
            if (response.ok) {
                setFormData(initialFormData)
                onClose()
            }
        } catch (e) {
            console.error(e)
        }
    }

    const { name, start_date_time, end_date_time, address, description } =
        formData

    useEffect(() => {
        if (action === 'editEvent') {
            fetchEvent()
        }
    }, [])

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-4/5 mx-auto my-2"
            >
                <h1 className="text-gray-800 font-bold text-2xl mb-4">
                    {action === 'editEvent'
                        ? 'Update Event Details'
                        : 'Add Event Details'}
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
                        id="name"
                        name="name"
                        onChange={handleFormChange}
                        placeholder="Name*"
                        type="text"
                        value={name}
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
                        selected={start_date_time}
                        onChange={(date) =>
                            handleDateTimeChange(date, 'start_date_time')
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
                        selected={end_date_time}
                        onChange={(date) =>
                            handleDateTimeChange(date, 'end_date_time')
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
                            d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
                        />
                    </svg>

                    <input
                        className="pl-2 outline-none border-none"
                        id="address"
                        name="address"
                        onChange={handleFormChange}
                        placeholder="Address*"
                        type="text"
                        value={address}
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
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                    </svg>
                    <input
                        className="pl-2 outline-none border-none"
                        id="description"
                        name="description"
                        onChange={handleFormChange}
                        placeholder="Description"
                        type="text"
                        value={description}
                    />
                </div>
                <button
                    type="submit"
                    className="block w-full bg-cyan-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                    {action === 'editEvent' ? 'Update' : 'Create'}
                </button>
            </form>
        </>
    )
}

export default EventForm
