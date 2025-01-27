import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalContext } from './ModalProvider'

import useAuthService from '../hooks/useAuthService'


function SignInModal() {
        const { toggleModal } = useContext(ModalContext)
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const { signin, user, error } = useAuthService()
        const navigate = useNavigate()

        async function handleFormSubmit(e) {
            e.preventDefault()
            await signin({ username, password })
        }

        useEffect(() => {
             if (user) {
                toggleModal("", null, "")
                navigate("/dashboard") }
            },)

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20"
            onClick={toggleModal}
        >
            {/* Modal content */}
            <div
                className="flex flex-col bg-white rounded-lg shadow-lg w-1/3 p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={toggleModal}
                    className="flex justify-end"
                >
                    <img src="/public/x-icon.svg" alt="Cancel" className="w-8 h-8" />
                </button>
                <div className="text-center text-4xl font-bold mb-6">Sign In</div>
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col w-4/5 mx-auto"
                >
                    <div className="relative z-0 w-full mb-5 group">
                        <input
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
                    <div className="relative z-0 w-full mb-5 group">
                        <input
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
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignInModal
