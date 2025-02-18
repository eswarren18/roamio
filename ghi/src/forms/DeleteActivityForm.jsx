import { useNavigate } from 'react-router-dom'

// The DeleteActivityForm component handles the deletion of all activities (i.e., trips, events, flights, lodgings)
export default function DeleteActivityForm({ action, activityId, onClose }) {
    const navigate = useNavigate()
    // Handles the deletion of the activity based on its type
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            let url
            // Determine the API endpoint based on the activity type
            if (action === 'event') {
                url = `http://localhost:8000/api/events/${activityId}`
            } else if (action === 'flight') {
                url = `http://localhost:8000/api/flights/${activityId}`
            } else if (action === 'trip') {
                url = `http://localhost:8000/api/trips/${activityId}`
            } else {
                url = `http://localhost:8000/api/lodgings/${activityId}`
            }
            // Make the DELETE request to the appropriate API Endpoint
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            // If the DELETE is successful, close the modal and navigate to the dashboard
            if (response.ok) {
                onClose()
                if (action === 'deleteTrip') {
                    navigate('/dashboard')
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className="flex flex-col w-4/5 mx-auto my-2">
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                    Are you sure?
                </h1>
                <div className="flex w-full justify-between">
                    <button
                        className="block w-5/12 bg-cyan-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="block w-5/12 bg-red-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}
