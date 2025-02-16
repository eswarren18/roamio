import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

// The SignInForm displays a form for a user to sign into their account
function SignInForm({ onClose }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signin, user } = useAuthService()
    const navigate = useNavigate()

    // Handles the form submittion by calling the signin function
    async function handleFormSubmit(e) {
        e.preventDefault()
        await signin({ username, password })
    }

    useEffect(() => {
        if (user) {
            onClose()
            navigate('/dashboard')
        }
    })

    return (
        <>
            <button onClick={onClose} className="flex justify-end">
                <img
                    src="/public/x-icon.svg"
                    alt="Cancel"
                    className="w-8 h-8"
                />
            </button>
            <div className="text-center text-4xl font-bold mb-6">Log In</div>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-4/5 mx-auto"
            >
                <div className="relative z-0 w-full mb-5">
                    <input
                        autoComplete="username"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=" "
                        type="text"
                        value={username}
                        required
                    />
                    <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        User Name
                        <span className="text-red-500 text-xs">*</span>
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5">
                    <input
                        autoComplete="current-password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" "
                        type="password"
                        value={password}
                        required
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                        <span className="text-red-500 text-xs">*</span>
                    </label>
                </div>
                <button className="hover:underline" type="submit">
                    Log In
                </button>
            </form>
        </>
    )
}

export default SignInForm
