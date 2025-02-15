import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from '../components/ModalProvider'

// The DeleteActivityForm component handles the deletion of varius activities (events, flights, trips, lodgings)
export default function DeleteActivityForm({
    activityType,
    activityId,
    onClose,
}) {
    const navigate = useNavigate()

    // Handles the deletion of the activity based on its type
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            let url
            // Determine the API endpoint based on the activity type
            if (activityType === 'events') {
                url = `http://localhost:8000/api/events/${activityId}`
            } else if (activityType === 'flights') {
                url = `http://localhost:8000/api/flights/${activityId}`
            } else if (activityType === 'trip') {
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
                if (activityType === 'trip') {
                    navigate('/dashboard')
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <button onClick={onClose} className="flex justify-end">
                <img
                    src="/public/x-icon.svg"
                    alt="Cancel"
                    className="w-8 h-8"
                />
            </button>
            <div className="text-center text-4xl font-bold mb-6">
                Are you sure?
            </div>
            <div className="flex justify-evenly">
                <button className="hover:underline" onClick={onClose}>
                    Cancel
                </button>
                <button className="hover:underline" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </>
    )
}
