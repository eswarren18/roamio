import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from './ModalProvider';

export default function DeleteActivityModal() {
    const { toggleModal, activityId, activityType } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            let url;
            if (activityType === "events") {
                url = `http://localhost:8000/api/events/${activityId}`
            }
            else if (activityType === "flights") {
                url = `http://localhost:8000/api/flights/${activityId}`
            }
            else if (activityType === "trips") {
                url = `http://localhost:8000/api/trips/${activityId}`
            }
            else {
                url = `http://localhost:8000/api/lodgings/${activityId}`
            }
            const response = await fetch(
                url,
                {
                    method: "DELETE",
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                }
            )
            if (response.ok) {
                toggleModal("", null, "");
                if (activityType === "trips") {
                    navigate("/dashboard")
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20"
            onClick={toggleModal}
        >
            {/* Modal content */}
            <div
                className="flex flex-col bg-white rounded-lg shadow-lg w-1/3 p-8"
                onClick={(e) => e.stopPropagation()} // Prevent click outside from closing modal
            >
                <button
                    onClick={toggleModal}
                    className="flex justify-end"
                >
                    <img src="/public/x-icon.svg" alt="Cancel" className="w-8 h-8" />
                </button>
                <div className="text-center text-4xl font-bold mb-6">Are you sure?</div>
                <div className="flex justify-evenly">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}
