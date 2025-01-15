import { createContext, useEffect, useState } from 'react'
import SignInModal from './SignInModal';

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
            // case "TripForm":
            //     return <TripForm toggleModal={() => toggleModal()} />;
            case "SignInModal":
                return <SignInModal toggleModal={() => toggleModal()} />;
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
