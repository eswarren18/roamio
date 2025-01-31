import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'


import './App.css'

const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    const location = useLocation()
    const isHomePage = location.pathname === "/"

    return (
        <>
            <Nav />
            <div className={isHomePage ? '' : "pt-16"}>
                <Outlet />
            </div>
        </>
    )
}

export default App
