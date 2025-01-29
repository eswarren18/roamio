import { useContext, useState, useRef } from 'react';
import { ModalContext } from './ModalProvider';
import { Autocomplete } from '@react-google-maps/api'

function AddEventModal() {
    const { toggleModal, activityId, tripData } = useContext(ModalContext);
    const [isMultipleDays, setIsMultipleDays] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        address: "",
        description: "",
        trip_id: activityId
    });

    const addressAutocompleteRef = useRef(null);

    const onAddressPlaceChanged = () => {
        const place = addressAutocompleteRef.current.getPlace();
        const address = place.formatted_address || '';

        setFormData(prevState => ({
            ...prevState,
            address: address
        }));
    };

    const handleFormChange = ({ target }) => {
        const { value, name } = target;

        setFormData(prevState => {
            const newFormData = { ...prevState, [name]: value };
            const dates = Object.keys(tripData);
            if (newFormData.start_date < dates[0] || newFormData.start_date > dates[(dates.length) - 1]) {
                newFormData.start_date = "";
            }
            if (newFormData.end_date < dates[0] || newFormData.end_date > dates[(dates.length) - 1]) {
                newFormData.end_date = "";
            }
            if (isMultipleDays) {
                if (name === 'start_date' || name === 'end_date' || name === 'checkbox') {
                    if (newFormData.end_date < newFormData.start_date) {
                        newFormData.end_date = "";
                    }
                    if (newFormData.end_date === newFormData.start_date && newFormData.end_time < newFormData.start_time) {
                        newFormData.end_time = "";
                    }
                    if (newFormData.end_time < newFormData.start_time) {
                        newFormData.end_time = "";
                    }
                }
            }
            if (!isMultipleDays || newFormData.start_date === newFormData.end_date) {
                if (name === 'end_time' || name === 'start_time') {
                    if (newFormData.end_time < newFormData.start_time) {
                        newFormData.end_time = "";
                    }
                }
            }
            return newFormData;
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let start_date_time = "";
        let end_date_time = "";
        if (isMultipleDays) {
            start_date_time = (`${start_date}T${start_time}`);
            end_date_time = (`${end_date}T${end_time}`);
        } else {
            start_date_time = (`${start_date}T${start_time}`);
            end_date_time = (`${start_date}T${end_time}`);
        }
        try {
            const response = await fetch("http://localhost:8000/api/events", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    start_date_time: start_date_time,
                    end_date_time: end_date_time,
                    address: formData.address,
                    description: formData.description,
                    trip_id: activityId
                })
            });
            if (response.ok) {
                resetForm();
                toggleModal("", null, "");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            address: "",
            description: "",
            trip_id: ""
        });
    };

    const { name, start_date, end_date, start_time, end_time, address, description } = formData;

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20"
            onClick={toggleModal}
        >
            <div
                className="flex flex-col bg-white rounded-lg shadow-lg w-1/3 p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={toggleModal}
                    className="flex justify-end"
                >
                    <img src="/public/x-icon.svg" alt="Cancel" className="w-8 h-8" />
                </button>
                <div className="text-center text-4xl font-bold mb-6">Create Event</div>
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col w-4/5 mx-auto"
                >
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="name"
                            name="name"
                            onChange={handleFormChange}
                            placeholder=" "
                            type="text"
                            value={name}
                            required
                        />
                        <label
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Event Name
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <div className="flex items-center">
                        <div className={`relative z-0 mb-5 group ${isMultipleDays ? "w-full" : "w-5/12"}`}>
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                id="start_date"
                                name="start_date"
                                onChange={handleFormChange}
                                placeholder=" "
                                type="date"
                                value={start_date}
                                required
                            />
                            <label
                                htmlFor="start_date_time"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                {isMultipleDays ? "Start Date" : "Date"}
                                <span className="text-red-500 text-xs">*</span>
                            </label>
                        </div>
                        {isMultipleDays ? (
                            <>
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
                                        htmlFor="start_date_time"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        End Date
                                        <span className="text-red-500 text-xs">*</span>
                                    </label>
                                </div>
                            </>
                        ) : (
                            formData.end_date = ""
                        )}
                    </div>
                    <div className="flex items-center">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                id="start_time"
                                name="start_time"
                                onChange={handleFormChange}
                                placeholder=" "
                                type="time"
                                value={start_time}
                                required
                            />
                            <label
                                htmlFor="end_date_time"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Start Time
                                <span className="text-red-500 text-xs">*</span>
                            </label>
                        </div>
                        <span className="mx-4 text-gray-500">at</span>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                id="end_time"
                                name="end_time"
                                onChange={handleFormChange}
                                placeholder=" "
                                type="time"
                                value={end_time}
                                required
                            />
                            <label
                                htmlFor="end_date_time"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                End Time
                                <span className="text-red-500 text-xs">*</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            onChange={handleFormChange}
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                            onClick={() => setIsMultipleDays(!isMultipleDays)}
                        />
                        <label htmlFor="checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Multiple Days?</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <Autocomplete
                            onLoad={ref => addressAutocompleteRef.current = ref}
                            onPlaceChanged={onAddressPlaceChanged}
                        >
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                id="address"
                                name="address"
                                onChange={handleFormChange}
                                placeholder=" "
                                type="text"
                                value={address}
                                required
                            />
                        </Autocomplete>
                        <label
                            htmlFor="address"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Address
                            <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleFormChange}
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Description of Event..."
                            value={description}
                        >
                        </textarea>
                    </div>

                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}

export default AddEventModal;
