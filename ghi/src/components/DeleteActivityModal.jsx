import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from './ModalProvider';

export default function DeleteActivityModal() {
    const { toggleModal, activityData, activityType } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            let url;
            if (activityType === "events") {
                url = `http://localhost:8000/api/events/${activityData}`
            }
            else if (activityType === "flights") {
                url = `http://localhost:8000/api/flights/${activityData}`
            }
            else if (activityType === "trips") {
                url = `http://localhost:8000/api/trips/${activityData}`
            }
            else {
                url = `http://localhost:8000/api/lodgings/${activityData}`
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
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            onClick={toggleModal}
        >
            {/* Modal content */}
            <div
                className="bg-white rounded-lg shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()} // Prevent click outside from closing modal
            >
                <button onClick={toggleModal}>X</button>
                <div>Are you sure?</div>
                <button onClick={toggleModal}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}
