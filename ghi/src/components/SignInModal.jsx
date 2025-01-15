import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import useAuthService from '../hooks/useAuthService'


function SignInModal({ toggleModal }) {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const { signin, user, error } = useAuthService()

        async function handleFormSubmit(e) {
            e.preventDefault()
            await signin({ username, password })
        }

        if (user) {
            console.log('user', user)
            return <Navigate to="/" />
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
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignInModal
