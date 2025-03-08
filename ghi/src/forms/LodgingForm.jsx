import { useEffect, useState, useRef } from 'react'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import { FormErrorAlert, validateForm } from './FormErrorAlert'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { format, parseISO, isValid } from 'date-fns'

// The LodgingForm component handles both adding and editing lodging entries
function LodgingForm({ activityId, tripId, tripData, onClose, action }) {
    const initialFormData = {
        id: activityId,
        name: '',
        address: '',
        check_in: '',
        check_out: '',
        trip_id: tripId,
    }
    const [formData, setFormData] = useState(initialFormData)
    const [formErrors, setFormErrors] = useState([])

    // Reference to handle the autocomplete functionality for the address input field
    const addressAutocompleteRef = useRef(null)

    // Updates the address in the formData when the place changes in the address autocomplete field
    const onAddressPlaceChanged = () => {
        if (!addressAutocompleteRef.current) return

        const place = addressAutocompleteRef.current.getPlace()
        if (!place) return

        const address = place.formatted_address || ''

        setFormData((prevState) => ({
            ...prevState,
            address: address,
        }))
    }

    // Fetches the lodging data from the backend based on the activityId
    const fetchLodging = async () => {
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
                const check_in = parseISO(data.check_in)
                const check_out = parseISO(data.check_out)
                setFormData((prevState) => ({
                    ...prevState,
                    id: data.id,
                    name: data.name,
                    address: data.address,
                    check_in: check_in,
                    check_out: check_out,
                }))
            }
        } catch (e) {
            console.error(e)
        }
    }

    // Fetches the lodging data if the action is 'editLodging'
    useEffect(() => {
        if (action === 'editLodging') {
            fetchLodging()
        }
    }, [])

    // Handles form input changes with additional checks for date field validity
    const handleFormChange = ({ target }) => {
        const { value, name } = target

        setFormData((prevState) => {
            const newFormData = { ...prevState, [name]: value }
            const dates = Object.keys(tripData)
            const newStartDate = isValid(new Date(newFormData.check_in))
                ? format(new Date(newFormData.check_in), 'yyyy-MM-dd')
                : ''
            const newStartTime = isValid(new Date(newFormData.check_in))
                ? format(new Date(newFormData.check_in), 'HH:mm:ss')
                : ''
            const newEndDate = isValid(new Date(newFormData.check_out))
                ? format(new Date(newFormData.check_out), 'yyyy-MM-dd')
                : ''
            const newEndTime = isValid(new Date(newFormData.check_out))
                ? format(new Date(newFormData.check_out), 'HH:mm:ss')
                : ''

            if (name === 'check_in') {
                if (
                    newFormData.check_in < dates[0] ||
                    newStartDate > dates[dates.length - 1]
                ) {
                    newFormData.check_in = ''
                }
            }
            if (name === 'check_out') {
                if (
                    newFormData.check_out < dates[0] ||
                    newEndDate > dates[dates.length - 1] ||
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

    // Handles the form submission to create or update a lodging entry
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const errors = validateForm({
            requiredFields: {
                name: name,
                address: address,
                check_in: check_in,
                check_out: check_out,
            },
        })

        if (errors.length > 0) {
            setFormErrors(errors)
            return
        }

        const formattedData = {
            ...formData,
            check_in: isValid(new Date(formData.check_in))
                ? format(new Date(formData.check_in), "yyyy-MM-dd'T'HH:mm:ss")
                : '',
            check_out: isValid(new Date(formData.check_out))
                ? format(new Date(formData.check_out), "yyyy-MM-dd'T'HH:mm:ss")
                : '',
        }

        try {
            const url =
                action === 'editLodging'
                    ? `http://localhost:8000/api/lodgings/${activityId}`
                    : 'http://localhost:8000/api/lodgings'
            const method = action === 'editLodging' ? 'PUT' : 'POST'
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

    // Handles form changes for start_date and end_date
    const handleDateTimeChange = (date, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }))
    }

    const { name, address, check_in, check_out } = formData

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-4/5 mx-auto"
            >
                <h1 className="text-gray-800 font-bold text-2xl mb-4">
                    {action === 'editLodging'
                        ? 'Update Your Lodging!'
                        : 'Lodging Details'}
                </h1>
                <FormErrorAlert errors={formErrors} />
                {/* Lodging Name */}
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
                        placeholder="Lodging Name"
                        type="text"
                        value={name}
                    />
                </div>
                {/* Address */}
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
                {/* Check In Date */}
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
                        selected={check_in}
                        onChange={(date) =>
                            handleDateTimeChange(date, 'check_in')
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
                        placeholderText="Check In*"
                        className="pl-2 outline-none border-none"
                    />
                </div>
                {/* Check Out Date */}
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
                        selected={check_out}
                        onChange={(date) =>
                            handleDateTimeChange(date, 'check_out')
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
                        placeholderText="Check Out*"
                        className="pl-2 outline-none border-none"
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="block w-full bg-cyan-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                    {action === 'editLodging' ? 'Update' : 'Create'}
                </button>
            </form>
        </>
    )
}

export default LodgingForm
