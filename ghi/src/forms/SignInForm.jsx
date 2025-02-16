import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

// The SignInForm displays a form for a user to sign into their account
function SignInForm({ onClose }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signin, user, error } = useAuthService()
    const navigate = useNavigate()

    // Handles the form submittion by calling the signin function
    async function handleFormSubmit(e) {
        e.preventDefault()
        try {
            await signin({ username, password })
        } catch (error) {}
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
                <h1 class="text-gray-800 font-bold text-2xl mb-1">
                    Welcome Back!
                </h1>
                <p class="text-sm font-normal text-gray-600 mb-4">Sign In</p>
                {error && (
                    <div className="flex items-center text-gray-600 rounded-2xl bg-yellow-300 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-10 w-1/4 text-red-600 border-r border-gray-600 pl-3 pr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                        </svg>
                        <div className="bg-yellow-300 text-gray-600 text-xs items-center p-2 rounded-2xl">
                            That combination doesn't match our records. You can
                            try again, or{' '}
                            <span
                                className="cursor-pointer underline text-blue-800"
                                onClick={() => handleOpenModal('SignUpForm')}
                            >
                                sign up
                            </span>
                            .
                        </div>
                    </div>
                )}
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <input
                        autoComplete="username"
                        class="pl-2 outline-none border-none"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username*"
                        required
                        type="text"
                        value={username}
                    />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <input
                        autoComplete="current-password"
                        class="pl-2 outline-none border-none"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password*"
                        type="password"
                        value={password}
                        required
                    />
                </div>

                <button
                    type="submit"
                    class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                    Log In
                </button>
            </form>
        </>
    )
}

export default SignInForm
