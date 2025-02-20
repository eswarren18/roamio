import { useEffect, useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Autocomplete } from '@react-google-maps/api'
import { format, parseISO } from 'date-fns'

import { FormErrorAlert, validateForm } from './FormErrorAlert'

// The EventForm component handles the editing of event details
function EventForm({ activityId, tripData, tripId, onClose, action }) {
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
                setFormData((prevState) => ({
                    ...prevState,
                    name: data.name,
                    start_date_time: data.start_date_time
                        ? parseISO(data.start_date_time)
                        : null,
                    end_date_time: data.end_date_time
                        ? parseISO(data.end_date_time)
                        : null,
                    address: data.address,
                    description: data.description,
                    trip_id: tripId,
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
        console.log(date)
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }))
    }

    // Handles the form submission to update the event details
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log('Date format to validate: ', start_date_time)
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
                : 'http://localhost:8000/api/events'
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
                    Event Details
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
                        dateFormat="MMMM d, h:mmaa"
                        placeholderText="Start Date*"
                        className="pl-2 outline-none border-none"
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
                        dateFormat="MMMM d, h:mmaa"
                        placeholderText="End Date*"
                        className="pl-2 outline-none border-none"
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
                            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                        />
                    </svg>
                    <Autocomplete
                        onLoad={(ref) => (addressAutocompleteRef.current = ref)}
                        onPlaceChanged={onAddressPlaceChanged}
                    >
                        <input
                            className="pl-2 outline-none border-none"
                            id="address"
                            name="address"
                            onChange={handleFormChange}
                            placeholder="Address*"
                            type="text"
                            value={address}
                        />
                    </Autocomplete>
                </div>
                <div className="flex items-start border-2 py-2 px-3 rounded-2xl mb-3">
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
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                    </svg>
                    <textarea
                        className="pl-2 outline-none border-none w-full"
                        id="description"
                        name="description"
                        onChange={handleFormChange}
                        placeholder="Description"
                        value={description}
                        rows={3}
                    ></textarea>
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
