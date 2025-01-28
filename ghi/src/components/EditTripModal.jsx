import { useContext, useEffect, useState } from 'react'
import { ModalContext } from './ModalProvider'

function EditTripModal() {
    const { toggleModal, tripData, activityId } = useContext(ModalContext)
    const [toDelete, setToDelete] = useState([])
    const [ formData, setFormData ] = useState({
        id: "",
        title: "",
        country: "",
        city: "",
        start_date: "",
        end_date: "",
        trip_image: "",
        user_id: ""
    })

    const fetchTrip = async (e) => {
        try {
            const response = await fetch(`http://localhost:8000/api/trips/${activityId}`, {
                credentials: "include",
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                const data = await response.json();
                setFormData(prevFormData => ({
                    ...prevFormData,
                    ...data,
                    trip_image: data.trip_image === "/passport-stamps.png" ? prevFormData.trip_image : data.trip_image
                }))
            }
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchTrip() }, [])

    const updateToDelete = () => {
        if (!tripData) return;

            const dates = Object.keys(tripData);
            const activitiesByDate = Object.values(tripData);
            const newToDelete = [];

            if (formData.start_date && formData.start_date > dates[0]) {
                for (let i = 0; i < activitiesByDate.length; i++) {
                    if (dates[i] < formData.start_date) {
                        for (let j = 0; j < activitiesByDate[i].length; j++) {
                            newToDelete.push([activitiesByDate[i][j].id, activitiesByDate[i][j].type]);
                        }
                    } else {
                        break;
                    }
                }
            }

            if (formData.end_date && formData.end_date < dates[dates.length - 1]) {
                for (let i = dates.length - 1; i >= 0; i--) {
                    if (dates[i] > formData.end_date) {
                        for (let j = 0; j < activitiesByDate[i].length; j++) {
                            newToDelete.push([activitiesByDate[i][j].id, activitiesByDate[i][j].type]);
                        }
                    } else {
                        break;
                    }
                }
            }

            setToDelete(newToDelete);
            console.log(newToDelete);
        };

    useEffect(() => {
        updateToDelete() }, [formData.start_date, formData.end_date, tripData])


    const handleFormChange = ({ target: { value, name } }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const deleteOutOfRangeItems = async () => {
        for ( let activity of toDelete ) {
            let url;
            if (activity[1] === "event") {
                url = `http://localhost:8000/api/events/${activity[0]}`
            }
            else if (activity[1] === "flight") {
                url = `http://localhost:8000/api/flights/${activity[0]}`
            }
            else {
                url = `http://localhost:8000/api/lodgings/${activity[0]}`
            }
            const response = await fetch(
                url,
                {
                    method: "DELETE",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                }
            )
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/api/trips/${activityId}`,
                {
                    method: "PUT",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify({
                        title: formData.title,
                        country: formData.country,
                        city: formData.city,
                        start_date: formData.start_date,
                        end_date: formData.end_date,
                        trip_image: formData.trip_image,
                    })
                })
                if (response.ok) {
                    deleteOutOfRangeItems()
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
            title: "",
            country: "",
            city: "",
            start_date: "",
            end_date: "",
            trip_image: "",
            user_id: ""
        })
    }

    const { title, country, city, start_date, end_date, trip_image } = formData

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20"
            onClick={toggleModal}
        >
            <div
                className="flex items-center flex-col bg-white rounded-lg shadow-lg w-1/3 p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex justify-end w-full'>
                    <button onClick={toggleModal}>
                        <img src="/public/x-icon.svg" alt="Cancel" className="w-8 h-8" />
                    </button>
                </div>
                <div className="text-center text-4xl font-bold mb-6">Edit Trip</div>
                { toDelete.length > 0 && (
                    <div className="flex items-center w-4/5 justify-center mb-6 rounded-lg bg-gray-700 p-3 text-yellow-500">
                        <svg className="me-3 inline h-4 w-4 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div className='text-sm'><span className="font-medium">Warning:</span> Out of range itinerary items will be deleted.</div>
                    </div>
                )}
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
                    <div className="flex flex-col items-center xl:flex-row">
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
                    <button
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditTripModal
