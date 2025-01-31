import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import AuthProvider from './components/AuthProvider'
import ModalProvider from './components/ModalProvider'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Trip from './components/Trip'
import { GoogleMapsLoader } from './components/GoogleMapsLoader'

import './index.css'

const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}
const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <ModalProvider>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<Home />} />
                            <Route
                                path="dashboard"
                                element={
                                    <GoogleMapsLoader>
                                        <Dashboard />
                                    </GoogleMapsLoader>
                                }
                            />
                            <Route
                                path="trip/:tripId"
                                element={
                                    <GoogleMapsLoader>
                                        <Trip />
                                    </GoogleMapsLoader>
                                }
                            />
                        </Route>
                    </Routes>
                </ModalProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
)
