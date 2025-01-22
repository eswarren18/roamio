import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from './ModalProvider'

import useAuthService from '../hooks/useAuthService'


function SignUpModal() {
        const { toggleModal } = useContext(ModalContext)
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const { signup, user, error } = useAuthService()
        const navigate = useNavigate()

        async function handleFormSubmit(e) {
            e.preventDefault()
            await signup({ username, password })
        }

        useEffect(() => {
             if (user) {
                toggleModal("", 0, "")
                navigate("/dashboard") }
            },)

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
                <form onSubmit={handleFormSubmit}>
                    {error && <div className="error">{error.message}</div>}
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                    />
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpModal
