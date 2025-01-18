import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import ErrorNotification from './components/ErrorNotification'
import Nav from './components/Nav'


import './App.css'

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    const [launchInfo, setLaunchInfo] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            let url = `${API_HOST}/api/launch-details`
            let response = await fetch(url)
            let data = await response.json()

            if (response.ok) {
                if (!data.launch_details) {
                    setError('No launch data')
                    return
                }
                setLaunchInfo(data.launch_details)
            } else {
                setError(data.message)
            }
        }
        getData()
    }, [])

    return (
        <>
            <Nav />
            <Outlet />
            <ErrorNotification error={error} />
        </>
    )
}

export default App
