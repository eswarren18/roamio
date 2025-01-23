import { createContext, useState } from 'react'
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import AddTripModal from './AddTripModal'
import AddEventModal from './AddEventModal';
import AddFlightModal from './AddFlightModal';
import EditEventModal from './EditEventModal';
import AddLodgingModal from './AddLodgingModal';
import EditFlightModal from './EditFlightModal';
import EditLodgingModal from './EditLodgingModal';
import DeleteActivityModal from './DeleteActivityModal';
import EditTripModal from './EditTripModal';


export const ModalContext = createContext(null)

export default function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formType, setFormType] = useState("");
    const [tripData, setTripData] = useState(null);
    const [activityId, setActivityId] = useState(0)
    const [activityType, setActivityType] = useState("");

    const toggleModal = ({form = "", id = 0, data = null, type = ""}) => {
        setFormType(form)
        setTripData(data)
        setActivityId(id)
        setActivityType(type)
        setIsModalOpen((imo) => !imo);
    };

    const renderForm = () => {
        switch (formType) {
            // case "SettingsForm":
            //     return <SettingsForm toggleModal={() => toggleModal()} />;
            case "AddTripModal":
                return <AddTripModal />;
            case "SignInModal":
                return <SignInModal />;
            case "SignUpModal":
                return <SignUpModal />;
            case "EditTripModal":
                return <EditTripModal />;
            case "AddEventModal":
                return <AddEventModal />;
            case "AddFlightModal":
                return <AddFlightModal />;
            case "AddLodgingModal":
                return <AddLodgingModal />;
            case "EditEventModal":
                return <EditEventModal />;
            case "EditFlightModal":
                return <EditFlightModal />;
            case "EditLodgingModal":
                return <EditLodgingModal />;
            case "DeleteActivityModal":
                return <DeleteActivityModal />;

            default:
                return null;
        }
    };

    return (
        <ModalContext.Provider value ={{ isModalOpen, toggleModal, tripData, activityType, activityId }}>
            {children}
            {isModalOpen && renderForm()}
        </ModalContext.Provider>
    )
}
