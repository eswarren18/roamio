import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'
import FormErrorAlert, { validateForm } from './FormErrorAlert'

// The SignUpForm displays a form for a user to create an account
function SignUpForm({ onClose }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState([])
    const { signup, user } = useAuthService()
    const navigate = useNavigate()

    // Handles the form submittion by calling the signup function
    async function handleFormSubmit(e) {
        e.preventDefault()
        const errors = validateForm({ username, password })

        if (errors.length > 0) {
            setFormErrors(errors)
            return
        }

        const result = await signup({ username, password })
        if (result instanceof Error) {
            setFormErrors([result.message])
            return
        }
    }

    useEffect(() => {
        if (user) {
            onClose()
            navigate('/dashboard')
        }
    })

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-4/5 mx-auto my-2"
            >
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                    Get Started!
                </h1>
                <p className="text-sm font-normal text-gray-600 mb-4">
                    Sign Up
                </p>
                <FormErrorAlert errors={formErrors} />
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        autoComplete="username"
                        className="pl-2 outline-none border-none"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username*"
                        type="text"
                        value={username}
                    />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        autoComplete="current-password"
                        className="pl-2 outline-none border-none"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password*"
                        type="password"
                        value={password}
                    />
                </div>
                <button
                    type="submit"
                    className="block w-full bg-cyan-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                    Log In
                </button>
            </form>
        </>
    )
}

export default SignUpForm
