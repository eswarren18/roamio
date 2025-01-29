import { useContext, useEffect, useState, useRef } from 'react'
import { ModalContext } from './ModalProvider'
import { Autocomplete } from '@react-google-maps/api'

function EditLodgingModal() {
    const { toggleModal, activityId } = useContext(ModalContext)
    const [ tripData, setTripData ] = useState({})
    const [ formData, setFormData ] = useState({
        id: activityId,
        name: "",
        address: "",
        check_in: "",
        check_out: "",
        trip_id: ""
    })

    const addressAutocompleteRef = useRef(null);

    const onAddressPlaceChanged = () => {
        const place = addressAutocompleteRef.current.getPlace();
        const address = place.formatted_address || '';

        setFormData(prevState => ({
            ...prevState,
            address: address
        }));
    };

    const fetchLodging = async (e) => {
        try {
            const response = await fetch(`http://localhost:8000/api/lodgings/${activityId}`, {
                credentials: "include",
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                const data = await response.json();
                setFormData(data)

                const tripResponse = await fetch(`http://localhost:8000/api/trips/${data.trip_id}`, { credentials: "include", headers: {"Content-Type": "application/json"} })
                if (tripResponse.ok) {
                    const tripData = await tripResponse.json()
                    setTripData(tripData)
                }
            }
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchLodging() }, [])

    const handleFormChange = ({ target }) => {
        const { value, name } = target;

        setFormData(prevState => {
            const newFormData = { ...prevState, [name]: value };
            const tripStartDate = tripData.start_date
            const tripEndDate = tripData.end_date

            if ( newFormData.check_in < tripStartDate || newFormData.check_in > tripEndDate) {
                newFormData.check_in = ""
            }

            if ( newFormData.check_out < tripStartDate || newFormData.check_out > tripEndDate) {
                newFormData.check_out = ""
            }

            if (name === 'check_in' || name === 'check_out') {
                if (newFormData.check_out < newFormData.check_in) {
                    newFormData.end_date = "";
                }
                if (newFormData.check_out === newFormData.check_in && newFormData.check_out < newFormData.check_in) {
                    newFormData.check_out = "";
                }
                if (newFormData.check_out < newFormData.check_in) {
                    newFormData.check_out = "";
                }
            }

            if (newFormData.check_in === newFormData.check_out) {
                if (name === 'check_out' || name === 'check_in') {
                    if (newFormData.check_out < newFormData.check_in) {
                        newFormData.check_out = "";
                    }
                }
            }
            return newFormData;
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/api/lodgings/${activityId}`,
                {
                    method: "PUT",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body : JSON.stringify({
                        name:formData.name,
                        address: formData.address,
                        check_in: formData.check_in,
                        check_out: formData.check_out,
                        trip_id: formData.trip_id
                    })
                })
                if (response.ok) {
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
            name: "",
            address: "",
            check_in: "",
            check_out: "",
            trip_id: ""
        })
    }

    const { name, address, check_in, check_out } = formData

    return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20"
      onClick={toggleModal}
    >
      <div
        className="flex flex-col bg-white rounded-lg shadow-lg w-1/3 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={toggleModal} className="flex justify-end mb-2">
          <img src="/public/x-icon.svg" alt="Cancel" className="w-8 h-8" />
        </button>
        <div className="text-center text-4xl font-bold mb-6">Update Lodging</div>
        <form onSubmit={handleFormSubmit} className="flex flex-col w-4/5 mx-auto">
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
              Lodging Name<span className="text-red-500 text-xs">*</span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Autocomplete
                onLoad={ref => addressAutocompleteRef.current = ref}
                onPlaceChanged={onAddressPlaceChanged}
            >
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
              <label
                htmlFor="address"
                className="peer-focus:font-medium absolute text-sm text-gray-500
                          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                          peer-focus:left-0 peer-focus:text-blue-600
                          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                          peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Address<span className="text-red-500 text-xs">*</span>
              </label>
            </Autocomplete>
          </div>
          <div className="flex space-x-4 mb-5">
            <div className="relative z-0 w-1/2 group">
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
                Check-In<span className="text-red-500 text-xs">*</span>
              </label>
            </div>

            <div className="relative z-0 w-1/2 group">
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
                Check-Out<span className="text-red-500 text-xs">*</span>
              </label>
            </div>
          </div>
          <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditLodgingModal
