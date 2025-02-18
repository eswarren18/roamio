import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FormErrorAlert, validateForm } from './FormErrorAlert'
import { format, parseISO } from 'date-fns'

// The TripForm component handles editing a trip's details
function TripForm({ tripData, tripId, onClose, action }) {
    const [toDelete, setToDelete] = useState([])
    const initialFormData = {
        id: '',
        title: '',
        country: '',
        city: '',
        start_date: '',
        end_date: '',
        trip_image: '',
        user_id: '',
    }
    const [formData, setFormData] = useState(initialFormData)
    const [formErrors, setFormErrors] = useState([])
    const navigate = useNavigate()

    // Fetches the trips data using tripId to populate the form
    const fetchTrip = async (e) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/trips/${tripId}`,
                {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            if (response.ok) {
                const data = await response.json()
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    ...data,
                    start_date: data.start_date
                        ? parseISO(data.start_date)
                        : null,
                    end_date: data.end_date ? parseISO(data.end_date) : null,
                    trip_image:
                        data.trip_image === '/passport-stamps.png'
                            ? prevFormData.trip_image
                            : data.trip_image,
                }))
            }
        } catch (e) {
            console.error(e)
        }
    }

    // Updates the list of activities needed to be deleted based on new trip date range
    const updateToDelete = () => {
        if (!tripData) return

        const dates = Object.keys(tripData)
        const activitiesByDate = Object.values(tripData)
        const newToDelete = []

        if (formData.start_date && formData.start_date > dates[0]) {
            for (let i = 0; i < activitiesByDate.length; i++) {
                if (dates[i] < formData.start_date) {
                    for (let j = 0; j < activitiesByDate[i].length; j++) {
                        newToDelete.push([
                            activitiesByDate[i][j].id,
                            activitiesByDate[i][j].type,
                        ])
                    }
                } else {
                    break
                }
            }
        }

        if (formData.end_date && formData.end_date < dates[dates.length - 1]) {
            for (let i = dates.length - 1; i >= 0; i--) {
                if (dates[i] > formData.end_date) {
                    for (let j = 0; j < activitiesByDate[i].length; j++) {
                        newToDelete.push([
                            activitiesByDate[i][j].id,
                            activitiesByDate[i][j].type,
                        ])
                    }
                } else {
                    break
                }
            }
        }

        setToDelete(newToDelete)
    }

    // Handles form changes except for title, country, city, and trip_image
    const handleFormChange = ({ target }) => {
        const { value, name } = target

        setFormData((prevState) => {
            const newFormData = { ...prevState, [name]: value }
            return newFormData
        })
    }

    // Handles form changes for start_date and end_date
    const handleDateChange = (date, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }))
    }

    // Deletes activities that fall outside the specified date range
    const deleteOutOfRangeItems = async () => {
        for (let activity of toDelete) {
            let url
            if (activity[1] === 'event') {
                url = `http://localhost:8000/api/events/${activity[0]}`
            } else if (activity[1] === 'flight') {
                url = `http://localhost:8000/api/flights/${activity[0]}`
            } else {
                url = `http://localhost:8000/api/lodgings/${activity[0]}`
            }
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
        }
    }

    // Handles the form submission to update the trip details and delete out-of-range activities
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const errors = validateForm({
            requiredFields: {
                title: title,
                country: country,
                city: city,
                start_date: start_date,
                end_date: end_date,
            },
            urlFields: { trip_image: trip_image },
        })

        if (errors.length > 0) {
            setFormErrors(errors)
            return
        }

        const formattedData = {
            ...formData,
            start_date: start_date ? format(start_date, 'yyyy-MM-dd') : '',
            end_date: end_date ? format(end_date, 'yyyy-MM-dd') : '',
        }

        const url =
            action === 'editTrip'
                ? `http://localhost:8000/api/trips/${tripId}`
                : 'http://localhost:8000/api/trips'
        const method = action === 'editTrip' ? 'PUT' : 'POST'
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formattedData),
            })
            if (response.ok) {
                if (action === 'editTrip') {
                    deleteOutOfRangeItems()
                } else {
                    const responseData = await response.json()
                    navigate(`/trip/${responseData.id}`)
                }
                setFormData(initialFormData)
                onClose()
            }
        } catch (e) {
            console.error(e)
        }
    }

    const { title, country, city, start_date, end_date, trip_image } = formData

    useEffect(() => {
        updateToDelete()
    }, [formData.start_date, formData.end_date, tripData])

    useEffect(() => {
        if (action === 'editTrip') {
            fetchTrip()
        }
    }, [])

    return (
        <>
            {toDelete.length > 0 && (
                <div className="flex items-center w-4/5 justify-center mb-6 rounded-lg bg-gray-700 p-3 text-yellow-500">
                    <svg
                        className="me-3 inline h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="text-sm">
                        <span className="font-medium">Warning:</span> Out of
                        range itinerary items will be deleted.
                    </div>
                </div>
            )}
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-4/5 mx-auto my-2"
            >
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                    {action === 'editTrip'
                        ? 'Update Your Adventure!'
                        : 'Start planning your next adventure!'}
                </h1>
                <p className="text-sm font-normal text-gray-600 mb-4">
                    {action === 'editTrip'
                        ? 'Update your trip'
                        : 'Create a trip'}
                </p>
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
                        id="title"
                        name="title"
                        onChange={handleFormChange}
                        placeholder="Title*"
                        type="text"
                        value={title}
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
                        id="country"
                        name="country"
                        onChange={handleFormChange}
                        placeholder="Country*"
                        type="text"
                        value={country}
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
                        id="city"
                        name="city"
                        onChange={handleFormChange}
                        placeholder="City*"
                        type="text"
                        value={city}
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
                        selected={
                            start_date
                                ? new Date(start_date).toISOString()
                                : null
                        }
                        onChange={(date) =>
                            handleDateChange(date, 'start_date')
                        }
                        dateFormat="yyyy-MM-dd"
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
                        selected={end_date}
                        onChange={(date) => handleDateChange(date, 'end_date')}
                        dateFormat="yyyy-MM-dd"
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
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                    <input
                        className="pl-2 outline-none border-none"
                        id="trip_image"
                        name="trip_image"
                        onChange={handleFormChange}
                        placeholder="Enter an Image URL"
                        value={trip_image}
                    />
                </div>
                <button
                    type="submit"
                    className="block w-full bg-cyan-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                    {action === 'editTrip' ? 'Update' : 'Create'}
                </button>
            </form>
        </>
    )
}

export default TripForm
