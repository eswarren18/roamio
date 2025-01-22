import { createContext, useState } from 'react'
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import AddTripModal from './AddTripModal'
import AddEventModal from './AddEventModal';
import AddFlightModal from './AddFlightModal';
import EditEventModal from './EditEventModal';
import AddLodgingModal from './AddLodgingModal';
import EditFlightModal from './EditFlightModal';
import EditLodgingModal from './EditLodgingModal'


export const ModalContext = createContext(null)

export default function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formType, setFormType] = useState("");
    const [requiredId, setRequiredId] = useState(0);

    const toggleModal = (form = "", id=0) => {
        setFormType(form)
        setRequiredId(id)
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
            default:
                return null;
        }
    };

    return (
        <ModalContext.Provider value ={{ isModalOpen, toggleModal, requiredId }}>
            {children}
            {isModalOpen && renderForm()}
        </ModalContext.Provider>
    )
}
