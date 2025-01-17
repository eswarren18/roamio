import { createContext, useState } from 'react'
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import AddTripModal from './AddTripModal'

export const ModalContext = createContext(null)

export default function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formType, setFormType] = useState("");

    const toggleModal = (form = "") => {
        setFormType(form)
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
            default:
                return null;
        }
    };

    return (
        <ModalContext.Provider value ={{ isModalOpen, toggleModal }}>
            {children}
            {isModalOpen && renderForm()}
        </ModalContext.Provider>
    )
}
