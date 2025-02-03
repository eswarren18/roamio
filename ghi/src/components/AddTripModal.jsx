import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from './ModalProvider'

// The AddTripModal component handles the creation of a new trip
function AddTripModal() {
    const { toggleModal } = useContext(ModalContext)
    const navigate = useNavigate()
    const initialFormData = {
        title: '',
        country: '',
        city: '',
        start_date: '',
        end_date: '',
        trip_image: '',
    }
    const [formData, setFormData] = useState(initialFormData)

    // Handles form input changes with additional checks for date field validity
    const handleFormChange = ({ target }) => {
        const { value, name } = target

        setFormData((prevState) => {
            const newFormData = { ...prevState, [name]: value }

            if (name === 'start_date') {
                const newStartDate = new Date(value)
                const endDate = new Date(prevState.end_date)

                if (endDate < newStartDate) {
                    newFormData.end_date = ''
                }
            } else if (name === 'end_date') {
                const startDate = new Date(prevState.start_date)
                const newEndDate = new Date(value)

                if (newEndDate < startDate) {
                    newFormData.end_date = ''
                }
            }
            return newFormData
        })
    }

    // Handles the form submission to create a new trip
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                const responseData = await response.json()
                const tripId = responseData.id
                resetForm()
                toggleModal('', null, '')
                navigate(`/trip/${tripId}`)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const resetForm = () => {
        setFormData(initialFormData)
    }

    const { title, country, city, start_date, end_date, trip_image } = formData

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20"
            onClick={toggleModal}
        >
            <div
                className="flex flex-col bg-white rounded-lg shadow-lg w-1/3 aspect-2/4 p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={toggleModal} className="flex justify-end">
                    <img
                        src="/public/x-icon.svg"
                        alt="Cancel"
                        className="w-8 h-8"
                    />
                </button>
                <div className="text-center text-4xl font-bold mb-6">
                    Add a Trip
                </div>
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col w-4/5 mx-auto"
                >
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="title"
                            name="title"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="text"
                            value={title}
                            required
                        />
                        <label
                            htmlFor="title"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Title
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="country"
                            name="country"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="text"
                            value={country}
                            required
                        />
                        <label
                            htmlFor="country"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Country
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="city"
                            name="city"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="text"
                            value={city}
                            required
                        />
                        <label
                            htmlFor="city"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            City
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <div className="flex items-center">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                                id="start_date"
                                name="start_date"
                                onChange={handleFormChange}
                                placeholder=" "
                                type="date"
                                value={start_date}
                                required
                            />
                            <label
                                htmlFor="end_date"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Start Date
                                <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                id="end_date"
                                name="end_date"
                                onChange={handleFormChange}
                                placeholder=" "
                                type="date"
                                value={end_date}
                                required
                            />
                            <label
                                htmlFor="end_date"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                End Date
                                <span className="text-red-500">*</span>
                            </label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="trip_image"
                            name="trip_image"
                            onChange={handleFormChange}
                            placeholder=" "
                            maxLength="1000"
                            type="url"
                            value={trip_image}
                        />
                        <label
                            htmlFor="trip_image"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter Image URL
                        </label>
                    </div>
                    <button className="hover:underline" type="submit">
                        Create Trip
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTripModal
