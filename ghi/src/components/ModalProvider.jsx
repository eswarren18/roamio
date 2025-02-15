import { createContext, useState } from 'react'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import AddTripForm from '../forms/AddTripForm'
import AddEventForm from '../forms/AddEventForm'
import AddFlightModal from './AddFlightModal'
import EditEventForm from '../forms/EditEventForm'
import AddLodgingModal from './AddLodgingModal'
import EditFlightModal from './EditFlightModal'
import EditLodgingModal from './EditLodgingModal'
import DeleteActivityForm from '../forms/DeleteActivityForm'
import EditTripForm from '../forms/EditTripForm'

export const ModalContext = createContext(null)

// ModalProvider componenet that provides modal state and logic to its children
export default function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formType, setFormType] = useState('')
    const [tripData, setTripData] = useState(null)
    const [activityId, setActivityId] = useState(0)
    const [activityType, setActivityType] = useState('')

    // Function to toggle the modal open or closed, and set any additional form information
    const toggleModal = ({ form = '', id = 0, data = null, type = '' }) => {
        setFormType(form)
        setTripData(data)
        setActivityId(id)
        setActivityType(type)
        setIsModalOpen((imo) => !imo)
    }

    // Function to render the appropriate form based on the set formType
    const renderForm = () => {
        switch (formType) {
            case 'AddTripForm':
                return <AddTripForm />
            case 'SignInModal':
                return <SignInModal />
            case 'SignUpModal':
                return <SignUpModal />
            case 'EditTripForm':
                return <EditTripForm />
            case 'AddEventForm':
                return <AddEventForm />
            case 'AddFlightModal':
                return <AddFlightModal />
            case 'AddLodgingModal':
                return <AddLodgingModal />
            case 'EditEventForm':
                return <EditEventForm />
            case 'EditFlightModal':
                return <EditFlightModal />
            case 'EditLodgingModal':
                return <EditLodgingModal />
            case 'DeleteActivityForm':
                return <DeleteActivityForm />

            default:
                return null
        }
    }

    // Provide the modal state and logic to child components
    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                toggleModal,
                tripData,
                activityType,
                activityId,
            }}
        >
            {children}
            {isModalOpen && renderForm()}
        </ModalContext.Provider>
    )
}
